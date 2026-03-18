import { useState } from "react";
import { fetchApi } from "../services/api";

export const useDeleteUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await fetchApi(`/user/${id}`, { method: 'DELETE' });
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { deleteUser, loading, error };
};