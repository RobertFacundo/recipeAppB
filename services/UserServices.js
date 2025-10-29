// import mongoose from "mongoose";
// import bcrypt from 'bcrypt';

// const userSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: [true, 'Email is mandatory'],
//         unique: true,
//         lowercase: true,
//         trim: true,
//         match: [/.+\@.+\..+/, 'Por favor, introduce un email válido']
//     },
//     password: {
//         type: String,
//         required: [true, 'Password is mandatory'],
//         minLength: [6, 'Password must have at least 6 letters']
//     },
//     name: {
//         type: String,
//         trim: true,
//         maxLength: [50, 'The name cannot exceed 50 letters']
//     },
// }, {
//     timestamps: true
// });

// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//         return next();
//     }
//     try {
//         const salt = await bcrypt.genSalt(10);

//         this.password = await bcrypt.hash(this.password, salt);

//         next();
//     } catch (error) {
//         next(error);
//     }
// })

// const User = mongoose.model('user', userSchema);

// export default User;


import { dynamoClient } from '../config/dynamoClient.js';
import { PutCommand, GetCommand } from '@aws-sdk/lib-dynamodb';
import bcrypt from 'bcrypt';

const USERS_TABLE = 'Users';

export const createUser = async ({ email, password, name }) => {
    if (!email || !password) throw new Error("Email and password are mandatory");
    if (password.length < 6) throw new Error("Password must have at least 6 characters");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userItem = {
        userId: email, // Podemos usar el email como Partition Key
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        name: name ? name.trim().substring(0, 50) : "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    try {
        await dynamoClient.send(new PutCommand({
            TableName: USERS_TABLE,
            Item: userItem,
            ConditionExpression: "attribute_not_exists(userId)"
        }));
        return userItem;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

export const getUserByEmail = async (email) => {
    try {
        const result = await dynamoClient.send(new GetCommand({
            TableName: USERS_TABLE,
            Key: { userId: email }
        }));
        return result.Item;
    } catch (error) {
        console.error("Error getting user:", error);
        throw error;
    }
}