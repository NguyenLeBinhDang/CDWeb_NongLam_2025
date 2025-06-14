import {createContext, useContext, useEffect, useState} from "react";
import {showErrorDialog, showSuccessDialog} from "../utils/Alert";
import axios from "axios";

const ForgotPasswordContext = createContext();

export const ForgotPasswordProvider = ({children}) => {
        const [error, setError] = useState('');
        const [loading, setLoading] = useState(false);
        const [isUserExist, setIsUserExist] = useState(false);
        const [isPasswordChange, setIsPasswordChange] = useState(false);

        const [user, setUser] = useState(null);
        const [token, setToken] = useState(null);


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
                    setLoading(false);
                }
            };

            checkAuth();

        }, []);

        const checkEmail = async (email) => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8080/api/auth/check-email', {
                    params: {
                        email: email
                    }
                });
                setLoading(false);
                const exists = response.data.exists;
                setIsUserExist(exists);
                if (!exists) {
                    setError('Email không tồn tại trong hệ thống');
                } else {
                    setError('');
                    await sendCode(email);
                }
                console.log('Email exists: ', exists);
            } catch (error) {
                console.error('Error checking email:', error);
                const message = error.response?.data?.message || 'Failed to check email';
                setError(message);
            }
        }

        const sendCode = async (email) => {
            try {
                setLoading(true);
                const response = await axios.post('http://localhost:8080/api/auth/send-code', {}, {
                    params: {email: email}
                });
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error('Error sending code:', error);
                const message = error.response?.data?.message || 'Failed to send code';
                await showErrorDialog('Lỗi khi gửi mã xác thực', message);
            }
        }

        const verifyCode = async (email, code) => {
            try {
                setLoading(true);
                const response = await axios.post('http://localhost:8080/api/auth/verify-code', {}, {
                    params: {email: email, code: code}
                })

                if (response.status === 200) {
                    await changePassword(email, true);
                    setLoading(false);
                    await showSuccessDialog('Xác thực thành công', `Password đã được gửi về email: ${email}`)
                }

            } catch (error) {
                setLoading(false);
                console.error('Error verifying code:', error);
                const message = error.response?.data?.message || 'Failed to verify code';
                await showErrorDialog('Mã xác thực không hợp lệ', message)
            }
        }

        const changePassword = async (changePasswordRequest, code = false) => {
            try {
                const requestBody = code ? {email: changePasswordRequest} : {...changePasswordRequest};

                if (code) {
                    const response = await axios.post('http://localhost:8080/api/auth/change-password', requestBody);
                } else {
                    const response = await axios.post('http://localhost:8080/api/auth/change-password', requestBody, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });
                }
                setIsPasswordChange(true);
                if (!code) {
                    await showSuccessDialog('Thành công', 'Thay đổi mật khẩu thành công');
                }

            } catch (error) {
                setIsPasswordChange(false);
                console.error('Error changing password:', error);
                const message = error.response?.data?.message || 'Failed to change password';
                await showErrorDialog('Lỗi khi đổi mật khẩu', message);
            }
        }


        return (<ForgotPasswordContext.Provider value={{
                checkEmail,
                error,
                loading,
                isUserExist,
                verifyCode,
                isPasswordChange,
                changePassword,
            }}>
                {children}
            </ForgotPasswordContext.Provider>
        );
    }
;

export const useForgotPassword = () => {
    const context = useContext(ForgotPasswordContext);
    if (!context) {
        throw new Error('useForgotPassword must be used within a ForgotPasswordProvider');
    }
    return context;
}