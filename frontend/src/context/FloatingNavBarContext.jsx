import {createContext, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useFilter} from "./FilterContext";

const FloatingNavBarContext = createContext();

export const FloatingNavBarProvider = ({children}) => {
    const [isVisible, setIsVisible] = useState(false);
    // const [manga, setManga] = useState(null);

    const {manga} = useFilter();

    const navigate = useNavigate();

    const getChapterDetails = (mangaId, currentChapter, totalChapters) => {
        // Fetch manga details from an API or context
        // This is a placeholder, replace with actual data fetching logic
        return {
            mangaId,
            mangaTitle: `Manga Title for ${mangaId}`,
            currentChapter,
            totalChapters
        };
    }

    const handleChapterNavigation = (direction: 'next' | 'prev') => {
        // const newChapter = direction === 'next' ? manga.currentChapter + 1 : manga.currentChapter - 1;
        // if (newChapter > 0 && newChapter <= manga.totalChapters) {
        //     navigate(`/manga/${manga.mangaId}/chapter/${newChapter}`);
        // }
        return (
            direction === 'next' ?
                navigate(`/manga/${manga.mangaId}/chapter/${manga.currentChapter + 1}`) :
                navigate(`/manga/${manga.mangaId}/chapter/${manga.currentChapter - 1}`)
        );
    };

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        setIsVisible(scrollPosition > 100);
    };


    return (
        <FloatingNavBarContext.Provider value={{isVisible, manga, handleChapterNavigation, handleScroll}}>
            {children}
        </FloatingNavBarContext.Provider>
    );
}

export const useFloatingNavBar = () => {
    const context = useContext(FloatingNavBarContext);
    if (!context) {
        throw new Error('useFloatingNavBar must be used within a FloatingNavBarProvider');
    }
    return context;
}
