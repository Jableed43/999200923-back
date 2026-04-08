import { useState, useEffect } from 'react';
import { getDisponibilidad } from '../services/turnoService';

export const useGetDisponibilidad = (profesionalId, fecha) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDisponibilidad = async () => {
    if (!profesionalId || !fecha) return;
    try {
      setLoading(true);
      setError(null);
      const res = await getDisponibilidad(profesionalId, fecha);
      setData(res);
    } catch (err) {
      setError(err.response?.data?.error || "Error al obtener disponibilidad");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisponibilidad();
  }, [profesionalId, fecha]);

  return { data, loading, error, refetch: fetchDisponibilidad };
};
