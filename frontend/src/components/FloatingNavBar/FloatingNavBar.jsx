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

        const {isVisible, handleScroll} = useFloatingNavBar();
        const navigate = useNavigate();

        const currentChapterId = chapters.find(ch => ch.chapter_number === currentChapter)?.id || -1;

        useEffect(() => {
            handleScroll();
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }, []);

        const handleComment = () => {
            navigate(`/manga/${mangaId}/chapter/${currentChapterId}/comments`);
        }

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
                            disabled={!hasPrevChapter}
                            className="floating-nav__button floating-nav__button--prev"
                        >
                            Previous Chapter
                        </button>
                        <button
                            onClick={onNextChapter}
                            disabled={!hasNextChapter}
                            className="floating-nav__button floating-nav__button--next"
                        >
                            Next Chapter
                        </button>
                        <button className="floating-nav__button floating-nav__button--comment" onClick={handleComment}>
                            {/*<i className="fa-light fa-comment"></i>*/}
                            {/*<i className="fa-solid fa-comment"></i>*/}
                            <i className="fa-regular fa-comment"></i>
                        </button>

                    </div>
                </div>
            </div>
        );
    }
;

export default FloatingNavBar;