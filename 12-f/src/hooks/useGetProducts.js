import { useState, useEffect } from 'react';
import { fetchApi } from '../services/api';

export const useGetProducts = (initialParams = {}) => {
  // TODO: Paso 1. Declarar estados (products, loading, error)

  // TODO: Paso 2. Crear función asíncrona para hacer el fetchApi
  
  // TODO: Paso 3. Usar useEffect para disparar la petición automáticamente

  // Esqueleto temporal para que la app no se rompa visualmente
  return { 
    products: [], 
    loading: false, 
    error: null, 
    refetch: () => {} 
  };
};
