import React, {createContext, useState, useContext, useEffect} from 'react';
import axios from "axios";
import {showErrorDialog, showSuccessDialog} from "../utils/Alert";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loadUserData, setLoadUserDat] = useState(true);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(null);
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [errorMassage, setErrorMessage] = useState('some error');
    const [defaultUserFilter] = useState(null);


    useEffect(() => {
        // Check if user is logged in (e.g., check localStorage or session)
        const checkAuth = async () => {
            try {
                const savedToken = localStorage.getItem('token');
                const savedUser = localStorage.getItem('user');
                if (savedToken && savedUser) {
                    setToken(savedToken);
                    setUser(JSON.parse(savedUser));
                }
            } catch (error) {
                console.error('Auth check failed:', error);
            } finally {
                setLoadUserDat(false);
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

    const getUserInfo = async (userId) => {
        try {
            setLoading(true);
            // const currentToken = customToken || token;
            const response = await axios.get(`http://localhost:8080/api/users/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setUserInfo(response.data);
            setLoading(false)
            return response.data;
        } catch (error) {
            setLoading(false);
            const message = error?.response?.data?.message || 'Failed to fetch user info';
            setErrorMessage(message);
            await showErrorDialog("Lỗi", message);
            throw new Error(message);
        }
    }
    const getAllUser = async (search = defaultUserFilter) => {
        try {
            setLoading(true);
            // const currentToken = customToken || token;
            const response = await axios.get('http://localhost:8080/api/users', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    search: search
                }
            });
            // setLoading(false);
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
            const res = await axios.put(`http://localhost:8080/api/users/${userId}/admin-edit`, editUserDTO, {
                headers: {'Authorization': `Bearer ${token}`}
            });
            const message = res?.data?.message || "Thay đổi thông tin thành công!";
            await showSuccessDialog("Thành công", message);
            // await getAllUser();
        } catch (error) {
            const message = error?.response?.data?.message || 'Chỉnh sửa người dùng thất bại';
            await showErrorDialog("Lỗi", message);
        }
    };

    const updateAvatar = async (userId, avatarFile) => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('avatar', avatarFile);
            await axios.post(`http://localhost:8080/api/users/${userId}/avatar`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setLoading(false);
            await showSuccessDialog("Avatar updated successfully!", "");
            // await getAllUser();
        } catch (error) {
            setLoading(false);
            const message = error?.response?.data?.message || 'Failed to update avatar';
            await showErrorDialog(message);
        }

    };

    const banUser = async (id) => {
        await axios.put(`http://localhost:8080/api/users/ban/${id}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        // await getAllUser();
    };

    const changeUserRole = async (userId, roleId) => {
        await axios.put(`http://localhost:8080/api/users/${userId}/change-role?roleId=${roleId}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        await getAllUser();
        try {
            const res = await axios.put(`http://localhost:8080/api/users/${userId}/change-role?roleId=${roleId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            // await getAllUser();
            const message = res?.data?.message || "Thay đổi vai trò thành công!";
            await showSuccessDialog("Thành công", message);
        } catch (error) {
            const message = error?.response?.data?.message;
            await showErrorDialog("Lỗi", message);
        }
    };
    const getAllRole = async () => {
        const response = await axios.get(`http://localhost:8080/api/roles`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setRoles(response.data);
    };

    const addUser = async (userData) => {
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:8080/api/users/add', userData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setLoading(false);
            await showSuccessDialog("Thêm người dùng thành công!", "");
            // await getAllUser();
            return response.data;
        } catch (error) {
            setLoading(false);
            const message = error?.response?.data?.message || 'Thêm người dùng thất bại';
            await showErrorDialog("Lỗi", message);
        }
    }

    return (
        <UserContext.Provider value={{
            user,
            token,
            login,
            logout,
            loading,
            users,
            userInfo,
            getAllUser,
            editUserByAdmin,
            updateAvatar,
            banUser,
            changeUserRole,
            roles,
            getAllRole,
            addUser,
            getUserInfo,
            loadUserData,
        }}>
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