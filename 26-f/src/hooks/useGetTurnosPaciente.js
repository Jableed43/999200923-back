import { useState, useEffect } from 'react';
import { getTurnosPaciente } from '../services/turnoService';

export const useGetTurnosPaciente = (pacienteId) => {
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTurnos = async () => {
    if (!pacienteId) return;
    try {
      setLoading(true);
      setError(null);
      const data = await getTurnosPaciente(pacienteId);
      setTurnos(data);
    } catch (err) {
      setError(err.message || "Error al obtener turnos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTurnos();
  }, [pacienteId]);

  return { turnos, loading, error, refetch: fetchTurnos };
};
