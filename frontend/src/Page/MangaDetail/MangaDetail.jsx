import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import './MangaDetail.css';
import { useFilter } from "../../context/FilterContext";
import Loading from "../../components/Loader/Loading";
import { UserContext } from "../../context/UserContext";
import AddChapterModal from "../../Admin/Modals/AddChapterModal";
import axios from "axios";
import {showErrorDialog, showSuccessDialog} from "../../utils/Alert";

const MangaDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const pages = location.state?.pages;
    const [showAddChapterModal, setShowAddChapterModal] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [replyTo, setReplyTo] = useState(null);
    const { user } = useContext(UserContext);
    const canEdit = ['ADMIN', 'MOD', 'UPLOADER'].includes(user?.role?.role_name);
    const isAdminOrMod = ['ADMIN', 'MOD'].includes(user?.role?.role_name);
    const { id } = useParams();
    const { manga, chapters, getMangaById, getChapterOfManga } = useFilter();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            await getMangaById(id);
            await getChapterOfManga(id);
            await fetchComments();
        };
        fetchData();
    }, [id]);

    const fetchComments = async () => {
        try {
            const res =await axios.get(`http://localhost:8080/api/comments/manga/${id}`);
            setComments(res.data);
        } catch (e) {
            console.error("Failed to fetch comments", e);
        }
    };

    const handlePostComment = async () => {
        if (!newComment.trim()) return;
        try {
            const response = replyTo
                ? await axios.post(`http://localhost:8080/api/comments/${replyTo}/reply`, { comment: newComment, mangaId: id }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                : await axios.post(`http://localhost:8080/api/comments`, { comment: newComment, mangaId: id }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

            setNewComment("");
            setReplyTo(null);
            await fetchComments();
        } catch (error) {
            console.error("Comment failed", error);
            const message = error?.response?.data?.message
            await showErrorDialog("Lỗi",message ||"Không thể gửi bình luận");
        }
    };


    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`http://localhost:8080/api/comments/${commentId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            await fetchComments();
        } catch (err) {
            await showErrorDialog("Lỗi", "Không thể xóa bình luận");
        }
    };

    const handleBanUser = async (userId) => {
        try {
            await axios.put(`http://localhost:8080/api/users/ban/${userId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            await showSuccessDialog("Đã chặn người dùng");
        } catch (error) {
            const message = error?.response?.data?.message
            await showErrorDialog("Lỗi", message||"Không thể chặn người dùng");
        }
    };

    const renderCommentSection = () => {
        const rootComments = comments.filter(c => c.reply == null);
        const getReplies = (parentId) => comments.filter(c => c.reply === parentId);

        return (
            <div className="comment-section">
                <h3 className="comment-heading">Bình luận ({comments.length})</h3>

                {user ? (
                    <div className="comment-input-wrapper">
                        {replyTo && (
                            <div className="replying-to">
                                Đang trả lời bình luận #{replyTo}{" "}
                                <span onClick={() => setReplyTo(null)} className="cancel-reply">Hủy</span>
                            </div>
                        )}
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Nhập bình luận..."
                            rows={3}
                            className="comment-textarea"
                        />
                        <button onClick={handlePostComment} className="post-comment-btn">Gửi bình luận</button>
                    </div>
                ) : (
                    <p className="login-notice">Vui lòng <strong>đăng nhập</strong> để bình luận.</p>
                )}

                <div className="comment-list">
                    {rootComments.map(comment => (
                        <div key={comment.id} className="comment-item">
                            <div className="comment-avatar">
                                <img src={comment.avatarUrl || "/default-avatar.png"} alt="avatar" />
                            </div>
                            <div className="comment-content">
                                <div className="comment-header">
                                    <span className="comment-user">{comment.userName || "Ẩn danh"}</span>
                                    <span className="comment-time">{new Date(comment.updatedAt).toLocaleString("vi-VN")}</span>
                                </div>
                                <div className="comment-body">
                                    {comment.comment}
                                </div>
                                <div className="comment-actions">
                                    {!comment.isDeleted && user && (
                                        <button onClick={() => setReplyTo(comment.id)}>Trả lời</button>
                                    )}
                                    {['ADMIN', 'MOD'].includes(user?.role?.role_name) && (
                                        <>
                                            <button onClick={() => handleDeleteComment(comment.id)} className="admin-action delete">Xóa</button>
                                            {/*<button onClick={() => handleBanUser(comment.userId)} className="admin-action ban">Chặn</button>*/}
                                        </>
                                    )}
                                </div>

                                {/* Form trả lời */}
                                {replyTo === comment.id && (
                                    <div className="reply-input">
                                    <textarea
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder={`Phản hồi ${comment.userName || "ẩn danh"}...`}
                                        rows={2}
                                        className="comment-textarea"
                                    />
                                        <button onClick={handlePostComment} className="post-comment-btn">Gửi phản hồi</button>
                                        <button onClick={() => setReplyTo(null)} className="cancel-reply">Hủy</button>
                                    </div>
                                )}

                                {/* Hiển thị reply ngay dưới comment cha */}
                                <div className="replies">
                                    {getReplies(comment.id).map(reply => (
                                        <div key={reply.id} className="reply-item">
                                            <div className="comment-avatar">
                                                <img src={reply.avatarUrl || "/default-avatar.png"} alt="avatar" />
                                            </div>
                                            <div className="comment-content">
                                                <div className="comment-header">
                                                    <span className="comment-user">{reply.userName || "Ẩn danh"}</span>
                                                    <span className="comment-time">{new Date(reply.updatedAt).toLocaleString("vi-VN")}</span>
                                                </div>
                                                <div className="comment-body">{reply.comment}</div>
                                                <div className="comment-actions">
                                                    {!reply.isDeleted && user && (
                                                        <button onClick={() => setReplyTo(reply.id)}>Trả lời</button>
                                                    )}
                                                    {['ADMIN', 'MOD'].includes(user?.role?.role_name) && (
                                                        <>
                                                            <button onClick={() => handleDeleteComment(reply.id)} className="admin-action delete">Xóa</button>
                                                            {/*<button onClick={() => handleBanUser(reply.userId)} className="admin-action ban">Chặn</button>*/}
                                                        </>
                                                    )}
                                                </div>

                                                {/*/!* Form trả lời dưới reply *!/*/}
                                                {/*{replyTo === reply.id && (*/}
                                                {/*    <div className="reply-input">*/}
                                                {/*    <textarea*/}
                                                {/*        value={newComment}*/}
                                                {/*        onChange={(e) => setNewComment(e.target.value)}*/}
                                                {/*        placeholder={`Phản hồi ${reply.userName || "ẩn danh"}...`}*/}
                                                {/*        rows={2}*/}
                                                {/*        className="comment-textarea"*/}
                                                {/*    />*/}
                                                {/*        <button onClick={handlePostComment} className="post-comment-btn">Gửi phản hồi</button>*/}
                                                {/*        <button onClick={() => setReplyTo(null)} className="cancel-reply">Hủy</button>*/}
                                                {/*    </div>*/}
                                                {/*)}*/}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };



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

    const renderAdminDeleteButtons = (chapid) => (
        <button
            className="delete-chapter-button"
            onClick={() => handleDeleteChapter(chapid)}
            style={{
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                padding: '12px 12px',
                marginLeft: '10px',
                borderRadius: '4px',
                cursor: 'pointer'
            }}
        >
            Xóa
        </button>
    );
    const handleDeleteChapter = async (chapId) => {
        setLoading(true);
        try {
            const respone = await axios.delete(`http://localhost:8080/api/manga/${id}/chapter/${chapId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            await getChapterOfManga(id);
            setLoading(false);
            await showSuccessDialog(respone?.data?.message || "Xóa thành công!");

        } catch (error) {
            setLoading(false);
            console.error(error);
            const msg = error?.response?.data?.message || "Xóa thất bại";
            await showErrorDialog("Lỗi", msg);
        }
    };

    const renderComment= () => {

    }

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
                            {canEdit && renderAdminDeleteButtons(ch.id)}
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

                {canEdit && renderAdminButtons()}

                <div className="manga-chapters">
                    <h2 style={{color: '#f39c12'}}>Danh sách chương</h2>
                    {renderChaptersList()}
                </div>
                <div className="manga-comments">
                    {renderCommentSection()}
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