import Profesional from '../models/Profesional.js';

export const createProfesional = async (data) => {
    return await Profesional.create(data);
};

export const getAllProfesionales = async (filter = {}) => {
    return await Profesional.find(filter);
};

export const getProfesionalById = async (id) => {
    return await Profesional.findById(id);
};

export const updateDisponibilidad = async (id, disponibilidad) => {
    return await Profesional.findByIdAndUpdate(
        id,
        { disponibilidad },
        { new: true }
    );
};

export const updateProfesional = async (id, data) => {
    return await Profesional.findByIdAndUpdate(id, data, { new: true });
};
