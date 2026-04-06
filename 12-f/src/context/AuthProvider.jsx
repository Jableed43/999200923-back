import { useState, useMemo } from "react";
import { AuthContext } from "./AuthContext.jsx";
import { jwtDecode } from "jwt-decode";

export const AuthProvider = ({ children }) => {
  // 1. Estado único de verdad: el token
  const [token, setToken] = useState(
    () => sessionStorage.getItem("ecommerce_token") || null,
  );

  // 2. Cálculo derivado: el usuario se calcula automáticamente cuando el token cambia
  // Usamos useMemo para que solo se ejecute la decodificación si el token cambia
  const user = useMemo(() => {
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return {
        id: decoded.userId,
        email: decoded.userEmail,
        role: decoded.role,
        avatar: decoded.avatar,
      };
    } catch (error) {
      console.error("Invalid token:", error.message);
      // Si el token es inválido, limpiamos todo
      sessionStorage.removeItem("ecommerce_token");
      return null;
    }
  }, [token]);

  const login = (newToken) => {
    sessionStorage.setItem("ecommerce_token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    sessionStorage.removeItem("ecommerce_token");
    setToken(null);
  };

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        login,
        logout,
        isAdmin: user?.role === "ADMIN",
        isSeller: user?.role === "SELLER",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
