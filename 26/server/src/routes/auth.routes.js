import express from 'express';
import { login, registerPaciente } from '../controllers/auth.controller.js';

const authRoutes = express.Router();

authRoutes.post('/login', login);
authRoutes.post('/register', registerPaciente);

export default authRoutes;
