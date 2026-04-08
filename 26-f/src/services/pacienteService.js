import api from './api';

export const getPaciente = async (id) => {
    const response = await api.get(`/pacientes/${id}`);
    return response.data;
};

export const getAllPacientes = async () => {
    const response = await api.get('/pacientes');
    return response.data;
};

export const addHistoriaEntry = async (id, data) => {
    const response = await api.post(`/pacientes/${id}/historia`, data);
    return response.data;
};
