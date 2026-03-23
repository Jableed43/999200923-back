import { useState } from "react";
import { useCreateCategory } from "../hooks/useCreateCategory";
import { useDeleteCategory } from "../hooks/useDeleteCategory";
import { useGetCategories } from "../hooks/useGetCategories";

const AdminCategories = () => {
  const { categories, loading, refetch } = useGetCategories();
  const { createCategory, loading: creating } = useCreateCategory();
  const { deleteCategory, loading: deleting } = useDeleteCategory();
  const [newName, setNewName] = useState("");

    const handleCreate = async (e) => {
        e.preventDefault()
        if(!newName.trim()){
            return null
        }
        const result = await createCategory(newName)
        if(result.success){
            setNewName("")
            refetch()
        } else {
            alert(result.error)
        }
    }

    const handleDelete = async (id) => {
        if(window.confirm("¿Eliminar esta categoría?")){
           const result = await deleteCategory(id)
           if(result.success){
            refetch()
           } else {
            alert(result.error)
           }
        }
    }


  if (loading)
    return <div className="admin-page"> Cargando categorias... </div>;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Gestión de categorías</h1>
      </div>

      <form onSubmit={handleCreate} className="category-form">
        <input
          type="text"
          placeholder="Nombre de nueva categoría"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button className="btn-add" type="submit" disabled={creating}>
          {creating ? "..." : "+ Agregar"}
        </button>
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>
                <button onClick={() => handleDelete(category._id)} disabled={deleting} className="btn-delete">
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

export default AdminCategories;
