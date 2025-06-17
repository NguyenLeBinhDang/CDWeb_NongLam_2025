import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useFloatingNavBar} from "../../context/FloatingNavBarContext";
import './FloatingNavBar.css';
import {Button} from "@mui/material";
import ChapterDropdown from "../../context/ChapterDropdown";

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
        const [showChapterList, setShowChapterList] = useState(false);
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
                        <li><Link to="/"><i className="fas fa-home"></i></Link></li>
                        <span className="floating-nav__title" onClick={()=>
                            navigate(`/manga/${mangaId}`)
                        }>{mangaTitle}</span>
                        <div className="chapter-selector">
                       <span
                           className="floating-nav__chapter"
                           onClick={() => setShowChapterList(!showChapterList)}
                       >
          Chapter {currentChapter}
                           <i className={`fas fa-chevron-${showChapterList ? 'up' : 'down'}`}></i>
        </span>

                            {showChapterList && (
                                <ChapterDropdown
                                    chapters={chapters}
                                    currentChapter={currentChapter}
                                    mangaId={mangaId}
                                    onClose={() => setShowChapterList(false)}
                                    position="right"
                                />
                            )}
                        </div>
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