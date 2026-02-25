import mongoose from 'mongoose'
import { MONGODB_URI } from './config.js'

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI)
        console.log("Database connected")
    } catch (error) {
        console.error("Error connecting to database", error)
        process.exit(1)
    }
}