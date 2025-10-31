import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import externalRoutes from './routes/externalRoutes.js'
import { protect } from './middleware/authMiddleware.js';
import connectDB from './config/connectDB.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/recipes', recipeRoutes)
app.use('/api/v1/search', searchRoutes)
app.use('/api/v1/external', externalRoutes)

app.get('/', protect, (req, res) => {
    res.status(200).json({
        message: '¡PROTECTED ROUTE WORKING!',
        user: req.user.userId
    });
});

// Conectar a MongoDB y arrancar el servidor
const startServer = async () => {
  try {
    await connectDB(); // 👈 conexión a MongoDB
    console.log('✅ Conectado a MongoDB correctamente');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor Express corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB o iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer(); 