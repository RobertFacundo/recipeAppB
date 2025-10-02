import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res)=>{
    res.status(200).json({
        message: 'Recetario API funcionando con modulos ES. Listo!'
    });
});

app.listen(PORT, ()=>{
    console.log(`Servidor express corriendo en el puerto ${PORT}`)
})