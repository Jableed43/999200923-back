import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';

export const Login = () => {
  // TODO: 1. Declarar estados (useState) para controlar el email y password
  
  // TODO: 2. Importar hook useLogin y destructurar sus valores
  
  // TODO: 3. (Opcional) Trampa de redirección inteligente leyendo la URL
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: 4. Prevenir recarga y ejecutar loginUser. 
    // Si sale bien, redirigir usando navigate()
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Iniciar Sesión</h2>
        
        {/* TODO: Mostrar banner de error si credenciales son inválidas */}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            {/* TODO: Ligar el input visual al estado de React */}
            <input type="email" placeholder="correo@ejemplo.com" required />
          </div>
          <div>
            <label>Contraseña:</label>
            {/* TODO: Ligar el input visual al estado de React */}
            <input type="password" placeholder="********" required />
          </div>
          
          <button type="submit">
            Ingresar
          </button>
        </form>
        
        <p className="auth-footer">
          ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
};
