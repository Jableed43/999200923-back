import { useState, useEffect } from 'react';
import { fetchApi } from '../services/api';

export const useGetProducts = (initialParams = {}) => {
  // TODO: Paso 1. Declarar estados (products, loading, error)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // TODO: Paso 2. Crear función asíncrona para hacer el fetchApi
  const getProducts = async (params = initialParams) => {
    try {
      setLoading(true)
      setError(null)

      const queryString = new URLSearchParams(params).toString()
      const endpoint = queryString ? `/product?${queryString}` : "/product"

      const data = await fetchApi(endpoint)
      setProducts(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProducts(initialParams)
  }, [])
  
  // TODO: Paso 3. Usar useEffect para disparar la petición automáticamente

  // Esqueleto temporal para que la app no se rompa visualmente
  return { 
    products, 
    loading, 
    error, 
    refetch: getProducts // permite reejecutar el hook sin esfuerzo
  };
};
