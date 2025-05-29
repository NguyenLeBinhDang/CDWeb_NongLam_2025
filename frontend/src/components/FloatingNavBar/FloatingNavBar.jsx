import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useFloatingNavBar} from "../../context/FloatingNavBarContext";
import './FloatingNavBar.css';

const FloatingNavBar = () => {
    const navigate = useNavigate();

    const {isVisible, manga, handleChapterNavigation, handleScroll} = useFloatingNavBar();

    useEffect(() => {
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`floating-nav ${isVisible ? 'visible' : ''} `}>
            <div className="floating-nav__container">
                <div className="floating-nav__info">
                    <span className="floating-nav__title">{manga.mangaTitle}</span>
                    <span className="floating-nav__chapter">Chapter {manga.currentChapter}</span>
                </div>
                <div className="floating-nav__buttons">
                    <button
                        onClick={() => handleChapterNavigation('prev')}
                        disabled={manga.currentChapter <= 1}
                        className="floating-nav__button floating-nav__button--prev"
                    >
                        Previous Chapter
                    </button>
                    <button
                        onClick={() => handleChapterNavigation('next')}
                        disabled={manga.currentChapter >= manga.totalChapters}
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