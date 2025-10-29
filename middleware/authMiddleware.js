import jwt from 'jsonwebtoken';
import { getUserByEmail } from '../services/UserServices.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, JWT_SECRET);
            const user = await getUserByEmail(decoded.id.toLowerCase().trim())

            if (!user) {
                return res.status(401).json({ message: 'Usuario no encontrado, token inválido.' });
            }

            req.user = {
                userId: user.userId,
                email: user.email,
                name: user.name
            };

            next();
        } catch (error) {
            console.error('Token verification error:', error.message);
            return res.status(401).json({ message: 'Unauthorized, token failed or expired' })
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'No token, no authorization' })
    }
}