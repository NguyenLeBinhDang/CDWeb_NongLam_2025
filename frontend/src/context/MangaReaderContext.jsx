import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const MangaReaderContext = createContext();

export const MangaReaderProvider = ({ children }) => {
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [loadingPages, setLoadingPages] = useState(false);
    const [error, setError] = useState(null);

    const preloadImages = (pageList) => {
        pageList.forEach(page => {
            const img = new Image();
            img.src = page.page_img_url;
        });
    };

    const loadPages = async (mangaId, chapNum) => {
        setLoadingPages(true);
        setError(null);
        try {
            const res = await axios.get(
                `http://localhost:8080/api/manga/${mangaId}/chapter/${chapNum}/pages`
            );

            const data = res.data || [];
            setPages(data);
            setCurrentPage(0);
            preloadImages(data);

            if (data.length === 0) {
                setError("Không tìm thấy trang nào cho chương này");
            }
        } catch (err) {
            console.error("Lỗi khi tải ảnh:", err);
            setPages([]);
            setError(err.response?.data?.message || "Lỗi khi tải trang truyện");
        } finally {
            setLoadingPages(false);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) setCurrentPage(prev => prev - 1);
    };

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) setCurrentPage(prev => prev + 1);
    };

    const scrollToPage = useCallback((index) => {
        const target = document.querySelector(`#page-${index}`);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    // Auto scroll to currentPage when in scroll mode
    useEffect(() => {
        scrollToPage(currentPage);
    }, [currentPage, scrollToPage]);

    return (
        <MangaReaderContext.Provider value={{
            pages,
            currentPage,
            loadingPages,
            error,
            loadPages,
            setCurrentPage,
            handlePrevPage,
            handleNextPage,
            scrollToPage,
        }}>
            {children}
        </MangaReaderContext.Provider>
    );
};

export const useMangaReader = () => {
    const context = useContext(MangaReaderContext);
    if (!context) {
        throw new Error('useMangaReader must be used within a MangaReaderProvider');
    }
    return context;
};
