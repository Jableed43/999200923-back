import React from 'react';
import { useGetPurchases } from '../hooks/useGetPurchases.js';

export const AdminPurchases = () => {
  const { purchases, loading, error } = useGetPurchases();

  if (loading) return <div className="admin-page">Cargando todas las ventas...</div>;
  if (error) return <div className="admin-page error-text">Error: {error}</div>;

  return (
    <div className="admin-page">
      <h1>Panel de Ventas Realizadas</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID Compra</th>
            <th>Usuario</th>
            <th>Fecha</th>
            <th>Productos</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.user?.email || p.user}</td>
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
    </div>
  );
};
