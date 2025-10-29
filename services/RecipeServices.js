// import mongoose from "mongoose";

// const recipeSchema = new mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     externalId: {
//         type: String,
//         required: [true, 'External ID is mandatory'],
//         unique: false
//     },
//     title: {
//         type: String,
//         required: [true, 'Recipe Title is mandatory']
//     },
//     imageUrl: {
//         type: String,
//         required: false
//     },
//     notes: {
//         type: String,
//         default: ''
//     }
// }, {
//     timestamps: true
// });

// const Recipe = mongoose.model('Recipe', recipeSchema);

// export default Recipe;

import { PutCommand, QueryCommand, GetCommand, UpdateCommand, DeleteCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoClient } from "../config/dynamoClient.js";

const TABLE_NAME = "Recipes";

export const createRecipe = async (recipeData) => {
    const params = {
        TableName: TABLE_NAME,
        Item: {
            userId: recipeData.userId,            // Partition Key
            recipeId: recipeData.externalId,      // Sort Key
            title: recipeData.title,
            imageUrl: recipeData.imageUrl || null,
            notes: recipeData.notes || "",
            createdAt: new Date().toISOString(),
        },
        ConditionExpression: "attribute_not_exists(userId) AND attribute_not_exists(recipeId)",
    };

    await dynamoClient.send(new PutCommand(params));
    return params.Item;
};

export const getRecipeByUser = async (userId) => {
    const params = {
        TableName: TABLE_NAME,
        KeyConditionExpression: "userId = :u",
        ExpressionAttributeValues: {
            ":u": userId,
        },
        ScanIndexForward: false,
    };

    const result = await dynamoClient.send(new QueryCommand(params));
    return result.Items
}

export const checkIfRecipeSaved = async (userId, externalId) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            userId,
            recipeId: externalId,
        },
    };

    const result = await dynamoClient.send(new GetCommand(params));

    return result.Item ? { isSaved: true, recipeId: result.Item.recipeId } : { isSaved: false, recipeId: null };
};

export const getRecipeById = async (userId, recipeId) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            userId,
            recipeId,
        },
    };

    const result = await dynamoClient.send(new GetCommand(params));
    return result.Item || null;
};

export const updatedRecipeNotes = async (userId, recipeId, notes) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            userId,
            recipeId,
        },
        UpdateExpression: "set notes = :n",
        ExpressionAttributeValues: {
            ":n": notes,
        },
        ReturnValues: "ALL_NEW",
    };

    const result = await dynamoClient.send(new UpdateCommand(params));
    return result.Attributes;
};

export const deleteRecipe = async (userId, recipeId) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            userId,
            recipeId,
        },
    };

    await dynamoClient.send( new DeleteCommand(params));

    return true;
}

export const getRecipeByExternalId = async (externalId) => {
    const params = {
        TableName: TABLE_NAME,
        FilterExpression: "recipeId = :r",
        ExpressionAttributeValues: {
            ":r": externalId,
        },
    };

    const result = await dynamoClient.send(new ScanCommand(params));
    return result.Items?.[0] || null; // Devuelve la primera coincidencia o null
};