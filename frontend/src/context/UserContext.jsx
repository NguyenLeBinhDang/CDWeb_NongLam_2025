import React, {createContext, useState, useContext, useEffect} from 'react';
import axios from "axios";
import {showErrorDialog} from "../utils/Alert";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    // const [userInfo, setUserInfo] = useState(null);
    const [users, setUsers] = useState([]);
    const [errorMassage, setErrorMessage] = useState('some error');


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
                    // const parsedUser = JSON.parse(savedUser);
                    // if (parsedUser.role === 'ADMIN'|| parsedUser.role === 'MOD') {
                    //     await getAllUser(savedToken);
                    // }
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
    // useEffect(() => {
    //     if (token) {
    //         getAllUser();  // Chỉ gọi khi token đã sẵn sàng
    //     }
    // }, [token]);
    const getAllUser = async (customToken) => {
        try {
            setLoading(true);
            const currentToken = customToken || token;
            const response = await axios.get('http://localhost:8080/api/users', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentToken}`
                }
            });
            setUsers(response.data);
            return response.data;
        } catch (error) {
            const message = error?.response?.data?.message || 'Failed to fetch users';
            setErrorMessage(message);
            await showErrorDialog("Lỗi", message);
        } finally {
            setLoading(false);
        }
    };


    const editUserByAdmin = async (userId, editUserDTO) => {
        try {
            await axios.put(`http://localhost:8080/api/users/${userId}/admin-edit`, editUserDTO, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            await getAllUser();
        } catch (error) {
            const message = error?.response?.data?.message || 'Chỉnh sửa người dùng thất bại';
            await showErrorDialog("Lỗi", message);
        }
    };

    const updateAvatar = async (userId, avatarFile) => {
        const formData = new FormData();
        formData.append('avatar', avatarFile);
        await axios.post(`http://localhost:8080/api/users/${userId}/avatar`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        await getAllUser();
    };

    const banUser = async (id) => {
        await axios.put(`http://localhost:8080/api/users/ban/${id}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        await getAllUser();
    };

    const changeUserRole = async (userId, roleId) => {
        await axios.put(`http://localhost:8080/api/users/${userId}/change-role?roleId=${roleId}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        await getAllUser();
    };
    return (
        <UserContext.Provider value={{user, token, login, logout, loading, users, getAllUser, editUserByAdmin, updateAvatar, banUser, changeUserRole}}>
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