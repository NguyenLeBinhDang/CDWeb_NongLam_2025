import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './mangaCard.css';
import { useFilter } from "../../context/FilterContext";
import { useBookmark } from "../../context/BookMarkContext";
import axios from "axios";
import { showConfirmDialog, showErrorDialog, showSuccessDialog } from "../../utils/Alert";
import AddMangaModal from "../../Admin/Modals/AddMangaModal";
import AddChapterModal from "../../Admin/Modals/AddChapterModal";

const MangaCard = ({ manga, type = null, chapter = null, isFavorite = false, onReload = () => {} }) => {
    const navigate = useNavigate();
    const { setFilterFromHome } = useFilter();
    const { handleRemoveFromFavorite, handleAddToFavorite } = useBookmark();

    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddChapterModal, setShowAddChapterModal] = useState(false);

    const handleCategoryRedirect = async (id) => {
        const newFilter = {
            search: '',
            categoryIds: [id],
            statusId: null,
            authorId: null
        };
        setFilterFromHome(newFilter);
        navigate('/all-manga');
    };

    const handleDelete = async (id) => {
        const confirm = await showConfirmDialog("Bạn chắc chắn muốn xoá?");
        if (confirm.isConfirmed) {
            try {
                await axios.delete(`http://localhost:8080/api/manga/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                await showSuccessDialog("Đã xoá truyện");
                onReload();
            } catch (e) {
                await showErrorDialog(e?.response?.data?.message || "Lỗi xoá truyện");
            }
        }
    };

    const renderCard = () => {
        switch (type) {
            case 'popular':
                return (
                    <div className="popular-card">
                        <div className="popular-image">
                            <Link to={`/manga/${manga.id}`}>
                                <img src={manga.cover_img} alt={manga.name} className="img-fluid" />
                            </Link>
                            <div className="popular-ranking">
                                <span>{manga.id - 10}</span>
                            </div>
                        </div>
                        <div className="popular-info">
                            <h3 className="manga-title">
                                <Link to={`/manga/${manga.id}`}>{manga.name}</Link>
                            </h3>
                            <div className="manga-views">
                                <i className="far fa-eye"></i> {manga.views || 0}
                            </div>
                        </div>
                    </div>
                );

            case 'recommended':
                return (
                    <div className="manga-card recommended">
                        <div className="manga-image">
                            <Link to={`/manga/${manga.id}`}>
                                <img src={manga.cover_img} alt={manga.name} className="img-fluid" />
                            </Link>
                        </div>
                        <div className="manga-info">
                            <h3 className="manga-title">
                                <Link to={`/manga/${manga.id}`}>{manga.name}</Link>
                            </h3>
                            <div className="manga-status">
                                {manga.id_status?.status_name}
                            </div>
                        </div>
                    </div>
                );

            case 'admin':
                return (
                    <>
                        <div className="manga-card admin-view">
                            <div className="manga-image">
                                <Link to={`/manga/${manga.id}`}>
                                    <img src={manga.cover_img} alt={manga.name} />
                                </Link>
                            </div>
                            <div className="manga-info">
                                <h3 className="manga-title">{manga.name}</h3>
                                <p className="manga-author">Tác giả: {manga.id_author?.author_name || 'Không rõ'}</p>
                                <div className="manga-categories">
                                    {manga.id_category?.slice(0, 3).map(category => (
                                        <span key={category.id} className="category-tag"
                                              onClick={() => handleCategoryRedirect(category.id)}>
                                            {category.category_name}
                                        </span>
                                    ))}
                                </div>

                                <div className="admin-actions">
                                    <button className="btn-edit" onClick={() => setShowEditModal(true)}>📝 Sửa</button>
                                    <button className="btn-add-chapter" onClick={() => setShowAddChapterModal(true)}>➕ Thêm chương</button>
                                    <button className="btn-delete" onClick={() => handleDelete(manga.id)}>❌ Xoá</button>
                                </div>
                            </div>
                        </div>

                        {showEditModal && (
                            <AddMangaModal
                                open={showEditModal}
                                onClose={() => setShowEditModal(false)}
                                onSuccess={() => {
                                    onReload();
                                    setShowEditModal(false);
                                }}
                                isEdit={true}
                                defaultData={manga}
                            />
                        )}

                        {showAddChapterModal && (
                            <AddChapterModal
                                mangaId={manga.id}
                                onClose={() => setShowAddChapterModal(false)}
                            />
                        )}
                    </>
                );

            default:
                return (
                    <div className="manga-card">
                        <div className="icon-overlay">
                            <span onClick={() => {
                                isFavorite ? handleRemoveFromFavorite(manga.id) : handleAddToFavorite(manga.id);
                            }}>
                                {isFavorite ? (
                                    <i className="fa-solid fa-bookmark"></i>
                                ) : (
                                    <i className="fa-regular fa-bookmark"></i>
                                )}
                            </span>
                        </div>
                        <div className="manga-image">
                            <Link to={`/manga/${manga.id}`}>
                                <img src={manga.cover_img || "https://placehold.co/600x400"} alt={manga.name} className="img-fluid" />
                            </Link>
                        </div>
                        <div className="manga-info-card">
                            <h3 className="manga-title-card">
                                <Link to={`/manga/${manga.id}`}>{manga.name}</Link>
                            </h3>
                            <div className="manga-update-card">
                                {chapter && chapter.length > 0 ? (
                                    chapter.slice(0, 2).map((ch) => (
                                        <div key={ch.id} className="chapter-item-card">
                                            <Link to={`/manga/${manga.id}/chapter/${ch.chapter_number}`} className="chapter-link">
                                                <span className="chapter-number-card">Chương {ch.chapter_number}:</span>
                                                <span className="chapter-title-card">{ch.chapter_name || []}</span>
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <span className="no-chapters">Chưa có chương nào</span>
                                )}
                            </div>
                            <div className="manga-categories">
                                {manga.id_category?.slice(0, 3).map(category => (
                                    <span key={category.id} className="category-tag"
                                          onClick={() => handleCategoryRedirect(category.id)}>
                                        {category.category_name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return renderCard();
};

export default MangaCard;
