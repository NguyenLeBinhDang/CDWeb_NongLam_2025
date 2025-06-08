import React, {createContext, useState, useContext, useEffect} from 'react';
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    // const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        // Check if user is logged in (e.g., check localStorage or session)
        const checkAuth = async () => {
            try {
                const savedToken = localStorage.getItem('token');
                const savedUser = localStorage.getItem('user');
                if (savedToken && savedUser) {
                    setToken(savedToken);
                    setUser(JSON.parse(savedUser));
                    // fetchUserInfo(JSON.parse(savedUser).id);
                }
            } catch (error) {
                console.error('Auth check failed:', error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();

    }, []);

    const login = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', authToken);
        // fetchUserInfo(userData.id);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    // const fetchUserInfo = async (id) => {
    //     try {
    //         const response = await axios.get(`http://localhost:8080/api/users/${id}`);
    //         if (!response.status === 200 || !response.data.id === id) {
    //             throw new Error('Failed to fetch user info');
    //         }
    //         setUserInfo(response.data);
    //     } catch (error) {
    //         console.error('Failed to fetch user info:', error);
    //     }
    // }

    return (
        <UserContext.Provider value={{user, token, login, logout, loading}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}; 