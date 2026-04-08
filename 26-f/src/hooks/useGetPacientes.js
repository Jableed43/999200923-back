import { useState, useEffect } from 'react';
import { getAllPacientes } from '../services/pacienteService';

export const useGetPacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPacientes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllPacientes();
      setPacientes(data);
    } catch (err) {
      setError(err.message || "Error al obtener pacientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  return { pacientes, loading, error, refetch: fetchPacientes };
};
