import {createContext, useContext, useState} from "react";

const MangaReaderContext = createContext();

export const MangaReaderProvider = ({children}) => {
    const [chapter, setChapter] = useState(null);
    const [manga, setManga] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [pages, setPages] = useState([]);

    // const [loading, setLoading] = useState(true);

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
            chapter,
            setChapter,
            manga,
            // setManga,
            currentPage,
            setCurrentPage,
            pages,
            setPages,
            handlePrevPage,
            handleNextPage
        }}>
            {children}
        </MangaReaderContext.Provider>

    );
}

export const useMangaReader = () => {
    const context = useContext(MangaReaderContext);
    if (!context) {
        throw new Error('useMangaReader must be used within a MangaReaderProvider');
    }
    return context;
}