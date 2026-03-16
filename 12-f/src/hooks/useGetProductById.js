import { useState, useEffect } from 'react';
import { fetchApi } from '../services/api';

export const useGetProductById = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      // Si no me pasan ID, no busco nada (útil para prevenir bugs en montajes)
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const data = await fetchApi(`/product/${id}`);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]); // Si el ID cambia, vuelve a disparar el useEffect

  return { product, loading, error };
};
