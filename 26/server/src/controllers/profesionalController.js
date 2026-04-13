import * as profesionalService from '../services/profesionalService.js';
import bcrypt from 'bcryptjs';

export const handleCreateProfesional = async (req, res) => {
    try {
        const data = req.body;
        // Si viene disponibilidad como string (por FormData), parsearla
        if (typeof data.disponibilidad === 'string') {
          data.disponibilidad = JSON.parse(data.disponibilidad);
        }
        
        if (req.file) {
          data.imagen = `/uploads/${req.file.filename}`;
        }

        // Hashear password si viene (creado por admin)
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        const profesional = await profesionalService.createProfesional(data);
        res.status(201).json(profesional);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear profesional" });
    }
};

export const handleUpdateProfesional = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        
        if (typeof data.disponibilidad === 'string') {
          data.disponibilidad = JSON.parse(data.disponibilidad);
        }

        if (req.file) {
          data.imagen = `/uploads/${req.file.filename}`;
        }

        const actualizado = await profesionalService.updateProfesional(id, data);
        res.json(actualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar profesional" });
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
