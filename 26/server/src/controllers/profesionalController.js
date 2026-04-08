import * as profesionalService from '../services/profesionalService.js';

export const handleCreateProfesional = async (req, res) => {
    try {
        const profesional = await profesionalService.createProfesional(req.body);
        res.status(201).json(profesional);
    } catch (error) {
        res.status(500).json({ error: "Error al crear profesional" });
    }
};

export const handleGetProfesionales = async (req, res) => {
    try {
        const { especialidad } = req.query;
        const filter = especialidad ? { especialidad } : {};
        const profesionales = await profesionalService.getAllProfesionales(filter);
        res.json(profesionales);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener profesionales" });
    }
};

export const handleGetProfesionalDetail = async (req, res) => {
    try {
        const profesional = await profesionalService.getProfesionalById(req.params.id);
        if (!profesional) return res.status(404).json({ error: "No encontrado" });
        res.json(profesional);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener detalle" });
    }
};

export const handleUpdateDisponibilidad = async (req, res) => {
    try {
        const { disponibilidad } = req.body;
        const actualizado = await profesionalService.updateDisponibilidad(req.params.id, disponibilidad);
        res.json(actualizado);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar disponibilidad" });
    }
};
