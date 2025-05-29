import React, {useEffect} from 'react';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import MangaCard from '../../components/mangaCard';
import {useFilter} from '../../context/FilterContext';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    const {mangaList, categories, getAllCategories, getAllManga, setFilterFromHome} = useFilter();

    useEffect(() => {
        getAllManga();
        getAllCategories();
    }, []);

    // Dữ liệu mẫu cho truyện mới cập nhật
    // const latestManga = [
    //     { id: 1, title: "One Piece", chapter: "Chapter 1090", image: "https://via.placeholder.com/150x200", time: "2 giờ trước" },
    //     { id: 2, title: "Black Clover", chapter: "Chapter 369", image: "https://via.placeholder.com/150x200", time: "6 giờ trước" },
    //     { id: 3, title: "Jujutsu Kaisen", chapter: "Chapter 253", image: "https://via.placeholder.com/150x200", time: "12 giờ trước" },
    //     { id: 4, title: "My Hero Academia", chapter: "Chapter 420", image: "https://via.placeholder.com/150x200", time: "1 ngày trước" },
    //     { id: 5, title: "Chainsaw Man", chapter: "Chapter 150", image: "https://via.placeholder.com/150x200", time: "1 ngày trước" },
    //     { id: 6, title: "Solo Leveling", chapter: "Chapter 200", image: "https://via.placeholder.com/150x200", time: "1 ngày trước" },
    //     { id: 7, title: "Demon Slayer", chapter: "Chapter 205", image: "https://via.placeholder.com/150x200", time: "2 ngày trước" },
    //     { id: 8, title: "Dragon Ball Super", chapter: "Chapter 99", image: "https://via.placeholder.com/150x200", time: "2 ngày trước" },
    //     { id: 9, title: "Tower of God", chapter: "Chapter 592", image: "https://via.placeholder.com/150x200", time: "3 ngày trước" },
    //     { id: 10, title: "Bleach", chapter: "Chapter 686", image: "https://via.placeholder.com/150x200", time: "4 ngày trước" }
    // ];

    // Dữ liệu mẫu cho truyện đề xuất
    const recommendedManga = [
        {id: 11, title: "Attack on Titan", image: "https://via.placeholder.com/180x250", views: "10.5M"},
        {id: 12, title: "Naruto", image: "https://via.placeholder.com/180x250", views: "15.2M"},
        {id: 13, title: "Hunter x Hunter", image: "https://via.placeholder.com/180x250", views: "8.7M"},
        {id: 14, title: "Death Note", image: "https://via.placeholder.com/180x250", views: "9.3M"},
        {id: 15, title: "Tokyo Revengers", image: "https://via.placeholder.com/180x250", views: "7.1M"}
    ];

    // Dữ liệu mẫu cho thể loại
    // const categories = [
    //     "Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery",
    //     "Romance", "School Life", "Sci-Fi", "Slice of Life", "Sports", "Supernatural", "Thriller"
    // ];

    const handleViewAllLatest = () => {
        setFilterFromHome({
            status: 'all',
            sortBy: 'latest',
            genres: []
        });
        navigate('/all-manga');
    };

    return (
        <div className="home-page">
            <div className="container">
                {/* Banner Slider - Truyện đọc nhiều nhất */}
                <div className="banner-slider mb-4">
                    <div id="homeBanner" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#homeBanner" data-bs-slide-to="0"
                                    className="active"></button>
                            <button type="button" data-bs-target="#homeBanner" data-bs-slide-to="1"></button>
                            <button type="button" data-bs-target="#homeBanner" data-bs-slide-to="2"></button>
                        </div>
                        <div className="carousel-inner">
                            {recommendedManga.slice(0, 3).map((manga, index) => (
                                <div key={manga.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                    <img src={manga.image} className="d-block w-100" alt={manga.title}/>
                                    <div className="carousel-caption">
                                        <h3>{manga.title}</h3>
                                        <p>{manga.views} lượt xem</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#homeBanner"
                                data-bs-slide="prev">
                            <span className="carousel-control-prev-icon"></span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#homeBanner"
                                data-bs-slide="next">
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
                                {/*Xem tat ca*/}
                                <button
                                    className="view-all"
                                    onClick={handleViewAllLatest}
                                >
                                    Xem tất cả <i className="fas fa-angle-right"></i>
                                </button>
                            </div>
                            <div className="manga-list">
                                <div className="row">
                                    {mangaList.map(manga => (
                                        <div key={manga.id} className="col-md-6 col-lg-4 mb-4">
                                            <MangaCard manga={manga} type="latest"/>
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
                                        <MangaCard key={manga.id} manga={manga} type="recommended"/>
                                    ))}
                                </div>
                            </div>

                            {/* Thể loại */}
                            <div className="content-section categories">
                                <div className="section-header">
                                    <h2 className="section-title">Thể loại</h2>
                                </div>
                                <div className="categories-list">
                                    {categories.map(({id, category_name}) => (
                                        <Link key={id} to={`/category/${id}`} className="category-tag">
                                            {category_name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
};

export default Home;