import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FloatingNavBar.css';

interface FloatingNavBarProps {
    currentChapter: number;
    totalChapters: number;
    mangaId: string;
    mangaTitle: string;
}

const FloatingNavBar: React.FC<FloatingNavBarProps> = ({
                                                                   currentChapter,
                                                                   totalChapters,
                                                                   mangaId,
                                                                   mangaTitle,
                                                               }) => {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsVisible(scrollPosition > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleChapterNavigation = (direction: 'next' | 'prev') => {
        const newChapter = direction === 'next' ? currentChapter + 1 : currentChapter - 1;
        if (newChapter > 0 && newChapter <= totalChapters) {
            navigate(`/manga/${mangaId}/chapter/${newChapter}`);
        }
    };

    // if (!isVisible) return null;

    return (
        <div className={`floating-nav ${isVisible ? 'visible' : ''} `}>
            <div className="floating-nav__container">
                <div className="floating-nav__info">
                    <span className="floating-nav__title">{mangaTitle}</span>
                    <span className="floating-nav__chapter">Chapter {currentChapter}</span>
                </div>
                <div className="floating-nav__buttons">
                    <button
                        onClick={() => handleChapterNavigation('prev')}
                        disabled={currentChapter <= 1}
                        className="floating-nav__button floating-nav__button--prev"
                    >
                        Previous Chapter
                    </button>
                    <button
                        onClick={() => handleChapterNavigation('next')}
                        disabled={currentChapter >= totalChapters}
                        className="floating-nav__button floating-nav__button--next"
                    >
                        Next Chapter
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FloatingNavBar;