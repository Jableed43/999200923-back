import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWT_SECRET } from '../config/config.js';
import Administrativo from '../models/Administrativo.js';
import Profesional from '../models/Profesional.js';
import Paciente from '../models/Paciente.js';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar en las 3 colecciones
        let user = await Administrativo.findOne({ email });
        if (!user) user = await Profesional.findOne({ email });
        if (!user) user = await Paciente.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role, email: user.email },
            JWT_SECRET,
            { expiresIn: '8h' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                nombre: user.nombre,
                apellido: user.apellido,
                role: user.role,
                email: user.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

export const registerPaciente = async (req, res) => {
    try {
        const { nombre, apellido, email, password } = req.body;

        const existing = await Paciente.findOne({ email });
        if (existing) return res.status(400).json({ error: "El email ya está registrado" });

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const nuevoPaciente = await Paciente.create({
            nombre,
            apellido,
            email,
            password: hashedPassword,
            role: 'paciente'
        });

        const token = jwt.sign(
            { id: nuevoPaciente._id, role: 'paciente', email: nuevoPaciente.email },
            JWT_SECRET,
            { expiresIn: '8h' }
        );

        res.status(201).json({
            token,
            user: {
                id: nuevoPaciente._id,
                nombre,
                apellido,
                role: 'paciente',
                email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al registrar paciente" });
    }
};
