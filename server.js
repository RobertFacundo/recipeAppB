// server.js (Versión Modular)

import express from 'express';
import cors from 'cors';
import 'dotenv/config'; 
import connectDB from './db.js'; // <-- Importamos la función desde el nuevo archivo

const app = express();
// MONGODB_URI ya no se necesita aquí.
const PORT = process.env.PORT || 3000;

// ====================================
// MIDDLEWARE Y RUTAS
// ====================================

app.use(express.json()); // Permite a Express leer el cuerpo de las peticiones JSON
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Recetario API funcionando con modulos ES. Listo!'
    });
});

// ====================================
// INICIAR CONEXIÓN Y SERVIDOR
// ====================================

const startServer = async () => {
    try {
        // 1. Intentar conectar a la DB
        await connectDB(); 

        // 2. Si la DB conecta, iniciamos el servidor Express
        app.listen(PORT, () => {
            console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
        });

    } catch (error) {
        // Si connectDB lanza un error, cerramos el proceso.
        console.error("No se pudo iniciar el servidor debido a un error en la base de datos.");
        process.exit(1); 
    }
}

startServer(); // Llamar a la función principal