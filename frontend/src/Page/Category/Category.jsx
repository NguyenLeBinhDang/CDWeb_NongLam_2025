import React, {useState, useEffect} from 'react';
import MangaCard from '../../components/MangaCard/mangaCard';
// import FilterSidebar from '../../components/FilterSidebar';
import {useFilter} from '../../context/FilterContext';
import './Category.css';
import {useParams} from "react-router-dom";
import FilterSidebar from "../../components/FilterSidebar";

const Category = () => {
    const {
        mangaList,
        categories,
        getAllCategories,
        status,
        getManga,
        mangaChapters,
        fetchChapterForAll,
        defaultFilter,
        getAllStatus
    } = useFilter();
    const [currentPage, setCurrentPage] = useState(1);
    const mangaPerPage = 10;

    const {categoryId} = useParams();

    useEffect(() => {
        const fetchMangaByCategory = async () => {
            try {
                // Set filters based on categoryId
                const newFilter = {
                    search: '',
                    categoryIds: [Number(categoryId)],
                    statusId: null
                };
                // setFilterFromHome(newFilter);
                await getManga(newFilter);
            } catch (error) {
                console.error("Failed to fetch manga by category:", error);
            }
        }
        fetchMangaByCategory();
    }, [defaultFilter]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                await getAllCategories();
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        }
        fetchCategories();
    }, []);

    useEffect(() => {
        if (mangaList.length > 0) {
            fetchChapterForAll()
        }
    }, [mangaList])

    // Calculate pagination
    const indexOfLastManga = currentPage * mangaPerPage;
    const indexOfFirstManga = indexOfLastManga - mangaPerPage;
    const currentManga = mangaList.slice(indexOfFirstManga, indexOfLastManga);
    const totalPages = Math.ceil(mangaList.length / mangaPerPage);

    return (
        <div className="manga-category-page">
            <div className="container">
                <div className="row">
                    <div className="col-lg-9">
                        <div className="manga-content">
                            <div className="section-header">
                                <h2 className="section-title">
                                    Thể loại: {
                                    categories.length === 0
                                        ? 'Đang tải...'
                                        : categoryId
                                            ? categories.find(cat => String(cat.id) === String(categoryId))?.category_name || 'Không rõ'
                                            : 'Tất cả'
                                }
                                </h2>
                            </div>
                            <div className="manga-grid">
                                {currentManga.map(manga => (
                                    <div key={manga.id} className="manga-item">
                                        <MangaCard manga={manga} type="latest" chapter={mangaChapters[manga.id] || []}/>
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
                        <FilterSidebar filters={defaultFilter} pages='category'/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Category;