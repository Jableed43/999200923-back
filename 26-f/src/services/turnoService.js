import api from './api';

export const getDisponibilidad = async (profesionalId, fecha) => {
    const response = await api.get('/turnos/disponibles', {
        params: { profesionalId, fecha }
    });
    return response.data;
};

export const reservarTurno = async (data) => {
    const response = await api.post('/turnos/reservar', data);
    return response.data;
};

export const getTurnosPaciente = async (pacienteId) => {
    const response = await api.get(`/turnos/paciente/${pacienteId}`);
    return response.data;
};

export const updateEstadoTurno = async (turnoId, estado) => {
    const response = await api.patch(`/turnos/${turnoId}/estado`, { estado });
    return response.data;
};

export const reprogramarTurno = async (turnoId, data) => {
    const response = await api.patch(`/turnos/${turnoId}/reprogramar`, data);
    return response.data;
};
