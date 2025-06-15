import React, {useEffect, useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useUser } from '../../context/UserContext';
import axios from 'axios';
import Loading from '../../components/Loader/Loading';
import './Register.css';
import debounce from 'lodash.debounce';
import {showErrorDialog, showSuccessDialog} from "../../utils/Alert";
const Register = () => {
    const navigate = useNavigate();
    const { login } = useUser();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: ''
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: ''
    });

    const [emailValid, setEmailValid] = useState(true);
    const [emailChecking, setEmailChecking] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const handleChange = (e) => {

        const { name, value } = e.target;


        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (name === 'email') {
            checkEmailExists(value);
        }
        const errorMsg = validate(name, value);

        setErrors(prev => ({
            ...prev,
            [name]: errorMsg
        }));

    };
    const validate = (name, value) => {
        let message = '';

        if (name === 'fullName') {
            if (!value.trim()) {
                message = 'Họ và tên không được để trống';
            }
        }

        if (name === 'email') {
            if (!value) {
                message = 'Email không được để trống';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                message = 'Email không hợp lệ';
            } else if (!emailValid) {
                message = 'Email đã được sử dụng';
            }
        }


        if (name === 'password') {
            if (!value) {
                message = 'Mật khẩu không được để trống';
            } else if (value.length < 8 || value.length > 20) {
                message = 'Mật khẩu phải có ít nhất 8 ký tự và tối đa 20 ký tự';
            }
        }

        if (name === 'confirmPassword') {
            if (value !== formData.password) {
                message = 'Mật khẩu không trùng khớp';
            }
        }

        return message;
    };



    const checkEmailExists = debounce(async (email) => {
        if (!email) return;
        setEmailChecking(true);
        try {
            const res = await axios.get(`http://localhost:8080/api/auth/check-email`, {
                params: { email }
            });
            setEmailValid(!res.data.exists); // nếu tồn tại thì không hợp lệ
        } catch (e) {
            console.error('Email check error', e);
            setEmailValid(true); // fallback
        } finally {
            setEmailChecking(false);
        }
    }, 300); // đợi 500ms sau khi dừng gõ
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', {
                email: formData.email,
                password: formData.password,
                fullName: formData.fullName
            });

            // const { token, user } = response.data;
            // login(user, token);
            setLoading(false);
            await showSuccessDialog("Đăng kí thành công", "Vui lòng xác nhận qua email để đăng nhập!")
            navigate('/login');
        } catch (err) {
            setLoading(false);
            // setError(err.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.');
            await showErrorDialog("Đăng kí thất bại",err.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.')
        }
    };
    useEffect(() => {
        const noErrors = Object.values(errors).every(err => !err); // tất cả errors đều rỗng
        const allFieldsFilled = Object.values(formData).every(val => val.trim() !== '');
        setIsFormValid(noErrors && allFieldsFilled && emailValid && !emailChecking);
    }, [errors, formData, emailValid, emailChecking]);
    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/google', {
                credential: credentialResponse.credential
            });
            
            const { token, user } = response.data;
            login(user, token);
            navigate('/');
        } catch (err) {
            setError('Đăng ký bằng Google thất bại. Vui lòng thử lại.');
        }
    };

    const handleGoogleError = () => {
        setError('Đăng ký bằng Google thất bại. Vui lòng thử lại.');
    };

    if (loading) {
        return <Loading size="large" />;
    }

    return (
        <div className="register-page">
            <div className="register-container">
                <h1 className="register-title">Đăng Ký</h1>
                
                {error && <div className="register-error">{error}</div>}
                
                <form onSubmit={handleSubmit} className="register-form">
                    <div className="form-group">
                        {errors.fullName && <div className="register-error">{errors.fullName}</div>}
                        <label htmlFor="fullName">Họ và tên</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">

                        <label htmlFor="email">Email</label>
                        {errors.email && <div className="register-error">{errors.email}</div>}
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group">

                        <label htmlFor="password">Mật khẩu</label>
                        {errors.password && <div className="register-error">{errors.password}</div>}
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength="6"
                        />
                    </div>

                    <div className="form-group">

                        <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                        {errors.confirmPassword && <div className="register-error">{errors.confirmPassword}</div>}
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            minLength="6"
                        />
                    </div>
                    
                    <button type="submit" className="register-btn"     disabled={!isFormValid || loading}>
                        {loading ? 'Đang xử lý...' : 'Đăng Ký'}
                    </button>
                </form>
                
                <div className="divider">
                    <span>hoặc</span>
                </div>
                
                <div className="google-register">
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                        useOneTap
                    />
                </div>
                
                <div className="login-link">
                    Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                </div>
            </div>
        </div>
    );
};

export default Register; 