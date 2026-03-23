import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useUpdateUser } from '../hooks/useUpdateUser.js';

export const UserProfile = () => {
  const { user } = useAuth();
  const { updateUser, loading } = useUpdateUser();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    lastName: user?.lastName || '',
    password: ''
  });
  const [msg, setMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanData = {};
    if(formData.name) cleanData.name = formData.name;
    if(formData.lastName) cleanData.lastName = formData.lastName;
    if(formData.password) cleanData.password = formData.password;

    const result = await updateUser(user.id, cleanData);
    if(result.success) {
      setMsg({ type: 'success', text: 'Perfil actualizado exitosamente' });
    } else {
      setMsg({ type: 'error', text: result.error });
    }
  };

  return (
    <div className="profile-page">
      <h1>Mi Perfil</h1>
      <div className="profile-card">
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Rol:</strong> {user?.role}</p>

        <form onSubmit={handleSubmit} className="profile-form">
          <input 
            type="text" 
            placeholder="Nuevo Nombre" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input 
            type="text" 
            placeholder="Nuevo Apellido" 
            value={formData.lastName}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
          />
          <input 
            type="password" 
            placeholder="Nueva Contraseña (dejar vacío para no cambiar)" 
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <button type="submit" disabled={loading} className="btn-save">
            {loading ? 'Guardando...' : 'Actualizar Datos'}
          </button>
        </form>
        {msg && <p className={`message ${msg.type}`}>{msg.text}</p>}
      </div>
    </div>
  );
};
