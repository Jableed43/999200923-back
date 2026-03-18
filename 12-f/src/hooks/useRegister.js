import { useState } from 'react';
import { fetchApi } from '../services/api';

export const useRegister = () => {
  // TODO: Declarar estados de carga (loading) y error.
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // TODO: Crear la función asíncrona registerUser(userData)
  // Utilizando fetchApi con método POST
  const registerUser = async (userData) => {
     try {
      setLoading(true)
      setError(null)

      // llama al controller de createUser en express
      const data = await fetchApi("/user/register", {
        method: "POST",
        body: JSON.stringify(userData)
      })

      return {success: true, data}


     } catch (error) {
      setError(error.message)
      return {success: false, error: error.message}
     } finally {
      setLoading(false)
     }
  };

  return { registerUser, loading, error };
};
