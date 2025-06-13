import React, {useContext, useEffect, useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import './MangaDetail.css';
import {useFilter} from "../../context/FilterContext";
import Loading from "../../components/Loader/Loading";
import {UserContext} from "../../context/UserContext";
import AddChapterModal from "../../Admin/Modals/AddChapterModal";
const MangaDetail = () => {
    const location = useLocation();
    const pages = location.state?.pages;
    const [showAddChapterModal, setShowAddChapterModal] = useState(false);

    const {user} = useContext(UserContext);
    const canEdit = ['ADMIN', 'MOD', 'UPLOADER'].includes(user?.role?.role_name);
    const {id} = useParams();
    const {manga, chapters, getMangaById, getChapterOfManga, loading} = useFilter();
    // const [chapter, setChapter] = useState([]);

    useEffect(() => {
        const fetchManga = async () => {
            await getMangaById(id);
        }
        fetchManga();
    }, [id]);

    useEffect(() => {
        const fetchChapters = async () => {
            const result = await getChapterOfManga(id);
        };
        fetchChapters();
    }, [id])

    useEffect(() => {
        if (manga) console.log('Fetched manga:', manga);
    }, [id]);

    if (!manga) return <div>Loading manga...</div>;
    const renderAdminButtons = () => (
        <div className="edit-manga-buttons-container">
            <button className="edit-manga-button">Chỉnh sửa thông tin truyện</button>
            <button className="add-chapter-button" onClick={() => setShowAddChapterModal(true)}>Thêm chapter</button>
        </div>
    );
    const renderMangaDetail = () => {
        switch (pages) {
            case 'admin':
                return (
                    <div className="manga-detail-page">
                        {loading && <Loading/>}
                        <div className="container">
                            <div className="manga-detail-content">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="manga-cover">
                                            <img src={manga.cover_img} alt={manga.name} className="img-fluid"/>
                                        </div>
                                        <div className="manga-info-basic">
                                            <h1 className="manga-title">{manga.name}</h1>
                                            <div className="manga-meta">
                                                <p><strong>Tác giả:</strong> {manga.id_author?.author_name}</p>
                                                <p><strong>Trạng thái:</strong> {manga.id_status?.status_name}</p>
                                                <p><strong>Thể loại:</strong>
                                                    {manga.id_category
                                                        ? manga.id_category.map(cat => cat.category_name).join(", ")
                                                        : "Đang tải..."}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-8">
                                        <div className="manga-description">
                                            <h3>Nội dung</h3>
                                            <p>{manga.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {pages === 'admin' && canEdit && renderAdminButtons()}


                            <div className="manga-chapters">
                                <div className="chapters-list">
                                    {chapters.map((ch) => (
                                        <div key={ch.id} className="chapter-item">
                                            <a href={`/manga/${manga.id}/chapter/${ch.id}`}
                                               className="chapter-link">
                                                <span className="chapter-number">{ch.chapter_number}</span>
                                                <span className="chapter-title">{ch.chapter_name}</span>
                                                {/*<span className="chapter-date">{ch.date}</span>*/}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {showAddChapterModal && (
                            <AddChapterModal
                                mangaId={manga.id}
                                onClose={() => setShowAddChapterModal(false)}
                            />
                        )}

                    </div>

                );
            default:
                return (
                    <div className="manga-detail-page">
                        {loading && <Loading/>}
                        <div className="container">
                            <div className="manga-detail-content">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="manga-cover">
                                            <img src={manga.cover_img} alt={manga.name} className="img-fluid"/>
                                        </div>
                                        <div className="manga-info-basic">
                                            <h1 className="manga-title">{manga.name}</h1>
                                            <div className="manga-meta">
                                                <p><strong>Tác giả:</strong> {manga.id_author?.author_name}</p>
                                                <p><strong>Trạng thái:</strong> {manga.id_status?.status_name}</p>
                                                <p><strong>Thể loại:</strong>
                                                    {manga.id_category
                                                        ? manga.id_category.map(cat => cat.category_name).join(", ")
                                                        : "Đang tải..."}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-8">
                                        <div className="manga-description">
                                            <h3>Nội dung</h3>
                                            <p>{manga.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="manga-chapters">
                                <div className="chapters-list">
                                    {chapters.map((ch) => (
                                        <div key={ch.id} className="chapter-item">
                                            <a href={`/manga/${manga.id}/chapter/${ch.id}`}
                                               className="chapter-link">
                                                <span className="chapter-number">{ch.chapter_number}</span>
                                                <span className="chapter-title">{ch.chapter_name}</span>
                                                {/*<span className="chapter-date">{ch.date}</span>*/}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                );
        }
    }


    return (renderMangaDetail());
};

export default MangaDetail;