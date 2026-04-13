import * as turnosService from '../services/turnos.service.js';

export const getTurnosDisponibles = async (req, res) => {
    try {
        const { profesionalId, fecha } = req.query;
        if (!profesionalId || !fecha) {
            return res.status(400).json({ error: "Faltan parámetros: profesionalId y fecha son obligatorios" });
        }
        const disponibles = await turnosService.fetchDisponibles(profesionalId, fecha);
        res.json(disponibles);
    } catch (error) {
        if (error.message === "PROFESIONAL_NOT_FOUND") {
            return res.status(404).json({ error: "Profesional no encontrado" });
        }
        res.status(500).json({ error: "Error al obtener disponibilidad" });
    }
};

export const reservarTurno = async (req, res) => {
    const { 
        fecha, 
        hora, 
        pacienteId, 
        profesionalId, 
        motivo, 
        creadoPor, 
        onModel 
    } = req.body;
    
    try {
        const turno = await turnosService.processReserva({ 
            fecha, 
            hora, 
            pacienteId, 
            profesionalId, 
            motivo, 
            creadoPor, 
            onModel 
        });
        res.status(201).json({ message: "Turno creado y reservado con éxito", turno });
    } catch (error) {
        if (error.message === "SLOT_ALREADY_BOOKED") {
            return res.status(409).json({ error: "Este horario ya se encuentra reservado para este profesional" });
        }
        console.error(error); 
        res.status(500).json({ error: "Error al procesar la reserva" });
    }
};

export const handleUpdateEstado = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body; // 'cancelado', 'completado', etc.
    
    try {
        const actualizado = await turnosService.updateTurnoEstado(id, estado);
        res.json({ message: "Estado actualizado correctamente", turno: actualizado });
    } catch (error) {
        if (error.message === "TURNO_NOT_FOUND") {
            return res.status(404).json({ error: "Turno no encontrado" });
        }
        res.status(500).json({ error: "Error al actualizar estado" });
    }
};

export const getTurnosByPaciente = async (req, res) => {
    try {
        const { id } = req.params;
        const turnos = await turnosService.fetchByPaciente(id);
        res.json(turnos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener turnos del paciente" });
    }
};

export const getTurnosByProfesional = async (req, res) => {
    try {
        const { id } = req.params;
        const turnos = await turnosService.fetchByProfesional(id);
        res.json(turnos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener turnos del profesional" });
    }
};

export const handleReprogramar = async (req, res) => {
  const { id } = req.params;
  const { fecha, hora } = req.body;
  try {
    const actualizado = await turnosService.rescheduleTurno(id, { fecha, hora });
    res.json({ message: "Turno reprogramado con éxito", turno: actualizado });
  } catch (error) {
    if (error.message === "TURNO_NOT_FOUND") return res.status(404).json({ error: "Turno no encontrado" });
    if (error.message === "SLOT_ALREADY_BOOKED") return res.status(409).json({ error: "El nuevo horario ya está ocupado" });
    res.status(500).json({ error: "Error al reprogramar el turno" });
  }
};

