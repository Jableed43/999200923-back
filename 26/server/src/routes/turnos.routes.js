import express from 'express';
const router = express.Router();
import { 
    getTurnosDisponibles, 
    reservarTurno, 
    handleUpdateEstado,
    getTurnosByPaciente,
    getTurnosByProfesional
} from '../controllers/turnos.controller.js';

// Obtener turnos disponibles
router.get('/disponibles', getTurnosDisponibles);

// Reservar un turno
router.post('/reservar', reservarTurno);

// Obtener historial del paciente
router.get('/paciente/:id', getTurnosByPaciente);

// Obtener agenda del profesional
router.get('/profesional/:id', getTurnosByProfesional);

// Actualizar estado (cancelar/completar)
router.patch('/:id/estado', handleUpdateEstado);

export default router;
