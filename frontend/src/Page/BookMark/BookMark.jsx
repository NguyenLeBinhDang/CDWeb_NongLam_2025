import React, {useEffect} from 'react';
import MangaCard from '../../components/MangaCard/mangaCard';
import {useBookmark} from '../../context/BookMarkContext';
import './BookMark.css';
import {useFilter} from "../../context/FilterContext";

const BookMark = () => {
    const {bookmarks, chapters, fetchChapterForAll, getBookmarks} = useBookmark();


    useEffect(() => {
        const fetchBookmarks = async () => {
            await getBookmarks();
        }
        fetchBookmarks();
    }, []);

    useEffect(() => {
        if (bookmarks.length > 0) {
            fetchChapterForAll();
        }
    }, [bookmarks]);

    return (
        <div className="bookmark-page">
            <div className="container">
                <div className="content-section">
                    <div className="section-header">
                        <h2 className="section-title">Your Bookmarks</h2>
                    </div>
                    {bookmarks.length === 0 ? (
                        <p className="no-bookmarks">No bookmarks found.</p>
                    ) : (
                        <div className="manga-grid">
                            {bookmarks.map(bookmark => (
                                <div key={bookmark.id} className="manga-item">
                                    <MangaCard manga={bookmark.manga} chapter={chapters[bookmark.manga.id] || []}
                                               isFavorite={true}/>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BookMark;