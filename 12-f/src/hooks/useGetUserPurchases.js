import { useState, useEffect, useCallback } from "react";
import { fetchApi } from "../services/api";

export const useGetUserPurchases = (userId) => {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUserPurchases = useCallback(async () => {
        if(!userId) return;
        setLoading(true);
        try {
            const data = await fetchApi(`/purchase/user/${userId}`);
            setPurchases(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        if(userId) fetchUserPurchases();
    }, [fetchUserPurchases, userId]);

    return { purchases, loading, error, refetch: fetchUserPurchases };
};
