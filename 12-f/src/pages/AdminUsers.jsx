import React, { useState } from "react";
import { useGetUsers } from "../hooks/useGetUsers";
import { useDeleteUser } from "../hooks/useDeleteUser";
import UserFormAdmin from "../components/UserFormAdmin";

function AdminUsers() {
  // Hace el llamado a los usuarios -> necesitamos el hook useGetUsers
  const { users, loading, error, refetch } = useGetUsers();
  // Permite el borrado de usuarios
  const { deleteUser, loading: deleting } = useDeleteUser();

  const [showForm, setShowForm] = useState(false)

  const handleDelete = async (id) => {
    if(window.confirm("¿Estas seguro de que deseas eliminar este usuario?")){
       const result = await deleteUser(id)
       // Si el borrado tuvo exito, refrescamos a los usuarios 
       // y mostramos los cambios
       if(result.success){
        refetch()
       } else {
        alert(result.error)
       }
    }
  }
  // Muestra formulario de crecion de nuevo usuario
  const handleSuccess = () => {
    setShowForm(false)
    refetch()
  }
  // Centraliza la gestion de usuarios
  // Muestra en una tabla a todos los usuarios

  if (loading)
    return (
      <div className="admin-page">
        
        <p>Cargando usuarios</p>
      </div>
    );
  if (error)
    return (
      <div className="admin-page">
        
        <p className="error-text">Error: {error}</p>
      </div>
    );
  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Gestion de usuarios</h1>
        <button className="btn-add" onClick={() => setShowForm(true)} >+ Nuevo usuario</button>
      </div>

      {showForm && (
        <div className="admin-modal">
          <div className="modal-content">
            <UserFormAdmin 
              onSuccess={handleSuccess} 
              onCancel={() => setShowForm(false)} 
            />
          </div>
        </div>
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre Completo</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
            {users.map((u) => (
                <tr key={u._id}>
                    <td> {u.name} {u.lastName} </td>
                    <td> {u.email} </td>
                    <td> <span className={`role-badge role-${u.role}`}> {u.role} </span> </td>
                    <td> <button onClick={() => handleDelete(u._id)} disabled={deleting} > { deleting ? "..." : "Eliminar" } </button> </td>
                </tr>
            ) )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsers;
