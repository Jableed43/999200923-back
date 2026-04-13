import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { register } from '../services/authService';
import { TextField, Button, Paper, Typography, InputAdornment } from '@mui/material';
import { Mail, Lock, User, UserPlus, ArrowLeft } from 'lucide-react';
import Swal from 'sweetalert2';

const Register = () => {
    const [userData, setUserData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (userData.password !== userData.confirmPassword) {
            return Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
        }

        try {
            const data = await register({
                nombre: userData.nombre,
                apellido: userData.apellido,
                email: userData.email,
                password: userData.password
            });
            
            loginUser(data.user, data.token);
            
            Swal.fire({
                title: '¡Registro Exitoso!',
                text: `Bienvenido a SePrise, ${userData.nombre}. Ya puedes reservar un turno.`,
                icon: 'success'
            });

            navigate('/');
        } catch (err) {
            Swal.fire('Error', err.response?.data?.error || 'Error al registrarse', 'error');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '20px' }}>
            <Paper className="glass-card" style={{ padding: '40px', width: '100%', maxWidth: '450px' }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <div style={{ backgroundColor: 'var(--accent)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                        <UserPlus color="white" size={30} />
                    </div>
                    <Typography variant="h4" style={{ color: 'var(--secondary)', fontWeight: '800' }}>Registro de Paciente</Typography>
                    <Typography variant="body2" style={{ color: 'var(--text-light)' }}>Crea tu cuenta para gestionar tus turnos online</Typography>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <TextField
                            fullWidth label="Nombre" name="nombre"
                            value={userData.nombre} onChange={handleChange} required
                        />
                        <TextField
                            fullWidth label="Apellido" name="apellido"
                            value={userData.apellido} onChange={handleChange} required
                        />
                    </div>
                    <TextField
                        fullWidth label="Correo Electrónico" name="email" type="email"
                        value={userData.email} onChange={handleChange} required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Mail size={20} color="var(--text-light)" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        fullWidth label="Contraseña" name="password" type="password"
                        value={userData.password} onChange={handleChange} required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock size={20} color="var(--text-light)" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        fullWidth label="Confirmar Contraseña" name="confirmPassword" type="password"
                        value={userData.confirmPassword} onChange={handleChange} required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock size={20} color="var(--text-light)" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button 
                        type="submit" 
                        variant="contained" 
                        fullWidth 
                        size="large"
                        style={{ backgroundColor: 'var(--primary)', padding: '12px', fontWeight: 'bold', marginTop: '10px' }}
                    >
                        Crear Cuenta
                    </Button>
                </form>

                <div style={{ marginTop: '30px', textAlign: 'center', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                    <Link to="/login" style={{ textDecoration: 'none', color: 'var(--text-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                        <ArrowLeft size={16} /> Ya tengo cuenta, quiero iniciar sesión
                    </Link>
                </div>
            </Paper>
        </div>
    );
};

export default Register;
