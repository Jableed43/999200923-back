import { useState } from 'react';
import {AuthContext} from "./AuthContext.jsx"

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => window.sessionStorage.getItem('ecommerce_token'));

  const login = (newToken) => {
    window.sessionStorage.setItem('ecommerce_token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    window.sessionStorage.removeItem('ecommerce_token');
    setToken(null);
  };

  const isAuthenticated = !!token; // boolean rapido true/false

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
