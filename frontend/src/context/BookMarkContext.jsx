import React, {createContext, useContext, useState, useEffect} from 'react';
import {showErrorDialog} from "../utils/Alert";
import axios from "axios";

const BookmarkContext = createContext();

export const BookmarkProvider = ({children}) => {
    const [bookmarks, setBookmarks] = useState([]);
    const [isFavorite, setIsFavorite] = useState({});


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
        await addBookmark(mangaId);
        await getIsFavorite(mangaId); // update isFavorite state
    };

    const handleRemoveFromFavorite = async (mangaId) => {
        await removeBookmark(mangaId);
        setIsFavorite(prev => {
            const updated = {...prev};
            delete updated[mangaId];
            return updated;
        });
    };

    return (
        <BookmarkContext.Provider
            value={{bookmarks, isFavorite, getIsFavorite, getBookmarks, handleAddToFavorite, handleRemoveFromFavorite}}>
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
