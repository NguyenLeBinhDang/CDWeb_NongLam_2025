import React, { useState, useEffect } from 'react';
import MangaCard from '../../compoment/mangaCard';
import FilterSidebar from '../../compoment/FilterSidebar';
import { useFilter } from '../../context/FilterContext';
import './AllManga.css';

const AllManga = () => {
    const { defaultFilter } = useFilter();
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState(defaultFilter);
    const mangaPerPage = 24;

    // Dữ liệu mẫu cho tất cả truyện
    const allManga = [
        { id: 1, title: "One Piece", chapter: "Chapter 1090", image: "https://via.placeholder.com/150x200", time: "2 giờ trước" },
        { id: 2, title: "Black Clover", chapter: "Chapter 369", image: "https://via.placeholder.com/150x200", time: "6 giờ trước" },
        { id: 3, title: "Jujutsu Kaisen", chapter: "Chapter 253", image: "https://via.placeholder.com/150x200", time: "12 giờ trước" },
        { id: 4, title: "My Hero Academia", chapter: "Chapter 420", image: "https://via.placeholder.com/150x200", time: "1 ngày trước" },
        { id: 5, title: "Chainsaw Man", chapter: "Chapter 150", image: "https://via.placeholder.com/150x200", time: "1 ngày trước" },
        { id: 6, title: "Solo Leveling", chapter: "Chapter 200", image: "https://via.placeholder.com/150x200", time: "1 ngày trước" },
        { id: 7, title: "Demon Slayer", chapter: "Chapter 205", image: "https://via.placeholder.com/150x200", time: "2 ngày trước" },
        { id: 8, title: "Dragon Ball Super", chapter: "Chapter 99", image: "https://via.placeholder.com/150x200", time: "2 ngày trước" },
        { id: 9, title: "Tower of God", chapter: "Chapter 592", image: "https://via.placeholder.com/150x200", time: "3 ngày trước" },
        { id: 10, title: "Bleach", chapter: "Chapter 686", image: "https://via.placeholder.com/150x200", time: "4 ngày trước" },
        { id: 11, title: "Attack on Titan", chapter: "Chapter 139", image: "https://via.placeholder.com/150x200", time: "5 ngày trước" },
        { id: 12, title: "Naruto", chapter: "Chapter 700", image: "https://via.placeholder.com/150x200", time: "6 ngày trước" },
        { id: 13, title: "Hunter x Hunter", chapter: "Chapter 390", image: "https://via.placeholder.com/150x200", time: "7 ngày trước" },
        { id: 14, title: "Death Note", chapter: "Chapter 108", image: "https://via.placeholder.com/150x200", time: "8 ngày trước" },
        { id: 15, title: "Tokyo Revengers", chapter: "Chapter 278", image: "https://via.placeholder.com/150x200", time: "9 ngày trước" },
        { id: 16, title: "Dr. Stone", chapter: "Chapter 232", image: "https://via.placeholder.com/150x200", time: "10 ngày trước" },
        { id: 17, title: "The Promised Neverland", chapter: "Chapter 181", image: "https://via.placeholder.com/150x200", time: "11 ngày trước" },
        { id: 18, title: "Fire Force", chapter: "Chapter 304", image: "https://via.placeholder.com/150x200", time: "12 ngày trước" },
        { id: 19, title: "Blue Lock", chapter: "Chapter 220", image: "https://via.placeholder.com/150x200", time: "13 ngày trước" },
        { id: 20, title: "Spy x Family", chapter: "Chapter 88", image: "https://via.placeholder.com/150x200", time: "14 ngày trước" },
        { id: 21, title: "Mashle", chapter: "Chapter 165", image: "https://via.placeholder.com/150x200", time: "15 ngày trước" },
        { id: 22, title: "Kaiju No. 8", chapter: "Chapter 98", image: "https://via.placeholder.com/150x200", time: "16 ngày trước" },
        { id: 23, title: "Sakamoto Days", chapter: "Chapter 145", image: "https://via.placeholder.com/150x200", time: "17 ngày trước" },
        { id: 24, title: "Undead Unluck", chapter: "Chapter 178", image: "https://via.placeholder.com/150x200", time: "18 ngày trước" }
    ];

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1); // Reset to first page when filters change
    };

    // Calculate pagination
    const indexOfLastManga = currentPage * mangaPerPage;
    const indexOfFirstManga = indexOfLastManga - mangaPerPage;
    const currentManga = allManga.slice(indexOfFirstManga, indexOfLastManga);
    const totalPages = Math.ceil(allManga.length / mangaPerPage);

    return (
        <div className="all-manga-page">
            <div className="container">
                <div className="row">
                    {/* Main Content */}
                    <div className="col-lg-9">
                        <div className="content-section">
                            <div className="section-header">
                                <h2 className="section-title">Tất cả truyện</h2>
                            </div>
                            <div className="manga-grid">
                                {currentManga.map(manga => (
                                    <div key={manga.id} className="manga-item">
                                        <MangaCard manga={manga} type="latest" />
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="pagination-container">
                                <div className="pagination">
                                    <button 
                                        className="page-btn"
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                    >
                                        <i className="fas fa-chevron-left"></i>
                                    </button>
                                    <span className="page-info">
                                        Trang {currentPage} / {totalPages}
                                    </span>
                                    <button 
                                        className="page-btn"
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                    >
                                        <i className="fas fa-chevron-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filter Sidebar */}
                    <div className="col-lg-3">
                        <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllManga; 