import { createContext, useContext, useState, useEffect } from 'react';

// 1. Crear el contexto global
const AuthContext = createContext();

// 2. Custom hook (El puente) para que los componentes puedan leer el Contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

// 3. El Componente Padre (El Cerebro)
export const AuthProvider = ({ children }) => {
  // TODO: Declarar estado 'token', con carga inicial leyendo de 'window.localStorage'
  const token = null;

  // TODO: Efecto de sincronización (Si el LocalStorage cambia, actualizar variable)

  // TODO: Crear función login(newToken) para guardar el token en memoria
  const login = (newToken) => {
    // Implementación en la clase
  };

  // TODO: Crear función logout() para borrar el token
  const logout = () => {
    // Implementación en la clase
  };

  // Dato derivado: booleano rápido para saber si estamos conectados
  const isAuthenticated = false; // TODO: Cambiar por algo como "!!token"

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
