import mongoose from 'mongoose';

// Obtenemos la URI desde las variables de entorno
const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Función que intenta conectar a MongoDB Atlas y maneja errores.
 */
const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Conexión exitosa a MongoDB Atlas (Módulo DB).');
        
        // No iniciamos el servidor aquí, solo exportamos la conexión.
        return true; 
    } catch (error) {
        console.error('❌ Error al conectar a MongoDB. La aplicación no puede iniciar:', error.message);
        // Dejamos que el server.js decida si debe salir o no.
        throw error;
    }
}

export default connectDB;