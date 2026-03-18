import { useState } from "react";
import { fetchApi } from "../services/api";

export const useCreateUserAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createUser = async (userData) => {
    try {
      setLoading(true);
      await fetchApi('/user', {
        method: 'POST',
        body: JSON.stringify(userData)
      });
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { createUser, loading, error };
};
