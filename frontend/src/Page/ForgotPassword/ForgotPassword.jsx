import React, {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import Loading from '../../components/Loader/Loading';
import './ForgotPassword.css';
import {useForgotPassword} from "../../context/ForgotPasswordContext";
import VerifyCodeModal from "../../Modals/VerifyCodeModal";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const {loading, error, checkEmail} = useForgotPassword();
    const [openVerification, setOpenVerification] = useState(false);

    const handleSendCode = async (e) => {
        e.preventDefault();
        try {
            await checkEmail(email);
            if(checkEmail){setOpenVerification(true)};
        } catch (err) {
            console.error('Error sending verification code:', err);
            // Handle error if needed, e.g., show a notification
        }
    };

    if (loading) {
        return <Loading size="large"/>;
    }

    return (
        <div className="login-page">
            <div className="login-container">
                {error && <div className="login-error">{error}</div>}

                <h1 className="login-title">Quên Mật Khẩu</h1>

                <form onSubmit={handleSendCode} className="login-form">
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
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'Đang xử lý...' : 'Gửi mã xác thực'}
                    </button>
                </form>

                <div className="divider">
                    <span>hoặc</span>
                </div>

                <div className="register-link">
                    Đã nhớ ra mật khẩu? <Link to="/login">Đăng nhập</Link>
                </div>
            </div>

            <VerifyCodeModal
                isOpen={openVerification}
                onClose={() => setOpenVerification(false)}
                email={email}
            />

        </div>
    );
};

export default ForgotPassword;