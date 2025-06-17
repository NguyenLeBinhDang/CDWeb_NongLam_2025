import React, {useCallback, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import MangaCard from '../../components/MangaCard/mangaCard';
import {useFilter} from '../../context/FilterContext';
import './Home.css';
import {useBookmark} from "../../context/BookMarkContext";
import {useUser} from "../../context/UserContext";

const Home = () => {
    const navigate = useNavigate();
    const {
        mangaList,
        categories,
        getAllCategories,
        // getAllManga,
        getManga,
        defaultf,
        // mangaChapters,
        // fetchChapterForAll,
        setFilterFromHome
    } = useFilter();
    // const [mangaChapters, setMangaChapters] = useState({});

    const {
        getIsFavorite,
        isFavorite,
        bookmarks,
    } = useBookmark();

    const {user} = useUser();

    useEffect(() => {
        const fetchData = async () => {
            await getManga(defaultf);
            await getAllCategories();
        }
        fetchData()
    }, []);
    const checkAuth = useCallback(() => {
        return !!localStorage.getItem('token');
    }, []);
    // useEffect(() => {
    //     if (mangaList.length > 0) {
    //         fetchChapterForAll()
    //     }
    // }, [mangaList])
    useEffect(() => {
        const fetchFavoriteStatuses = async () => {
            if (checkAuth() && mangaList.length > 0) {
                // Chỉ kiểm tra cho những manga chưa có trong isFavorite
                const mangaToCheck = mangaList.filter(manga =>
                    isFavorite[manga.id] === undefined
                );

                // Sử dụng Promise.all để gọi song song
                await Promise.all(
                    mangaToCheck.map(manga => getIsFavorite(manga.id))
                );
            }
        };

        fetchFavoriteStatuses();
    }, [mangaList, isFavorite, checkAuth, getIsFavorite]);

    const handleViewAllLatest = async () => {
        const newFilter = {
            search: '',
            categoryIds: [],
            statusId: null,
            authorId: null
        }
        setFilterFromHome(newFilter);
        await getManga(newFilter);
        navigate('/all-manga');
    };

    const handleCategoryRedirect = async (id) => {
        const newFilter = {
            search: '',
            categoryIds: [id],
            statusId: null,
            authorId: null
        }
        setFilterFromHome(newFilter);
        navigate('/all-manga');
    }

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
                                        <button className="carousel-control-prev" type="button"
                                                data-bs-target="#homeBanner"
                                                data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon"></span>
                                        </button>
                                        <button className="carousel-control-next" type="button"
                                                data-bs-target="#homeBanner"
                                                data-bs-slide="next">
                                            <span className="carousel-control-next-icon"></span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
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
                                            <MangaCard manga={manga} chapter={manga.chapter || []}
                                                       isFavorite={isFavorite[manga.id]}/>
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
                                        <div key={manga.id}>
                                            <MangaCard manga={manga} type="recommended"/>
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
                                    {categories.map(({id, category_name}) => (
                                        <span key={id} className="category-tag"
                                              onClick={() => handleCategoryRedirect(id)}>{category_name}</span>
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