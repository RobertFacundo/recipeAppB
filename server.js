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

app.get('/', (req, res) => {
    res.send(`
       <div style="display: flex; justify-content: center; align-items: center; min-height: 100vh; background-color: #f4f4f4;">
        <div style="background: white; border-radius: 10px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 30px; max-width: 600px; width: 100%; text-align: center;">
          <p style="font-size: 20px; color: #333; margin-bottom: 20px; font-weight: bold;">
            ⚠️ <strong style="color: #e74c3c;">This backend is hosted for FREE on Render</strong> and may take a few seconds to respond due to cold start.
          </p>
          <p style="font-size: 18px; color: #555; margin-bottom: 20px; font-weight: bold;">
            Now that we know the backend is up and running, feel free to visit the website:
          </p>
          <a href="https://recipe-app-f.vercel.app/" target="_blank" 
             style="font-size: 18px; color: #3498db; text-decoration: none; font-weight: bold; padding: 10px 20px; background-color: #ecf0f1; border-radius: 5px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); transition: all 0.3s ease;">
            👉 Go to the website
          </a>
          <p style="font-size: 16px; color: #777; margin-top: 20px;">
            Thank you for your patience and understanding!
          </p>
        </div>
      </div>
    `);
});

const startServer = async () => {
  try {
    await connectDB(); 
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