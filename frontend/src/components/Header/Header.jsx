import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import axios from 'axios';
import './Header.css';
import {useFilter} from "../../context/FilterContext";

const Header = () => {
    const navigate = useNavigate();
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const { user, logout } = useUser();
    const {categories, getAllCategories,getManga, setFilterFromHome} = useFilter();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const [typingTimeout, setTypingTimeout] = useState(null);
    useEffect(() => {
        getAllCategories();
    },[]);

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    };

    const handleSelectedCategory = (categoryId) => {
        navigate(`/manga/category/${categoryId}`);
    };

    const handleBookmarkClick = () => {
        navigate('/bookmark');
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

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (typingTimeout) clearTimeout(typingTimeout);

        // Đợi 300ms sau khi dừng gõ để gọi API
        const timeout = setTimeout(async () => {
            if (value.trim() === '') {
                setSearchSuggestions([]);
                return;
            }

            try {
                const params = new URLSearchParams();
                params.append("search", value);
                const response = await axios.get(`http://localhost:8080/api/manga?${params.toString()}`);
                setSearchSuggestions(response.data.slice(0, 5)); // Gợi ý tối đa 5
            } catch (error) {
                console.error("Failed to fetch suggestions", error);
            }
        }, 300);

        setTypingTimeout(timeout);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        const newFilter = {
            search: searchTerm,
            categoryIds: [],
            statusId: null,
            authorId: null,
        };
        setFilterFromHome(newFilter); // Lưu filter vào context
        await getManga(newFilter);    // Gọi API để lấy kết quả tương ứng
        navigate('/all-manga');// Điều hướng tới trang danh sách
        setSearchSuggestions([]);
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
                                <form className="d-flex" onSubmit={handleSearchSubmit}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tìm kiếm truyện..."
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                    />
                                    {searchSuggestions.length > 0 && (
                                        <ul className="autocomplete-suggestions">
                                            {searchSuggestions.map(manga => (
                                                <li
                                                    key={manga.id}
                                                    className="suggestion-item"
                                                    onClick={() => {
                                                        setSearchSuggestions([]); // 🔴 Ẩn autocomplete
                                                        navigate(`/manga/${manga.id}`);
                                                    }}

                                                >
                                                    <img src={manga.cover_img} alt={manga.name} />
                                                    <span className="suggestion-text">{manga.name}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
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
                        <li><Link to="/"><i className="fas fa-home"></i> Trang chủ</Link></li>
                        <li><Link to="/hot"><i className="fas fa-fire"></i> Truyện Hot</Link></li>
                        <li><Link to="/completed"><i className="fas fa-check-circle"></i> Hoàn thành</Link></li>
                        <li className="dropdown">
                            <Link to="#" className="dropdown-toggle">
                                <i className="fas fa-list"></i> Thể loại
                            </Link>
                            {/*<span className="dropdown-toggle"> <i className="fas fa-list"></i> Thể loại</span>*/}
                            <ul className="dropdown-menu">
                                {categories.map((cat) => (
                                    <li key={cat.id}>
                                        <button
                                            onClick={() => handleSelectedCategory(cat.id)}
                                            className="dropdown-item-btn"
                                        >
                                            {cat.category_name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li className="d-flex gap-2"><Link to="/bookmark"><i className="fas fa-bookmark"></i> Theo dõi </Link></li>

                        <li className="d-flex gap-2"><Link to="/admin"><i className="fas fa-cog"></i> Admin </Link></li>

                        {/*<li><span className="d-flex gap-2" onClick={handleBookmarkClick}><i className="fas fa-bookmark"></i> Theo dõi</span></li>*/}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
