import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import axios from 'axios';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const { user, logout } = useUser();

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8080/api/auth/logout');
            logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
            // Still logout locally even if server request fails
            logout();
            navigate('/login');
        }
    };

    return (
        <header className="site-header">
            <div className="container">
                <div className="header-main py-2">
                    <div className="row align-items-center">
                        <div className="col-lg-3 col-md-4 col-8">
                            <div className="site-branding">
                                <Link to="/" className="logo">
                                    <img src="/img.png" alt="LowQuality" className="img-fluid" />
                                    <span className="site-name">LowQuality</span>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-4 d-none d-md-block">
                            <div className="search-box">
                                <form className="d-flex">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Tìm kiếm truyện..." 
                                    />
                                    <button type="submit" className="btn btn-primary">
                                        <i className="fas fa-search"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-4">
                            <div className="user-actions">
                                {user ? (
                                    <div className="d-flex gap-2">
                                        <Link to="/profile" className="btn btn-outline-light">
                                            <i className="fas fa-user"></i> Profile
                                        </Link>
                                        <button onClick={handleLogout} className="btn btn-outline-light">
                                            <i className="fas fa-sign-out-alt"></i> Đăng xuất
                                        </button>
                                    </div>
                                ) : (
                                    <Link to="/login" className="btn btn-outline-light">
                                        <i className="fas fa-sign-in-alt"></i> Đăng nhập
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                
                <nav className={`main-navigation ${showMobileMenu ? 'mobile-menu-active' : ''}`}>
                    <ul className="main-menu">
                        <li><Link to="/" className="active"><i className="fas fa-home"></i> Trang chủ</Link></li>
                        <li><Link to="/hot"><i className="fas fa-fire"></i> Truyện Hot</Link></li>
                        <li><Link to="/completed"><i className="fas fa-check-circle"></i> Hoàn thành</Link></li>
                        <li className="dropdown">
                            <Link to="#" className="dropdown-toggle">
                                <i className="fas fa-list"></i> Thể loại
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link to="/category/action">Action</Link></li>
                                <li><Link to="/category/adventure">Adventure</Link></li>
                                <li><Link to="/category/comedy">Comedy</Link></li>
                                <li><Link to="/category/drama">Drama</Link></li>
                                <li><Link to="/category/fantasy">Fantasy</Link></li>
                                <li><Link to="/category/horror">Horror</Link></li>
                                <li><Link to="/category/romance">Romance</Link></li>
                                <li><Link to="/category/sci-fi">Sci-Fi</Link></li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <Link to="#" className="dropdown-toggle">
                                <i className="fas fa-bookmark"></i> Theo dõi
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link to="/bookmark/reading">Đang đọc</Link></li>
                                <li><Link to="/bookmark/favorites">Yêu thích</Link></li>
                                <li><Link to="/bookmark/history">Lịch sử</Link></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
