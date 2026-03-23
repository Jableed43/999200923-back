import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useGetUserPurchases } from '../hooks/useGetUserPurchases.js';

export const UserPurchases = () => {
  const { user } = useAuth();
  const { purchases, loading, error } = useGetUserPurchases(user?.id);

  if (loading) return <div className="admin-page">Cargando tus compras...</div>;
  if (error) return <div className="admin-page error-text">Error: {error}</div>;

  return (
    <div className="admin-page">
      <h1>Mi Historial de Compras</h1>
      {purchases.length === 0 ? (
        <p>Aún no has realizado ninguna compra.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID Compra</th>
              <th>Fecha</th>
              <th>Productos</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{new Date(p.purchaseDate).toLocaleDateString()}</td>
                <td>
                  <ul>
                    {p.items?.map((item, idx) => (
                      <li key={idx}>{item.name} (x{item.quantity})</li>
                    ))}
                  </ul>
                </td>
                <td>${p.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
