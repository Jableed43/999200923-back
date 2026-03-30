import mongoose from 'mongoose'
import { MONGODB_URI } from './config.js'

let isConnected = false;

export const connectDB = async () => {
    if (isConnected) {
        console.log("Using existing database connection");
        return;
    }

    try {
        const db = await mongoose.connect(MONGODB_URI);
        isConnected = db.connections[0].readyState;
        console.log("Database connected");
    } catch (error) {
        console.error("Error connecting to database", error);
        // En serverless no cerramos el proceso necesariamente si falla una vez
        // pero para persistir el error lo lanzamos
        throw error;
    }
}