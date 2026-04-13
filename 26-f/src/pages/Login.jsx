import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login } from '../services/authService';
import { TextField, Button, Paper, Typography, InputAdornment, IconButton } from '@mui/material';
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowRight } from 'lucide-react';
import Swal from 'sweetalert2';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(credentials);
            loginUser(data.user, data.token);
            
            Swal.fire({
                title: `¡Bienvenido, ${data.user.nombre}!`,
                text: 'Has iniciado sesión correctamente.',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });

            // Redirección basada en rol
            if (data.user.role === 'administrativo') navigate('/profesional');
            else if (data.user.role === 'profesional') navigate(`/profesional?profesionalId=${data.user.id}`);
            else navigate('/');
            
        } catch (err) {
            Swal.fire('Error', 'Credenciales incorrectas o problema de servidor', 'error');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '20px' }}>
            <Paper className="glass-card" style={{ padding: '40px', width: '100%', maxWidth: '400px', backgroundColor: 'rgba(255,255,255,0.9)' }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <div style={{ backgroundColor: 'var(--primary)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                        <LogIn color="white" size={30} />
                    </div>
                    <Typography variant="h4" style={{ color: 'var(--secondary)', fontWeight: '800' }}>SePrise</Typography>
                    <Typography variant="body2" style={{ color: 'var(--text-light)' }}>Ingresa a tu portal de salud integral</Typography>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <TextField
                        fullWidth
                        label="Correo Electrónico"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Mail size={20} color="var(--text-light)" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Contraseña"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={credentials.password}
                        onChange={handleChange}
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock size={20} color="var(--text-light)" />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Button 
                        type="submit" 
                        variant="contained" 
                        fullWidth 
                        size="large"
                        style={{ backgroundColor: 'var(--primary)', padding: '12px', fontWeight: 'bold' }}
                    >
                        Iniciar Sesión
                    </Button>
                </form>

                <div style={{ marginTop: '30px', textAlign: 'center', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                    <Typography variant="body2" style={{ color: 'var(--text-light)' }}>
                        ¿Eres un paciente nuevo?
                    </Typography>
                    <Link to="/register" style={{ textDecoration: 'none', color: 'var(--primary)', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', marginTop: '5px' }}>
                        Regístrate aquí <ArrowRight size={16} />
                    </Link>
                </div>
            </Paper>
        </div>
    );
};

export default Login;
