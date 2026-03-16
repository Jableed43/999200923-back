import { useState } from 'react';
import { fetchApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const useLogin = () => {
  // TODO: Paso 1. Declarar estados de carga (loading) y error (error).
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  // TODO: Paso 2. Importar la función "login" de nuestro AuthContext.
  const {login} = useAuth()

  // TODO: Paso 3. Crear la función asíncrona loginUser(credentials)
  // que utilice fetchApi apuntando a '/user/login'
  const loginUser = async (credentials) => {

    try {
      setLoading(true)
      setError(null)

      const data = await fetchApi("/user/login", {
        method: "POST",
        body: JSON.stringify(credentials)
      })

      if(data.token){
        login(data.token)
      }

      return {success: true, data}

    } catch (error) {
      setError(error.message)
      return {success: false, error: error.message}
    } finally {
      setLoading(false)
    }
  };

  return { loginUser, loading, error };
};
