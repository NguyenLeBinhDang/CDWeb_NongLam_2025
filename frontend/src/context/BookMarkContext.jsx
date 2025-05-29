import React, { createContext, useContext, useState, useEffect } from 'react';

const BookmarkContext = createContext();

export const useBookmark = () => {
    const context = useContext(BookmarkContext);
    if (!context) {
        throw new Error('useBookmark must be used within a BookmarkProvider');
    }
    return context;
};

export const BookmarkProvider = ({ children }) => {
    const [bookmarks, setBookmarks] = useState([]);

    // Load bookmarks from localStorage on initial render
    useEffect(() => {
        const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        setBookmarks(storedBookmarks);
    }, []);

    // Save bookmarks to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }, [bookmarks]);

    const addBookmark = (manga) => {
        setBookmarks(prevBookmarks => {
            // Check if manga is already bookmarked
            if (prevBookmarks.some(bookmark => bookmark.id === manga.id)) {
                return prevBookmarks;
            }
            return [...prevBookmarks, manga];
        });
    };

    const removeBookmark = (mangaId) => {
        setBookmarks(prevBookmarks =>
            prevBookmarks.filter(bookmark => bookmark.id !== mangaId)
        );
    };

    const isBookmarked = (mangaId) => {
        return bookmarks.some(bookmark => bookmark.id === mangaId);
    };

    const updateBookmarkProgress = (mangaId, lastChapter, lastRead) => {
        setBookmarks(prevBookmarks =>
            prevBookmarks.map(bookmark =>
                bookmark.id === mangaId
                    ? { ...bookmark, lastChapter, lastRead }
                    : bookmark
            )
        );
    };

    const value = {
        bookmarks,
        addBookmark,
        removeBookmark,
        isBookmarked,
        updateBookmarkProgress
    };

    return (
        <BookmarkContext.Provider value={value}>
            {children}
        </BookmarkContext.Provider>
    );
};