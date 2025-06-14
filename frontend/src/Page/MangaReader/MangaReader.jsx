import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MangaReader.css';
import FloatingNavBar from "../../components/FloatingNavBar/FloatingNavBar";
import { useMangaReader } from "../../context/MangaReaderContext";
import { useFilter } from "../../context/FilterContext";
import { Button, CircularProgress } from "@mui/material";

const MangaReader = () => {
    const { mangaId, chapNum } = useParams();
    const navigate = useNavigate();

    const {
        pages,
        currentPage,
        handlePrevPage,
        handleNextPage,
        loadPages,
        loadingPages,
        error: pagesError
    } = useMangaReader();

    const {
        getChapterOfManga,
        chapters,
        getMangaById,
        manga,
        loading: filterLoading
    } = useFilter();

    const [scrollMode, setScrollMode] = useState(true);
    const [error, setError] = useState(null);

    const parsedChapNum = parseInt(chapNum);

    const sortedChapters = [...(chapters || [])].sort((a, b) => b.chapter_number - a.chapter_number);

    useEffect(() => {
        if (!mangaId || !chapNum) {
            setError('Thiếu thông tin manga hoặc chương');
            return;
        }

        const fetchData = async () => {
            try {
                setError(null);
                await getMangaById(mangaId);
                await getChapterOfManga(mangaId);

                await loadPages(mangaId, chapNum);
            } catch (err) {
                console.error('Error loading manga data:', err);
                setError(err.message || 'Lỗi khi tải dữ liệu');
                if (sortedChapters.length > 0) {
                    navigate(`/manga/${mangaId}/chapter/${sortedChapters[0].chapter_number}`);
                }
            }
        };

        fetchData();
    }, [mangaId, chapNum]);

    const handleChapterChange = (newChapNum) => {
        navigate(`/manga/${mangaId}/chapter/${newChapNum}`);
    };

    const handleNextChapter = () => {
        const currentIndex = sortedChapters.findIndex(ch => ch.chapter_number === parsedChapNum);
        console.log(currentIndex);
        if (currentIndex > 0) {
            handleChapterChange(sortedChapters[currentIndex - 1].chapter_number);
        }
    };

    const handlePrevChapter = () => {
        const currentIndex = sortedChapters.findIndex(ch => ch.chapter_number === parsedChapNum);
        if (currentIndex < sortedChapters.length - 1) {
            handleChapterChange(sortedChapters[currentIndex + 1].chapter_number);
        }
    };
    if (!mangaId || !chapNum) {
        return <div className="error-container">Thiếu thông tin manga hoặc chương</div>;
    }

    if (filterLoading || loadingPages) {
        return (
            <div className="loading-container">
                <CircularProgress />
                <p>Đang tải dữ liệu...</p>
            </div>
        );
    }

    if (error || pagesError) {
        return <div className="error-container">{error || pagesError}</div>;
    }

    if (!pages || pages.length === 0) {
        return <div className="error-container">Không tìm thấy trang nào trong chương này</div>;
    }

    return (
        <div className="manga-reader-page">
            <FloatingNavBar
                currentChapter={parsedChapNum}
                mangaId={mangaId}
                mangaTitle={manga?.name || ''}
                chapters={sortedChapters}
                onChapterChange={handleChapterChange}
                onNextChapter={handleNextChapter}
                onPrevChapter={handlePrevChapter}
                hasNextChapter={sortedChapters.findIndex(ch => ch.chap_number === parsedChapNum) > 0}
                hasPrevChapter={sortedChapters.findIndex(ch => ch.chap_number === parsedChapNum) < sortedChapters.length - 1}
            />

            <Button
                onClick={() => setScrollMode(prev => !prev)}
                variant="contained"
                color="primary"
                style={{ position: 'fixed', top: '80px', right: '20px', zIndex: 1000 }}
            >
                {scrollMode ? 'Chế độ xem trang' : 'Chế độ cuộn'}
            </Button>

            {scrollMode ? (
                <div className="manga-page-container scroll-mode">
                    {pages.map((page, index) => (
                        <img
                            key={page.id || index}
                            src={page.page_img_url}
                            alt={`Trang ${page.page_number}`}
                            className="manga-page"
                            loading="lazy"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/placeholder-image.jpg';
                            }}
                        />
                    ))}
                </div>
            ) : (
                <div className="manga-page-container single-mode">
                    <img
                        src={pages[currentPage]?.page_img_url}
                        alt={`Trang ${pages[currentPage]?.page_number}`}
                        className="manga-page"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/placeholder-image.jpg';
                        }}
                    />
                    <div className="manga-reader-controls">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 0}
                        >
                            Trang trước
                        </button>
                        <span>Trang {currentPage + 1} / {pages.length}</span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === pages.length - 1}
                        >
                            Trang sau
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MangaReader;
