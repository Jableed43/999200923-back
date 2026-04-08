import { useState, useEffect } from 'react';
import { getProfesionales } from '../services/profesionalService';

export const useGetProfesionales = (initialParams = {}) => {
  const [profesionales, setProfesionales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfesionales = async (params = initialParams) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProfesionales(params);
      setProfesionales(data);
    } catch (err) {
      setError(err.message || "Error al obtener profesionales");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfesionales();
  }, []);

  return { profesionales, loading, error, refetch: fetchProfesionales };
};
