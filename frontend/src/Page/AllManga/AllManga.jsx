import React, {useState, useEffect} from 'react';
import MangaCard from '../../components/MangaCard/mangaCard';
import FilterSidebar from '../../components/FilterSidebar';
import {useFilter} from '../../context/FilterContext';
import './AllManga.css';
import Loading from "../../components/Loader/Loading";
import {useBookmark} from "../../context/BookMarkContext";

const AllManga = () => {
    const {
        mangaList,
        // getAllManga,
        getManga,
        defaultFilter,
        mangaChapters,
        fetchChapterForAll,
        loading,
        totalPages,
        currentPage,
        handlePageChange
    } = useFilter();
    const {
        bookmarks,
        getIsFavorite,
        isFavorite,
    } = useBookmark();
    // const [currentPage, setCurrentPage] = useState(1);
    // // const [filters, setFilters] = useState(defaultFilter);
    // const mangaPerPage = 10;

    useEffect(() => {
        getManga(defaultFilter);
    }, [defaultFilter]);

    useEffect(() => {
        if (mangaList.length > 0) {
            fetchChapterForAll();
        }
    }, [mangaList]);

    useEffect(() => {
        mangaList.forEach((manga) => {
            getIsFavorite(manga.id);
        })
    }, [mangaList, bookmarks]);

    // const handleFilterChange = (newFilters) => {
    //     setFilters(newFilters);
    //     setCurrentPage(1); // Reset to first page when filters change
    // };

    // Calculate pagination
    // const indexOfLastManga = currentPage * mangaPerPage;
    // const indexOfFirstManga = indexOfLastManga - mangaPerPage;
    // const currentManga = mangaList.slice(indexOfFirstManga, indexOfLastManga);
    // const totalPages = Math.ceil(mangaList.length / mangaPerPage);
    // để sinh paging dạng (1,2,3...)
    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxButtons = 5; // số nút tối đa hiển thị
        const half = Math.floor(maxButtons / 2);
        let start = Math.max(0, currentPage - half);
        let end = start + maxButtons - 1;

        if (end >= totalPages) {
            end = totalPages - 1;
            start = Math.max(0, end - maxButtons + 1);
        }

        for (let i = start; i <= end; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    className={`page-btn number ${i === currentPage ? 'active' : ''}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i + 1}
                </button>
            );
        }

        return pageNumbers;
    };

    return (
        <div className="all-manga-page">
            {loading && <Loading/>}
            <div className="container">
                <div className="row">
                    {/* Main Content */}
                    <div className="col-lg-9">
                        <div className="content-section">
                            <div className="section-header">
                                <h2 className="section-title">Tất cả truyện</h2>
                            </div>
                            <div className="manga-grid">
                                {mangaList.map(manga => (
                                    <div key={manga.id} className="manga-item">
                                        <MangaCard manga={manga} chapter={mangaChapters[manga.id] || []}
                                                   isFavorite={isFavorite[manga.id]}/>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="pagination-container">
                                <div className="pagination">
                                    <button
                                        className="page-btn"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 0}
                                    >
                                        <i className="fas fa-chevron-left"></i>
                                    </button>

                                    {renderPageNumbers()}

                                    <button
                                        className="page-btn"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage + 1 >= totalPages}
                                    >
                                        <i className="fas fa-chevron-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filter Sidebar */}
                    <div className="col-lg-3">
                        <FilterSidebar filters={defaultFilter}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllManga; 