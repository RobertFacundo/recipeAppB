import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js'; 
import authRoutes from './routes/authRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import externalRoutes from './routes/externalRoutes.js'
import { protect } from './middleware/authMiddleware.js';

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
        user: req.user._id
    });
});

const startServer = async () => {
    try {
        await connectDB(); 

        app.listen(PORT, () => {
            console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("No se pudo iniciar el servidor debido a un error en la base de datos.");
        process.exit(1); 
    }
}

startServer(); 