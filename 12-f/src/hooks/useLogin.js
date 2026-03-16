import { useState } from 'react';
import { fetchApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const useLogin = () => {
  // TODO: Paso 1. Declarar estados de carga (loading) y error (error).
  
  // TODO: Paso 2. Importar la función "login" de nuestro AuthContext.

  // TODO: Paso 3. Crear la función asíncrona loginUser(credentials)
  // que utilice fetchApi apuntando a '/user/login'
  const loginUser = async (credentials) => {
    // Aquí implementarán el try...catch
    return { success: false }; 
  };

  return { loginUser, loading: false, error: null };
};
