import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
            // TODO: Implement email/password login
            console.log('Email login:', email, password);
        } catch (err) {
            setError('Login failed. Please try again.');
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            // TODO: Send credential to your backend
            console.log('Google login success:', credentialResponse);
            // After successful login, redirect to home
            navigate('/');
        } catch (err) {
            setError('Google login failed. Please try again.');
        }
    };

    const handleGoogleError = () => {
        setError('Google login failed. Please try again.');
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h1 className="login-title">Đăng Nhập</h1>
                
                {error && <div className="login-error">{error}</div>}
                
                <form onSubmit={handleEmailLogin} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    <button type="submit" className="login-btn">
                        Đăng Nhập
                    </button>
                </form>
                
                <div className="divider">
                    <span>hoặc</span>
                </div>
                
                <div className="google-login">
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                        useOneTap
                    />
                </div>
                
                <div className="login-footer">
                    <p>Chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login; 