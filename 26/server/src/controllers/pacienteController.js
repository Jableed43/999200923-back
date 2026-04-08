import * as pacienteService from '../services/pacienteService.js';

export const handleCreatePaciente = async (req, res) => {
    try {
        const paciente = await pacienteService.createPaciente(req.body);
        res.status(201).json(paciente);
    } catch (error) {
        res.status(500).json({ error: "Error al crear paciente" });
    }
};

export const handleGetPaciente = async (req, res) => {
    try {
        const paciente = await pacienteService.getPacienteById(req.params.id);
        if (!paciente) return res.status(404).json({ error: "No encontrado" });
        res.json(paciente);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener paciente" });
    }
};

export const handleGetPacientes = async (req, res) => {
    try {
        const pacientes = await pacienteService.getPacientes();
        res.json(pacientes);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener pacientes" });
    }
};

export const handleAddHistoria = async (req, res) => {
    try {
        const actualizado = await pacienteService.addHistoriaEntrada(req.params.id, req.body);
        res.json(actualizado);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar historia clínica" });
    }
};
