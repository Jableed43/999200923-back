import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('seprise_user');
        const token = localStorage.getItem('seprise_token');
        if (savedUser && token) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const loginUser = (userData, token) => {
        localStorage.setItem('seprise_user', JSON.stringify(userData));
        localStorage.setItem('seprise_token', token);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('seprise_user');
        localStorage.removeItem('seprise_token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, loginUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
