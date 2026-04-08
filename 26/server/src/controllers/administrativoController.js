import * as administrativoService from '../services/administrativoService.js';

export const handleCreateAdministrativo = async (req, res) => {
    try {
        const admin = await administrativoService.createAdministrativo(req.body);
        res.status(201).json(admin);
    } catch (error) {
        res.status(500).json({ error: "Error al crear administrativo" });
    }
};

export const handleGetAdministrativos = async (req, res) => {
    try {
        const admins = await administrativoService.getAllAdministrativos();
        res.json(admins);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener lista" });
    }
};
