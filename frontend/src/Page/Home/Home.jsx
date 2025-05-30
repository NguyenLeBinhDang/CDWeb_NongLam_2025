import React, {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
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
                            {mangaList.slice(0, 3).map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    data-bs-target="#homeBanner"
                                    data-bs-slide-to={index}
                                    className={index === 0 ? 'active' : ''}
                                ></button>
                            ))}
                        </div>
                        <div className="carousel-inner">
                            {mangaList.slice(0, 3).map((manga, index) => (
                                <div key={manga.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                    <img src={manga.cover_img} className="d-block w-100" alt={manga.name}/>
                                    <div className="carousel-caption">
                                        <h3>{manga.name}</h3>
                                        <p>Tác giả: {manga.id_author?.author_name}</p>
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
                                    {mangaList.slice(0, 5).map(manga => (
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
                                        <Link
                                            key={id}
                                            to={`/manga/category/${id}`}
                                            className="category-tag"
                                        >
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
    );
};

export default Home;