import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useUser } from '../../context/UserContext';
import axios from 'axios';
import Loading from '../../components/Loader/Loading';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                email,
                password
            });
            
            const { token, user } = response.data;
            login(user, token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/google', {
                credential: credentialResponse.credential
            });
            
            const { token, user } = response.data;
            login(user, token);
            navigate('/');
        } catch (err) {
            setError('Đăng nhập bằng Google thất bại. Vui lòng thử lại.');
        }
    };

    const handleGoogleError = () => {
        setError('Đăng nhập bằng Google thất bại. Vui lòng thử lại.');
    };

    if (loading) {
        return <Loading size="large" />;
    }

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
                    
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'Đang xử lý...' : 'Đăng Nhập'}
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
                
                <div className="register-link">
                    Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
                </div>
            </div>
        </div>
    );
};

export default Login; 