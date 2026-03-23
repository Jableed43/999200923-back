import { useState } from 'react';
import { fetchApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const useCreatePurchase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth()

  const checkout = async (cartItems) => {
    try {
      setLoading(true);
      setError(null);
       
      // Armamos el Payload en la estructura exacta que tu backend pide en purchaseModel.
      // purchaseService.js espera items: [{productId, quantity}]
      const payload = {
        items: cartItems.map(item => ({
          productId: item.product._id || item.product.id,
          quantity: item.quantity
        })),
        userId: user.id
      };

      // Si Express responde 200/201, no lanza errors
      const data = await fetchApi('/purchase', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      
      return { success: true, order: data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { checkout, loading, error };
};
