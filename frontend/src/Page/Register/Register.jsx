import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useUser } from '../../context/UserContext';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    const { login } = useUser();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Mật khẩu không khớp');
            return;
        }

        try {
            // TODO: Implement registration API call
            console.log('Register data:', formData);
            // After successful registration, redirect to login
            navigate('/login');
        } catch (err) {
            setError('Đăng ký thất bại. Vui lòng thử lại.');
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            // TODO: Send credential to your backend
            console.log('Google registration success:', credentialResponse);
            // After successful registration, redirect to home
            navigate('/');
        } catch (err) {
            setError('Đăng ký bằng Google thất bại. Vui lòng thử lại.');
        }
    };

    const handleGoogleError = () => {
        setError('Đăng ký bằng Google thất bại. Vui lòng thử lại.');
    };

    return (
        <div className="register-page">
            <div className="register-container">
                <h1 className="register-title">Đăng Ký Tài Khoản</h1>
                
                {error && <div className="register-error">{error}</div>}
                
                <form onSubmit={handleSubmit} className="register-form">
                    <div className="form-group">
                        <label htmlFor="name">Họ và tên</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
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
                    
                    <button type="submit" className="register-btn">
                        Đăng Ký
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
                
                <div className="register-footer">
                    <p>Đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register; 