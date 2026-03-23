import { useGetProducts } from '../hooks/useGetProducts.js';
import { useAdminProducts } from '../hooks/useAdminProducts.js';

export const AdminProducts = () => {
  const { products, loading, refetch } = useGetProducts();
  const { deleteProduct, loading: deleting } = useAdminProducts();
  
  const handleDelete = async (id) => {
    if(window.confirm('¿Borrar este producto?')) {
      const result = await deleteProduct(id);
      if(result.success) refetch();
      else alert(result.error);
    }
  };

  if (loading) return <div className="admin-page">Cargando productos...</div>;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Gestión de Productos</h1>
        <button className="btn-add">Nuevo Producto (Formulario no impl.)</button>
      </div>

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
                <button 
                  onClick={() => handleDelete(p._id)} 
                  disabled={deleting}
                  className="btn-delete"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
