// context/auth-context.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type AuthContextType = {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    getToken: () => string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const login = (token: string) => {
        localStorage.setItem('authToken', token);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setToken(null);
    };

    const getToken = () => {
        return localStorage.getItem('authToken');
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, getToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
