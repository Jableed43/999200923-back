import React, { useState } from 'react'
import { useCreateUserAdmin } from '../hooks/useCreateUserAdmin';

function UserFormAdmin({onSuccess, onCancel}) {
    const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    role: "CUSTOMER"
  });

   const {createUser, loading, error } = useCreateUserAdmin()

   const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name] : e.target.value
    })
   }

   const handleSubmit = async (e) => {
    e.preventDefault()
    console.log({formData})
    const result = await createUser(formData)
    if(result.success){
        onSuccess()
    }
   } 
  return (
    <div className="admin-form-container">
      <h3>Crear Nuevo Usuario</h3>
      {error && <div className="error-banner">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input name="name" type="text" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Apellido:</label>
          <input name="lastName" type="text" value={formData.lastName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input name="password" type="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Rol:</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="CUSTOMER">Consumidor</option>
            <option value="SELLER">Vendedor</option>
            <option value="ADMIN">Administrador</option>
          </select>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-save" disabled={loading}>
            {loading ? "Guardando..." : "Crear Usuario"}
          </button>
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export default UserFormAdmin