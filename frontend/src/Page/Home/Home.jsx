import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    // Dữ liệu mẫu cho truyện mới cập nhật
    const latestManga = [
        { id: 1, title: "One Piece", chapter: "Chapter 1090", image: "https://via.placeholder.com/150x200", time: "2 giờ trước" },
        { id: 2, title: "Black Clover", chapter: "Chapter 369", image: "https://via.placeholder.com/150x200", time: "6 giờ trước" },
        { id: 3, title: "Jujutsu Kaisen", chapter: "Chapter 253", image: "https://via.placeholder.com/150x200", time: "12 giờ trước" },
        { id: 4, title: "My Hero Academia", chapter: "Chapter 420", image: "https://via.placeholder.com/150x200", time: "1 ngày trước" },
        { id: 5, title: "Chainsaw Man", chapter: "Chapter 150", image: "https://via.placeholder.com/150x200", time: "1 ngày trước" },
        { id: 6, title: "Solo Leveling", chapter: "Chapter 200", image: "https://via.placeholder.com/150x200", time: "1 ngày trước" },
        { id: 7, title: "Demon Slayer", chapter: "Chapter 205", image: "https://via.placeholder.com/150x200", time: "2 ngày trước" },
        { id: 8, title: "Dragon Ball Super", chapter: "Chapter 99", image: "https://via.placeholder.com/150x200", time: "2 ngày trước" },
        { id: 9, title: "Tower of God", chapter: "Chapter 592", image: "https://via.placeholder.com/150x200", time: "3 ngày trước" },
        { id: 10, title: "Bleach", chapter: "Chapter 686", image: "https://via.placeholder.com/150x200", time: "4 ngày trước" }
    ];

    // Dữ liệu mẫu cho truyện đề xuất
    const recommendedManga = [
        { id: 11, title: "Attack on Titan", image: "https://via.placeholder.com/180x250", views: "10.5M" },
        { id: 12, title: "Naruto", image: "https://via.placeholder.com/180x250", views: "15.2M" },
        { id: 13, title: "Hunter x Hunter", image: "https://via.placeholder.com/180x250", views: "8.7M" },
        { id: 14, title: "Death Note", image: "https://via.placeholder.com/180x250", views: "9.3M" },
        { id: 15, title: "Tokyo Revengers", image: "https://via.placeholder.com/180x250", views: "7.1M" }
    ];

    // Dữ liệu mẫu cho thể loại
    const categories = [
        "Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", 
        "Romance", "School Life", "Sci-Fi", "Slice of Life", "Sports", "Supernatural", "Thriller"
    ];

    return (
        <div className="home-page">
            <div className="container">
                {/* Banner Slider */}
                <div className="banner-slider mb-4">
                    <div id="homeBanner" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#homeBanner" data-bs-slide-to="0" className="active"></button>
                            <button type="button" data-bs-target="#homeBanner" data-bs-slide-to="1"></button>
                            <button type="button" data-bs-target="#homeBanner" data-bs-slide-to="2"></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src="https://via.placeholder.com/1200x400" className="d-block w-100" alt="Banner 1" />
                                <div className="carousel-caption">
                                    <h3>One Piece</h3>
                                    <p>Hành trình tìm kiếm kho báu vĩ đại nhất thế giới</p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img src="https://via.placeholder.com/1200x400" className="d-block w-100" alt="Banner 2" />
                                <div className="carousel-caption">
                                    <h3>Jujutsu Kaisen</h3>
                                    <p>Cuộc chiến giữa các thuật sư và chú linh</p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img src="https://via.placeholder.com/1200x400" className="d-block w-100" alt="Banner 3" />
                                <div className="carousel-caption">
                                    <h3>Demon Slayer</h3>
                                    <p>Thanh gươm diệt quỷ</p>
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#homeBanner" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon"></span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#homeBanner" data-bs-slide="next">
                            <span className="carousel-control-next-icon"></span>
                        </button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-8">
                        {/* Truyện mới cập nhật */}
                        <div className="content-section latest-manga">
                            <div className="section-header">
                                <h2 className="section-title">Truyện mới cập nhật</h2>
                                <Link to="/latest" className="view-all">Xem tất cả <i className="fas fa-angle-right"></i></Link>
                            </div>
                            <div className="manga-list">
                                <div className="row">
                                    {latestManga.map(manga => (
                                        <div key={manga.id} className="col-md-6 col-lg-4 mb-4">
                                            <div className="manga-card">
                                                <div className="manga-image">
                                                    <Link to={`/manga/${manga.id}`}>
                                                        <img src={manga.image} alt={manga.title} className="img-fluid" />
                                                    </Link>
                                                    <div className="manga-update">
                                                        <span>{manga.chapter}</span>
                                                    </div>
                                                </div>
                                                <div className="manga-info">
                                                    <h3 className="manga-title">
                                                        <Link to={`/manga/${manga.id}`}>{manga.title}</Link>
                                                    </h3>
                                                    <div className="update-time">
                                                        <i className="far fa-clock"></i> {manga.time}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        {/* Sidebar */}
                        <div className="sidebar">
                            {/* Truyện đề xuất */}
                            <div className="content-section recommended-manga">
                                <div className="section-header">
                                    <h2 className="section-title">Đề xuất cho bạn</h2>
                                </div>
                                <div className="recommended-list">
                                    {recommendedManga.map(manga => (
                                        <div key={manga.id} className="recommended-item">
                                            <div className="recommended-image">
                                                <Link to={`/manga/${manga.id}`}>
                                                    <img src={manga.image} alt={manga.title} className="img-fluid" />
                                                </Link>
                                            </div>
                                            <div className="recommended-info">
                                                <h3 className="manga-title">
                                                    <Link to={`/manga/${manga.id}`}>{manga.title}</Link>
                                                </h3>
                                                <div className="manga-views">
                                                    <i className="far fa-eye"></i> {manga.views} lượt xem
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Thể loại */}
                            <div className="content-section categories">
                                <div className="section-header">
                                    <h2 className="section-title">Thể loại</h2>
                                </div>
                                <div className="categories-list">
                                    {categories.map((category, index) => (
                                        <Link key={index} to={`/category/${category.toLowerCase()}`} className="category-tag">
                                            {category}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Truyện đọc nhiều nhất */}
                <div className="content-section popular-manga">
                    <div className="section-header">
                        <h2 className="section-title">Truyện đọc nhiều nhất</h2>
                        <Link to="/popular" className="view-all">Xem tất cả <i className="fas fa-angle-right"></i></Link>
                    </div>
                    <div className="popular-list">
                        <div className="row">
                            {recommendedManga.map(manga => (
                                <div key={manga.id} className="col-md-4 col-lg-2 mb-4">
                                    <div className="popular-card">
                                        <div className="popular-image">
                                            <Link to={`/manga/${manga.id}`}>
                                                <img src={manga.image} alt={manga.title} className="img-fluid" />
                                            </Link>
                                            <div className="popular-ranking">
                                                <span>{manga.id - 10}</span>
                                            </div>
                                        </div>
                                        <div className="popular-info">
                                            <h3 className="manga-title">
                                                <Link to={`/manga/${manga.id}`}>{manga.title}</Link>
                                            </h3>
                                            <div className="manga-views">
                                                <i className="far fa-eye"></i> {manga.views}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;