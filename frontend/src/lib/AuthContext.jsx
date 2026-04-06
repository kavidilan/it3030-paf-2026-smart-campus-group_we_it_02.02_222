import React, { useEffect, useState, createContext, useContext } from 'react';
import { mockUsers } from './mockData';
// Mock credentials for demo
export const mockCredentials = [
    {
        username: 'alice',
        password: 'student123',
        userId: 'u1',
    },
    {
        username: 'bob',
        password: 'admin123',
        userId: 'u2',
    },
    {
        username: 'charlie',
        password: 'tech123',
        userId: 'u3',
    },
    {
        username: 'diana',
        password: 'prof123',
        userId: 'u4',
    },
];
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const savedUserId = localStorage.getItem('hub_user_id');
        if (savedUserId) {
            const foundUser = mockUsers.find((u) => u.id === savedUserId);
            if (foundUser) {
                setUser(foundUser);
            }
        }
        setIsLoading(false);
    }, []);
    const loginWithCredentials = async (username, password) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 600));
        const cred = mockCredentials.find((c) => c.username.toLowerCase() === username.toLowerCase() &&
            c.password === password);
        if (!cred) {
            return {
                success: false,
                error: 'Invalid username or password.',
            };
        }
        const foundUser = mockUsers.find((u) => u.id === cred.userId);
        if (foundUser) {
            setUser(foundUser);
            localStorage.setItem('hub_user_id', foundUser.id);
            return {
                success: true,
            };
        }
        return {
            success: false,
            error: 'User account not found.',
        };
    };
    const loginWithGoogle = (role) => {
        // Simulated Google OAuth — picks a mock user by role
        const mockUser = mockUsers.find((u) => u.role === role);
        if (mockUser) {
            setUser(mockUser);
            localStorage.setItem('hub_user_id', mockUser.id);
        }
    };
    const logout = () => {
        setUser(null);
        localStorage.removeItem('hub_user_id');
    };
    return (<AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            loginWithCredentials,
            loginWithGoogle,
            logout,
            isLoading,
        }}>
      {children}
    </AuthContext.Provider>);
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
