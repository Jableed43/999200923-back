import app from './app.js';
import { connectDB } from './config/db.js';
import { PORT } from './config/config.js';

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
            console.log('--- Sistema de Turnos Backend ---');
        });
    } catch (error) {
        console.error('No se pudo iniciar el servidor:', error);
    }
};

startServer();
