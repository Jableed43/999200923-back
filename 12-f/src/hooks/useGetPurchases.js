import { useState, useEffect, useCallback } from "react";
import { fetchApi } from "../services/api";

export const useGetPurchases = () => {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPurchases = useCallback(async () => {
        setLoading(true);
        try {
            const data = await fetchApi("/purchase");
            setPurchases(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPurchases();
    }, [fetchPurchases]);

    return { purchases, loading, error, refetch: fetchPurchases };
};