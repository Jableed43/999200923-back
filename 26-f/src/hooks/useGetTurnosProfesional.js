import { useState, useEffect } from 'react';
import api from '../services/api';

export const useGetTurnosProfesional = (profesionalId) => {
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTurnos = async () => {
    if (!profesionalId) return;
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/turnos/profesional/${profesionalId}`);
      setTurnos(response.data);
    } catch (err) {
      setError(err.message || "Error al obtener agenda");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTurnos();
  }, [profesionalId]);

  return { turnos, loading, error, refetch: fetchTurnos };
};
