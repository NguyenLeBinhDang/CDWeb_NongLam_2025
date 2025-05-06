import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MangaReader.css';

const MangaReader = () => {
    const { chapterId } = useParams();
    const [currentPage, setCurrentPage] = useState(0);
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // TODO: Fetch manga pages data from API
        // This is a placeholder for demonstration
        const dummyPages = [
            'https://via.placeholder.com/800x1200',
            'https://via.placeholder.com/800x1200',
            'https://via.placeholder.com/800x1200',
        ];
        setPages(dummyPages);
        setLoading(false);
    }, [chapterId]);

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(prev => prev + 1);
        }
    };

    // if (loading) {
    //     return <div className="manga-reader-loading">Loading...</div>;
    // }

    return (
        <div className="manga-reader-page">
            <div className="manga-reader-content">
                <div className="manga-page-container">
                    <img 
                        src={pages[currentPage]} 
                        alt={`Page ${currentPage + 1}`} 
                        className="manga-page"
                    />
                </div>
                
                <div className="manga-reader-controls">
                    <button 
                        className="control-btn prev-btn"
                        onClick={handlePrevPage}
                        disabled={currentPage === 0}
                    >
                        Previous
                    </button>
                    
                    <span className="page-counter">
                        Page {currentPage + 1} of {pages.length}
                    </span>
                    
                    <button 
                        className="control-btn next-btn"
                        onClick={handleNextPage}
                        disabled={currentPage === pages.length - 1}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MangaReader; 