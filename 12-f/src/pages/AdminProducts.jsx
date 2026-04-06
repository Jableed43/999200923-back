import { useState } from 'react';
import { useGetProducts } from '../hooks/useGetProducts.js';
import { useAdminProducts } from '../hooks/useAdminProducts.js';
import { ProductForm } from '../components/ProductForm.jsx';

export const AdminProducts = () => {
  const { products, loading, refetch } = useGetProducts();
  const { createProduct, updateProduct, deleteProduct, loading: adminLoading } = useAdminProducts();
  
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleOpenEdit = (p) => {
    setEditingProduct(p);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleSave = async (data) => {
    let result;
    if (editingProduct) {
      result = await updateProduct(editingProduct._id, data);
    } else {
      result = await createProduct(data);
    }

    if (result.success) {
      handleClose();
      refetch();
    } else {
      alert(result.error);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('¿Borrar este producto?')) {
      const result = await deleteProduct(id);
      if(result.success) refetch();
      else alert(result.error);
    }
  };

  if (loading && products.length === 0) return <div className="admin-page">Cargando productos...</div>;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Gestión de Productos</h1>
        <button className="btn-add" onClick={handleOpenCreate}>+ Nuevo Producto</button>
      </div>

      {showModal && (
        <ProductForm 
          product={editingProduct} 
          onSubmit={handleSave} 
          onClose={handleClose} 
          loading={adminLoading}
        />
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td>{p.quantity}</td>
              <td>
                <div className="action-row">
                  <button 
                    onClick={() => handleOpenEdit(p)} 
                    className="btn-edit"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleDelete(p._id)} 
                    disabled={adminLoading}
                    className="btn-delete"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
