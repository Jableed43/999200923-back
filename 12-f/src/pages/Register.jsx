import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegister } from '../hooks/useRegister';

export const Register = () => {
  // TODO: 1. Crear un estado como objeto para name, lastName, email y password.
  // Ejemplo: const [formData, setFormData] = useState({ name: '', ... })
  
  // TODO: 2. Importar variables de estado desde useRegister (loading, error)
  const navigate = useNavigate();

  // Función manejadora para los cambios en los inputs múltiples
  const handleChange = (e) => {
    // TODO: 3. Programar el desestructurado y actualización de formData aquí
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: 4. Lanzar petición de uso. Si ocurre exitosamente, mostrar mensaje 
    // y navegar al /login
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Crear una Cuenta</h2>
        
        {/* Banner de Errores y Exitos */}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre:</label>
            <input 
              type="text" 
              name="name"
              placeholder="Tu nombre" 
              required 
            />
          </div>
          <div>
            <label>Apellido:</label>
            <input 
              type="text" 
              name="lastName"
              placeholder="Tu apellido" 
              required 
            />
          </div>
          <div>
            <label>Email:</label>
            <input 
              type="email" 
              name="email"
              placeholder="correo@ejemplo.com" 
              required 
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input 
              type="password" 
              name="password"
              placeholder="Mínimo 6 chars, 1 Mayuscula, 1 Numero" 
              required 
            />
          </div>
          
          <button type="submit">
            Registrarme
          </button>
        </form>
        
        <p className="auth-footer">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
};
