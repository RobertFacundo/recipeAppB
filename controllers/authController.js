import {createUser, getUserByEmail} from "../services/UserServices.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: '30d',
    });
};

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please, write an email and a password' });
        }

        const userExists = await getUserByEmail( email );
        if (userExists) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        const user = await createUser({
            name,
            email,
            password
        });

        if (user) {
            res.status(201).json({
                userId: user.userId,
                name: user.name,
                email: user.email,
                token: generateToken(user.userId),
                message: 'Success... you can now log in.'
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({
            message: 'server error',
            error: error.message
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await getUserByEmail( email );

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                userId: user.userId,
                name: user.name,
                email: user.email,
                token: generateToken(user.userId),
                message: 'User logged in',
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' })
        }
    } catch (error) {
        res.status(500).json({
            message: ' Error during login',
            error: error.message
        })
    }
}