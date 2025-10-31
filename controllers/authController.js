import User from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '30d',
  });
};

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please, write an email and a password' });
    }

    // Buscar usuario existente
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Crear usuario
    const user = await User.create({
      name,
      email,
      password, // se hashea automáticamente en el pre('save')
    });

    if (user) {
      res.status(201).json({
        userId: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        message: 'Success... you can now log in.'
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por email
    const user = await User.findOne({ email });

    // Comparar contraseñas
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        userId: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        message: 'User logged in',
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error during login',
      error: error.message
    });
  }
};