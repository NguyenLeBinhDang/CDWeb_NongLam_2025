import React, {createContext, useContext, useState, useEffect} from 'react';
import {showConfirmDialog, showErrorDialog, showSuccessDialog} from "../utils/Alert";
import axios from "axios";
import {useFilter} from "./FilterContext";

const BookmarkContext = createContext();

export const BookmarkProvider = ({children}) => {
    const {getChapterOfManga} = useFilter();
    const [bookmarks, setBookmarks] = useState([]);
    const [isFavorite, setIsFavorite] = useState({});
    const [chapters, setChapters] = useState({});

    const fetchChapterForAll = async () => {
        const chaptersMap = {};
        if (bookmarks !== null) {
            await Promise.all(bookmarks.map(async (bookmark) => {
                chaptersMap[bookmark.manga.id] = await getChapterOfManga(bookmark.manga.id);
            }))
            setChapters(chaptersMap);
        }
    };

    const getBookmarks = async () => {
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
            await showErrorDialog('Lỗi khi lấy danh sách theo dõi', message)
        }
    }

    const addBookmark = async (mangaId) => {
        try {
            const response = await axios.post(`http://localhost:8080/api/favorites/${mangaId}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            // setBookmarks(prev => [...prev, response.data]);
            await getBookmarks();
        } catch (error) {
            console.error('Error adding bookmark:', error);
            const message = error.response?.data?.message || 'Failed to add bookmark';
            await showErrorDialog('Lỗi khi thêm vào theo dõi', message);
        }
    }

    const removeBookmark = async (mangaId) => {
        try {
            await axios.delete(`http://localhost:8080/api/favorites/${mangaId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            await getBookmarks();
            // setBookmarks(prev => prev.filter(bookmark => bookmark.mangaId !== mangaId));
        } catch (error) {
            console.error('Error removing bookmark:', error);
            const message = error.response?.data?.message || 'Failed to remove bookmark';
            await showErrorDialog('Lỗi khi xóa theo dõi', message);
        }
    }

    const getIsFavorite = async (mangaId) => {
        // if (isFavorite[mangaId] !== undefined) {
        //     return isFavorite[mangaId];
        // }


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

            // await getBookmarks()

            return response.data;
        } catch (error) {
            console.error('Error checking if manga is favorite:', error);
            const message = error.response?.data?.messages || 'Failed to check favorite status';
            await showErrorDialog('Lỗi khi kiểm tra theo dõi', message);
            return false;
        }
        // return bookmarks.some(bookmark => bookmark.mangaId === mangaId);
    }

    const handleAddToFavorite = async (mangaId) => {
        await showConfirmDialog("Bạn có chắc muốn thêm vào theo dõi?", "question");
        await addBookmark(mangaId);
        await getIsFavorite(mangaId); // update isFavorite state
        await showSuccessDialog("Đã thêm vào theo dõi", "success");
    };

    const handleRemoveFromFavorite = async (mangaId) => {
        await showConfirmDialog("Bạn có chắc muốn xóa khỏi theo dõi?", "question");
        await removeBookmark(mangaId);
        setIsFavorite(prev => {
            const updated = {...prev};
            delete updated[mangaId];
            return updated;
        });
        await showSuccessDialog("Đã xóa khỏi theo dõi", "success");
    };

    return (
        <BookmarkContext.Provider
            value={{
                bookmarks,
                isFavorite,
                chapters,
                getIsFavorite,
                getBookmarks,
                handleAddToFavorite,
                handleRemoveFromFavorite,
                fetchChapterForAll
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
