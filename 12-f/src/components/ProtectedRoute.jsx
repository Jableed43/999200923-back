import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export const ProtectedRoute = ({children, allowedRoles}) => {
    const { user, isAuthtenticated, token } = useAuth()

    //Si no esta autenticado, se redirige al login
    if(!isAuthtenticated && !token){
        return <Navigate to="/login" replace />
    }

    // Si hay roles permitidos definidos, verificar
    if(allowedRoles && !allowedRoles.includes(user?.role)){
        return <Navigate to="/" replace />
    }
    return children
}