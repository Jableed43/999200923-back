import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Componente para proteger rutas basadas en autenticación y roles.
 * @param {Array} allowedRoles - Roles permitidos para esta ruta.
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <p>Cargando sesión...</p>
            </div>
        );
    }

    if (!user) {
        // Redirigir al login y guardar la ubicación para volver después
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Redirigir a la home si el rol no está permitido
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
