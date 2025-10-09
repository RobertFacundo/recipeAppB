import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        if (!MONGODB_URI) {
            throw new Error('La variable de entorno MONGODB_URI no está definida.');
        }
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Conexión exitosa a MongoDB Atlas (Módulo DB).');

        return true;
    } catch (error) {
        console.error('❌ Error al conectar a MongoDB. La aplicación no puede iniciar:', error.message);
        throw error;
    }
}

export default connectDB;