import React from 'react';
import MangaCard from '../../components/mangaCard';
import { useBookmark } from '../../context/BookMarkContext';
import './BookMark.css';

const BookMark = () => {
    const { bookmarks } = useBookmark();

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
                                    <MangaCard
                                        manga={{
                                            ...bookmark,
                                            chapter: bookmark.lastChapter || "Chapter 1",
                                            time: bookmark.lastRead || "Not read yet"
                                        }}
                                        type="latest"
                                    />
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