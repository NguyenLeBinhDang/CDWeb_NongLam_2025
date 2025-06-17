import React, {createContext, useContext, useState, useEffect} from 'react';
import {showConfirmDialog, showErrorDialog, showSuccessDialog} from "../utils/Alert";
import axios from "axios";
import {useFilter} from "./FilterContext";

const BookmarkContext = createContext();

export const BookmarkProvider = ({children}) => {
    // const {getChapterOfManga} = useFilter();
    const [bookmarks, setBookmarks] = useState([]);
    const [isFavorite, setIsFavorite] = useState({});
    // const [chapters, setChapters] = useState({});

    const checkAuth = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            showErrorDialog('Lỗi', 'Vui lòng đăng nhập để sử dụng tính năng này');
            return false;
        }
        return true;
    };
    //
    // const fetchChapterForAll = async () => {
    //     if (!checkAuth()) return;
    //
    //     const chaptersMap = {};
    //     if (bookmarks !== null) {
    //         await Promise.all(bookmarks.map(async (bookmark) => {
    //             chaptersMap[bookmark.manga.id] = await getChapterOfManga(bookmark.manga.id);
    //         }))
    //         setChapters(chaptersMap);
    //     }
    // };

    const getBookmarks = async () => {
        if (!checkAuth()) return [];

        try {
            const response = await axios.get(`http://localhost:8080/api/favorites`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = response.data;
            setBookmarks(data);
            return data;
        } catch (error) {
            console.error('Error fetching bookmarks:', error);
            const message = error.response?.data?.messages || 'Failed to fetch bookmarks';
            await showErrorDialog('Lỗi khi lấy danh sách theo dõi', message);
            return [];
        }
    }

    const addBookmark = async (mangaId) => {
        if (!checkAuth()) return false;

        try {
            const response = await axios.post(`http://localhost:8080/api/favorites/${mangaId}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            await getBookmarks();
            return true;
        } catch (error) {
            console.error('Error adding bookmark:', error);
            const message = error.response?.data?.message || 'Failed to add bookmark';
            await showErrorDialog('Lỗi khi thêm vào theo dõi', message);
            return false;
        }
    }

    const removeBookmark = async (mangaId) => {
        if (!checkAuth()) return false;

        try {
            await axios.delete(`http://localhost:8080/api/favorites/${mangaId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            await getBookmarks();
            return true;
        } catch (error) {
            console.error('Error removing bookmark:', error);
            const message = error.response?.data?.message || 'Failed to remove bookmark';
            await showErrorDialog('Lỗi khi xóa theo dõi', message);
            return false;
        }
    }

    const getIsFavorite = async (mangaId) => {
        if (!checkAuth()) return false;

        try {
            const response = await axios.get(`http://localhost:8080/api/favorites/${mangaId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            setIsFavorite(prev => ({
                ...prev,
                [mangaId]: response.data
            }));

            return response.data;
        } catch (error) {
            console.error('Error checking if manga is favorite:', error);
            const message = error.response?.data?.messages || 'Failed to check favorite status';
            await showErrorDialog('Lỗi khi kiểm tra theo dõi', message);
            return false;
        }
    }

    const handleAddToFavorite = async (mangaId) => {
        if (!checkAuth()) return;

        const confirmed = await showConfirmDialog("Bạn có chắc muốn thêm vào theo dõi?", "question");
        if (!confirmed.isConfirmed) return;

        const success = await addBookmark(mangaId);
        if (success) {
            await getIsFavorite(mangaId);
            await showSuccessDialog("Đã thêm vào theo dõi", "success");
        }
    };

    const handleRemoveFromFavorite = async (mangaId) => {
        if (!checkAuth()) return;

        const confirmed = await showConfirmDialog("Bạn có chắc muốn xóa khỏi theo dõi?", "question");
        if (!confirmed.isConfirmed) return;

        const success = await removeBookmark(mangaId);
        if (success) {
            setIsFavorite(prev => {
                const updated = {...prev};
                delete updated[mangaId];
                return updated;
            });
            await showSuccessDialog("Đã xóa khỏi theo dõi", "success");
        }
    };

    return (
        <BookmarkContext.Provider
            value={{
                bookmarks,
                isFavorite,
                // chapters,
                getIsFavorite,
                getBookmarks,
                handleAddToFavorite,
                handleRemoveFromFavorite,
                // fetchChapterForAll
            }}>
            {children}
        </BookmarkContext.Provider>
    );
};

export const useBookmark = () => {
    const context = useContext(BookmarkContext);
    if (!context) {
        throw new Error('useBookmark must be used within a BookmarkProvider');
    }
    return context;
};