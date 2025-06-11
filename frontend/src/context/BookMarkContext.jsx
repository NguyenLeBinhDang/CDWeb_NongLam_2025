import React, {createContext, useContext, useState, useEffect} from 'react';
import {showErrorDialog} from "../utils/Alert";
import axios from "axios";

const BookmarkContext = createContext();

export const BookmarkProvider = ({children}) => {
    const [bookmarks, setBookmarks] = useState([]);

    const getBookmarks = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/favorites/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = response.data;
            setBookmarks(data);
        } catch (error) {
            console.error('Error fetching bookmarks:', error);
            const message = error.response?.data?.message || 'Failed to fetch bookmarks';
            await showErrorDialog('Lỗi khi lấy danh sách theo dõi', message)
        }
    }

    const addBookmark = async (mangaId) => {
        try {
            const response = await axios.post(`http://localhost:8080/api/favorites/${mangaId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setBookmarks(prev => [...prev, response.data]);
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

    const handleAddToFavorite = async (mangaId) => {
        await addBookmark(mangaId);
    }

    const handleRemoveFromFavorite = async (mangaId) => {
        await removeBookmark(mangaId);
    }

    return (
        <BookmarkContext.Provider value={{bookmarks, getBookmarks, handleAddToFavorite, handleRemoveFromFavorite}}>
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
