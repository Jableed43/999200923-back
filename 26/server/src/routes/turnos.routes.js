import express from 'express';
const router = express.Router();
import { 
    getTurnosDisponibles, 
    reservarTurno, 
    handleUpdateEstado,
    getTurnosByPaciente,
    getTurnosByProfesional,
    handleReprogramar
} from '../controllers/turnos.controller.js';
import { verifyToken, checkRole } from '../middlewares/authMiddleware.js';

// Obtener turnos disponibles
router.get('/disponibles', getTurnosDisponibles);

// Reservar un turno
router.post('/reservar', verifyToken, reservarTurno);

// Obtener historial del paciente
router.get('/paciente/:id', verifyToken, getTurnosByPaciente);

// Obtener agenda del profesional
router.get('/profesional/:id', verifyToken, checkRole(['profesional', 'administrativo']), getTurnosByProfesional);

// Actualizar estado (cancelar/completar)
router.patch('/:id/estado', verifyToken, checkRole(['profesional', 'administrativo', 'paciente']), handleUpdateEstado);

// Reprogramar fecha/hora
router.patch('/:id/reprogramar', verifyToken, handleReprogramar);

export default router;
