import { useState } from "react";
import { fetchApi } from "../services/api";

export const useUpdateUser = () => {
    const [loading, setLoading] = useState(false);

    const updateUser = async (id, userData) => {
        setLoading(true);
        try {
            const data = await fetchApi(`/user/${id}`, {
                method: "PATCH",
                body: userData instanceof FormData ? userData : JSON.stringify(userData)
            });
            return { success: true, data };
        } catch (err) {
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    return { updateUser, loading };
};
