import { useState } from 'react';
import { fetchApi } from '../services/api';

export const useRegister = () => {
  // TODO: Declarar estados de carga (loading) y error.

  // TODO: Crear la función asíncrona registerUser(userData)
  // Utilizando fetchApi con método POST
  const registerUser = async (userData) => {
     // Implementación pendiente
     return { success: false };
  };

  return { registerUser, loading: false, error: null };
};
