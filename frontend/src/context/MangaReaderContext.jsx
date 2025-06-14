import { createContext, useContext, useState } from "react";
import axios from "axios";

const MangaReaderContext = createContext();

export const MangaReaderProvider = ({ children }) => {
    // const [chapter, setChapter] = useState(null);
    const [manga, setManga] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [pages, setPages] = useState([]);
    const [loadingPages, setLoadingPages] = useState(false);
    const [error, setError] = useState(null);

    const loadPages = async (mangaId, chapNum) => {
        setLoadingPages(true);
        setError(null);
        try {
            const response = await axios.get(
                `http://localhost:8080/api/manga/${mangaId}/chapter/${chapNum}/pages`
            );

            if (response.data && response.data.length > 0) {
                const imageUrls = response.data.map(p => p.page_img_url);
                setPages(imageUrls);
                setCurrentPage(0);
            } else {
                setPages([]);
                setError('Không tìm thấy trang nào cho chương này');
            }
        } catch (err) {
            console.error("Lỗi khi tải ảnh:", err);
            setPages([]);
            setError(err.response?.data?.message || 'Lỗi khi tải trang truyện');
        } finally {
            setLoadingPages(false);
        }
    };

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

    return (
        <MangaReaderContext.Provider value={{
            // chapter,
            manga,
            currentPage,
            pages,
            loadingPages,
            error,
            handlePrevPage,
            handleNextPage,
            loadPages,
            setCurrentPage
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