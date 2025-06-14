import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import './MangaDetail.css';
import { useFilter } from "../../context/FilterContext";
import Loading from "../../components/Loader/Loading";
import { UserContext } from "../../context/UserContext";
import AddChapterModal from "../../Admin/Modals/AddChapterModal";

const MangaDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const pages = location.state?.pages;
    const [showAddChapterModal, setShowAddChapterModal] = useState(false);

    const { user } = useContext(UserContext);
    const canEdit = ['ADMIN', 'MOD', 'UPLOADER'].includes(user?.role?.role_name);
    const { id } = useParams();
    const { manga, chapters, getMangaById, getChapterOfManga, loading } = useFilter();

    useEffect(() => {
        const fetchData = async () => {
            await getMangaById(id);
            await getChapterOfManga(id);
        };
        fetchData();
    }, [id]);

    const handleChapterClick = (chapterNumber) => {
        navigate(`/manga/${id}/chapter/${chapterNumber}`);
    };

    const renderAdminButtons = () => (
        <div className="edit-manga-buttons-container">
            <button className="edit-manga-button">Chỉnh sửa thông tin truyện</button>
            <button
                className="add-chapter-button"
                onClick={() => setShowAddChapterModal(true)}
            >
                Thêm chapter
            </button>
        </div>
    );

    const renderChaptersList = () => {
        // Sắp xếp chương theo số chương giảm dần (mới nhất đầu tiên)
        const sortedChapters = [...chapters].sort((a, b) => b.chapter_number - a.chapter_number);

        return (
            <div className="chapters-list">
                {sortedChapters.map((ch) => (
                    <div key={ch.id} className="chapter-item">
                        <div
                            onClick={() => handleChapterClick(ch.chapter_number)}
                            className="chapter-link"
                        >
                            <span className="chapter-number">Chương {ch.chapter_number}</span>
                            <span className="chapter-title">{ch.chapter_name}</span>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderMangaInfo = () => (
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
    );

    if (!manga || loading) return <Loading />;

    return (
        <div className="manga-detail-page">
            <div className="container">
                <div className="manga-detail-content">
                    {renderMangaInfo()}
                </div>

                {pages === 'admin' && canEdit && renderAdminButtons()}

                <div className="manga-chapters">
                    <h2 style={{color: '#f39c12'}}>Danh sách chương</h2>
                    {renderChaptersList()}
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
};

export default MangaDetail;