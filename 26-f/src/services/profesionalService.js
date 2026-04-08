import api from './api';

export const getProfesionales = async (params = {}) => {
    const response = await api.get('/profesionales', { params });
    return response.data;
};
