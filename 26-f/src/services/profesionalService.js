import api from './api';

export const getProfesionales = async (params = {}) => {
    const response = await api.get('/profesionales', { params });
    return response.data;
};

export const createProfesional = async (data) => {
    // Si data es FormData, axios lo maneja correctamente
    const response = await api.post('/profesionales', data);
    return response.data;
};

export const updateProfesional = async (id, data) => {
    const response = await api.put(`/profesionales/${id}`, data);
    return response.data;
};

export const getProfesionalById = async (id) => {
    const response = await api.get(`/profesionales/${id}`);
    return response.data;
};
