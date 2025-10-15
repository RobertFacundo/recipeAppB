import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const protect = async(req, res, next)=>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');

            if(!req.user){
                return res.status(401).json({ message: 'Usuario no encontrado, token inválido.' });
            }

            next();
        }catch(error){
           console.error('Token verification error:', error.message);
           return res.status(401).json({message: 'Unauthorized, token failed or expired'})
        }
    }

    if(!token){
        return res.status(401).json({message: 'No token, no authorization'})
    }
}