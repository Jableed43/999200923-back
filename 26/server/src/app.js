import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import turnosRoutes from './routes/turnos.routes.js';
import profesionalRoute from './routes/profesionalRoute.js';
import pacienteRoute from './routes/pacienteRoute.js';
import administrativoRoute from './routes/administrativoRoute.js';

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rutas Base
app.get('/', (req, res) => {
    res.json({
        message: "Bienvenido a la API del Sistema de Turnos",
        version: "1.0.0",
        status: "OK"
    });
});

app.use('/api/turnos', turnosRoutes);
app.use('/api/profesionales', profesionalRoute);
app.use('/api/pacientes', pacienteRoute);
app.use('/api/administrativos', administrativoRoute);

export default app;
