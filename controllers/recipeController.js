import * as RecipeService from "../services/RecipeServices.js";
import { v4 as uuidv4 } from 'uuid';

export const createRecipe = async (req, res) => {
    const userId = req.user.userId;
    const { externalId, title, imageUrl, notes } = req.body;

    if (!externalId || !title) {
        return res.status(400).json({ message: 'Please, add the external ID, and the recipe title...' });
    }

    try {
        const existingRecipe = await RecipeService.getRecipeByExternalId(
            externalId
        )

        if (existingRecipe) {
            return res.status(409).json({
                message: 'This recipe is already in favs',
                recipe: existingRecipe
            });
        }

        const newRecipe = {
            userId,
            externalId,
            title,
            imageUrl,
            notes
        };
        await RecipeService.createRecipe(newRecipe);

        return res.status(201).json({
            message: 'Recipe saved successfully',
            recipe: newRecipe
        });
    } catch (error) {
        console.error('Error creating recipe', error.message);
        return res.status(500).json({
            message: 'Server Error while saving recipe',
            error: error.message
        });
    }
}

export const getRecipes = async (req, res) => {
    const userId = req.user.userId;

    try {
        const recipes = await RecipeService.getRecipeByUser(userId);

        return res.status(200).json({
            count: recipes.length,
            recipes
        });
    } catch (error) {
        console.error('Error while getting recipes:', error.message);
        return res.status(500).json({
            message: 'Server error while getting recipes',
            error: error.message
        })
    }
}

export const checkIfSaved = async (req, res) => {
    const userId = req.user.userId;
    const { externalId } = req.params;
    try {

        const recipe = await RecipeService.getRecipeByExternalId(externalId);

        if (recipe) {
            return res.status(200).json({ isSaved: true, recipeId: recipe.recipeId });
        } else {
            return res.status(200).json({ isSaved: false, recipeId: null });
        }
    } catch (error) {
        console.error('Error checking if recipe is saved:', error.message);
        return res.status(500).json({
            message: 'Server error while checkin recipe state',
            error: error.message
        });
    }
};

export const getRecipeById = async (req, res) => {
    const userId = req.user.userId;
    const recipeId = req.params.id;

    try {
        const recipe = await RecipeService.getRecipeById(userId, recipeId);

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' })
        }

        return res.status(200).json(recipe);
    } catch (error) {
        console.error('Error while getting recipe by id:', error.message);
        return res.status(500).json({
            message: 'Error while getting recipe'
        });
    }
};


export const updateRecipe = async (req, res) => {
    const userId = req.user.userId;
    const recipeId = req.params.id;
    const { notes } = req.body;

    if (notes === undefined) {
        return res.status(400).json({ message: "No valid fields to update" });
    }

    try {
        const updatedRecipe = await RecipeService.updatedRecipeNotes(userId, recipeId, notes );

        if (!updatedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        return res.status(200).json({
            message: 'Success update',
            recipe: updatedRecipe
        });
    } catch (error) {
        console.error('Error while updating recipe', error.message);
        return res.status(500).json({
            message: 'Server error while updaying recipe'
        });
    }
};

export const deleteRecipe = async (req, res) => {
    const userId = req.user.userId;
    const recipeId = req.params.id;

    try {
        const result = await RecipeService.deleteRecipe(userId, recipeId);

        if (!result) {
            return res.status(404).json({ message: 'Recipe not found' })
        }

        return res.status(204).send();
    } catch (error) {
        console.error('Server error while deleting recipe:', error.message);
        return res.status(500).json({
            message: 'Server error while deleting recipe'
        });
    }
};