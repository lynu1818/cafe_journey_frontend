'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext({
    user: null,
    setUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

const getTokenData = () => {
    if (typeof window !== 'undefined') { // 确保在客户端环境中运行
        const token = localStorage.getItem('access_token');
        if (token) {
            try {
                console.log("decoded data: ", jwtDecode(token))
                return jwtDecode(token);
            } catch (error) {
                console.error('Error decoding token:', error);
                return null;
            }
        }
    }
    return null;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkToken = () => {
            const tokenData = getTokenData();
            if (tokenData) {
                setUser({
                    id: tokenData.id,
                    name: tokenData.name,
                    email: tokenData.email,
                    role: tokenData.role,
                });
                console.log(tokenData);
            } else {
                setUser(null);
            }
        };

        // 监听 localStorage 变化或其他触发 token 检查的事件
        window.addEventListener('storage', checkToken);

        // 清理事件监听器
        return () => {
            window.removeEventListener('storage', checkToken);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
