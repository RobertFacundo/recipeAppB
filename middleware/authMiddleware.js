import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Verificar el token
      const decoded = jwt.verify(token, JWT_SECRET);

      // Buscar usuario por ID
      const user = await User.findById(decoded.id).select('-password'); // excluye el hash

      if (!user) {
        return res.status(401).json({ message: 'Usuario no encontrado, token inválido.' });
      }

      // Agregar datos del usuario al request
      req.user = {
        _id: user._id,
        email: user.email,
        name: user.name
      };

      next();
    } catch (error) {
      console.error('Token verification error:', error.message);
      return res.status(401).json({ message: 'Unauthorized, token failed or expired' });
    }
  } else {
    return res.status(401).json({ message: 'No token, no authorization' });
  }
};