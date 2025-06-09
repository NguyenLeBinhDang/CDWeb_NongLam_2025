import React, {useState, useEffect} from 'react';
import MangaCard from '../../components/MangaCard/mangaCard';
import FilterSidebar from '../../components/FilterSidebar';
import {useFilter} from '../../context/FilterContext';
import './AllManga.css';

const AllManga = () => {
    const {mangaList, getAllManga,getManga, defaultFilter} = useFilter();
    const [currentPage, setCurrentPage] = useState(1);
    // const [filters, setFilters] = useState(defaultFilter);
    const mangaPerPage = 10;

    useEffect(() => {
        getManga(defaultFilter);
    }, [defaultFilter]);

    // const handleFilterChange = (newFilters) => {
    //     setFilters(newFilters);
    //     setCurrentPage(1); // Reset to first page when filters change
    // };

    // Calculate pagination
    const indexOfLastManga = currentPage * mangaPerPage;
    const indexOfFirstManga = indexOfLastManga - mangaPerPage;
    const currentManga = mangaList.slice(indexOfFirstManga, indexOfLastManga);
    const totalPages = Math.ceil(mangaList.length / mangaPerPage);

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
                                        <MangaCard manga={manga} type="latest"/>
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
                        <FilterSidebar filters={defaultFilter} onFilterChange={getManga}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllManga; 