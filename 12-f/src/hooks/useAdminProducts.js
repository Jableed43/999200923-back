import { useState } from "react";
import { fetchApi } from "../services/api";

export const useAdminProducts = () => {
    const [loading, setLoading] = useState(false);

    const createProduct = async (productData) => {
        setLoading(true);
        try {
            const data = await fetchApi("/product", {
                method: "POST",
                body: productData instanceof FormData ? productData : JSON.stringify(productData)
            });
            return { success: true, data };
        } catch (err) {
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    const updateProduct = async (id, productData) => {
        setLoading(true);
        try {
            const data = await fetchApi(`/product/${id}`, {
                method: "PATCH",
                body: productData instanceof FormData ? productData : JSON.stringify(productData)
            });
            return { success: true, data };
        } catch (err) {
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        setLoading(true);
        try {
            await fetchApi(`/product/${id}`, {
                method: "DELETE"
            });
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    return { createProduct, updateProduct, deleteProduct, loading };
};
