import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';

// Formulario controlado:
// 1- Inputs con estado
// 2- Evento onChange trabaja con el dispatch
// 3- El value del input sea el estado

export const Login = () => {
  // TODO: 1. Declarar estados (useState) para controlar el email y password
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
  // TODO: 2. Importar hook useLogin y destructurar sus valores
  const {loginUser, loading, error} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginUser({email, password})

    // TODO: 4. Prevenir recarga y ejecutar loginUser. 
    // Si sale bien, redirigir usando navigate()
    if(result.success){
      navigate("/carrito")
    } else {
      navigate("/")
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Iniciar Sesión</h2>
        
        {/* TODO: Mostrar banner de error si credenciales son inválidas */}
        { error && <div className='error-banner'> {error} </div> }
        
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            {/* TODO: Ligar el input visual al estado de React */}
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="correo@ejemplo.com" required />
          </div>
          <div>
            <label>Contraseña:</label>
            {/* TODO: Ligar el input visual al estado de React */}
            <input value={password} onChange={(e) => setPassword(e.target.value)}  type="password" placeholder="********" required />
          </div>
          
          <button type="submit" disabled={loading}>
            { loading ? "Entrando..." : "Ingresar"}
          </button>
        </form>
        
        <p className="auth-footer">
          ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
};
