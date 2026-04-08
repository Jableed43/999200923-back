import mongoose from 'mongoose';
import { MONGODB_URI } from './config.js';

let isConnected = false;

export const connectDB = async () => {
    if (isConnected) {
        console.log("✅ Usando conexión existente a la base de datos");
        return;
    }

    try {
        const db = await mongoose.connect(MONGODB_URI);
        isConnected = db.connections[0].readyState;
        console.log("🏁 Conexión exitosa a MongoDB (DB: turnos-923)");
    } catch (error) {
        console.error("❌ Error conectando a la base de datos", error);
        throw error;
    }
}
