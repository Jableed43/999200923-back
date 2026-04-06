import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useUpdateUser } from '../hooks/useUpdateUser.js';

export const UserProfile = () => {
  const { user, login } = useAuth();
  const { updateUser, loading } = useUpdateUser();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    lastName: user?.lastName || '',
    password: ''
  });
  const [msg, setMsg] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(user?.avatar || null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    if(formData.name) data.append('name', formData.name);
    if(formData.lastName) data.append('lastName', formData.lastName);
    if(formData.password) data.append('password', formData.password);
    if(avatar) data.append('avatar', avatar);

    const result = await updateUser(user.id, data);
    if(result.success) {
      // Actualizamos el token en la sesión para que el avatar se vea en el Navbar
      if(result.data?.token) {
        login(result.data.token);
      }
      setMsg({ type: 'success', text: 'Perfil actualizado exitosamente.' });
    } else {
      setMsg({ type: 'error', text: result.error });
    }
  };

  return (
    <div className="profile-page">
      <h1>Mi Perfil</h1>
      <div className="profile-card">
        <div className="avatar-section">
          <div className="avatar-preview-wrapper">
             <img src={preview || 'https://via.placeholder.com/150'} alt="Avatar" className="avatar-img" />
          </div>
          <label htmlFor="avatar-input" className="avatar-label">Cambiar foto de perfil</label>
          <input 
            id="avatar-input"
            type="file" 
            className="hidden-input" 
            onChange={handleFileChange} 
            accept="image/*"
          />
        </div>

        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Rol:</strong> {user?.role}</p>

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>Nombre</label>
            <input 
              type="text" 
              placeholder="Tu nombre" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Apellido</label>
            <input 
              type="text" 
              placeholder="Tu apellido" 
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input 
              type="password" 
              placeholder="Nueva contraseña (opcional)" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <button type="submit" disabled={loading} className="btn-save">
            {loading ? 'Guardando...' : 'Actualizar Perfil'}
          </button>
        </form>
        {msg && <p className={`message ${msg.type}`}>{msg.text}</p>}
      </div>
    </div>
  );
};
