import Administrativo from '../models/Administrativo.js';

export const createAdministrativo = async (data) => {
    return await Administrativo.create(data);
};

export const getAllAdministrativos = async () => {
    return await Administrativo.find();
};
