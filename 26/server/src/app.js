import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';
import turnosRoutes from './routes/turnos.routes.js';
import profesionalRoute from './routes/profesionalRoute.js';
import pacienteRoute from './routes/pacienteRoute.js';
import administrativoRoute from './routes/administrativoRoute.js';
import authRoutes from './routes/auth.routes.js';
import swaggerSpec from './swagger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api/docs.json', (req, res) => res.json(swaggerSpec));

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
app.use('/api/auth', authRoutes);

export default app;
