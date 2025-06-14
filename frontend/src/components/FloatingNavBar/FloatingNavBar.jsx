import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useFloatingNavBar} from "../../context/FloatingNavBarContext";
import './FloatingNavBar.css';

const FloatingNavBar = ({
                            currentChapter,
                            mangaId,
                            mangaTitle,
                            chapters,
                            onChapterChange,
                            onNextChapter,
                            onPrevChapter,
                            hasNextChapter,
                            hasPrevChapter,
                        }) => {
        const navigate = useNavigate();


        const nextChapter = chapters[currentChapter + 1];

        const prevChapter = chapters[currentChapter - 1];

        const {isVisible, handleScroll} = useFloatingNavBar();

        useEffect(() => {
            handleScroll();
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }, []);

        return (
            <div className={`floating-nav ${isVisible ? 'visible' : ''} `}>
                <div className="floating-nav__container">
                    <div className="floating-nav__info">
                        <span className="floating-nav__title">{mangaTitle}</span>
                        <span className="floating-nav__chapter">Chapter {currentChapter}</span>
                    </div>
                    <div className="floating-nav__buttons">
                        <button
                            onClick={onPrevChapter}
                            disabled={currentChapter <= chapters.length - 1}
                            className="floating-nav__button floating-nav__button--prev"
                        >
                            Previous Chapter
                        </button>
                        <button
                            onClick={onNextChapter}
                            disabled={currentChapter >= chapters.length - 1}
                            className="floating-nav__button floating-nav__button--next"
                        >
                            Next Chapter
                        </button>
                    </div>
                </div>
            </div>
        );
    }
;

export default FloatingNavBar;