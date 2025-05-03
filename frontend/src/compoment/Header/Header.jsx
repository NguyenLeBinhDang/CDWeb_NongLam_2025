import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    };

    return (
        <header className="site-header">
            <div className="container">
                <div className="header-main py-2">
                    <div className="row align-items-center">
                        <div className="col-lg-3 col-md-4 col-8">
                            <div className="site-branding">
                                <Link to="/" className="logo">
                                    <img src="/logo.png" alt="TopTruyenTV" className="img-fluid" />
                                    <span className="site-name">TopTruyenTV</span>
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
                        <div className="col-lg-3 col-md-4 col-4 text-end">
                            <div className="header-actions">
                                <button className="btn btn-sm btn-outline-light me-2 d-none d-md-inline-block">
                                    <i className="fas fa-user-circle me-1"></i> Đăng nhập
                                </button>
                                <button 
                                    className="mobile-menu-toggle d-md-none"
                                    onClick={toggleMobileMenu}
                                >
                                    <i className={`fas ${showMobileMenu ? 'fa-times' : 'fa-bars'}`}></i>
                                </button>
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
