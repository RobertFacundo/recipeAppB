import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js'; 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Recetario API funcionando con modulos ES. Listo!'
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