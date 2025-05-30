import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './mangaCard.css';
import {useFilter} from "../context/FilterContext";

const MangaCard = ({manga, type = 'latest'}) => {
    const [chapter, setChapter] = useState([]);
    const {getChapterOfManga} = useFilter();

    useEffect(() => {
        const fetchChapters = async () => {
            const result = await getChapterOfManga(manga.id);
            setChapter(result || []);
        };
        fetchChapters();
    }, [manga.id]);

    const renderCard = () => {
        switch (type) {
            case 'latest':
                return (
                    <div className="manga-card">
                        <div className="manga-image">
                            <Link to={`/manga/${manga.id}`}>
                                <img src={manga.cover_img || "https://placehold.co/600x400"} alt={manga.name} className="img-fluid"/>
                            </Link>
                        </div>
                        <div className="manga-info">
                            <h3 className="manga-title">
                                <Link to={`/manga/${manga.id}`}>{manga.name}</Link>
                            </h3>
                            <div className="manga-update">
                                {chapter && chapter.length > 0 ? (
                                    chapter.map((ch) => (
                                        <Link
                                            key={ch.id}
                                            to={`/manga/${manga.id}/chapter/${ch.id}`}
                                            className="chapter-link"
                                        >
                                            {ch.chapter_name || `Chapter ${ch.chap_number}`}
                                        </Link>
                                    ))
                                ) : (
                                    <span className="no-chapters">Chưa có chương nào</span>
                                )}
                            </div>
                            <div className="manga-categories">
                                {manga.id_category?.slice(0, 3).map(category => (
                                    <span key={category.id} className="category-tag">
                                        {category.category_name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 'popular':
                return (
                    <div className="popular-card">
                        <div className="popular-image">
                            <Link to={`/manga/${manga.id}`}>
                                <img src={manga.cover_img} alt={manga.name} className="img-fluid"/>
                            </Link>
                            <div className="popular-ranking">
                                <span>{manga.id - 10}</span>
                            </div>
                        </div>
                        <div className="popular-info">
                            <h3 className="manga-title">
                                <Link to={`/manga/${manga.id}`}>{manga.name}</Link>
                            </h3>
                            <div className="manga-views">
                                <i className="far fa-eye"></i> {manga.views || 0}
                            </div>
                        </div>
                    </div>
                );
            case 'recommended':
                return (
                    <div className="manga-card recommended">
                        <div className="manga-image">
                            <Link to={`/manga/${manga.id}`}>
                                <img src={manga.cover_img} alt={manga.name} className="img-fluid"/>
                            </Link>
                        </div>
                        <div className="manga-info">
                            <h3 className="manga-title">
                                <Link to={`/manga/${manga.id}`}>{manga.name}</Link>
                            </h3>
                            <div className="manga-status">
                                {manga.id_status?.status_name}
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return renderCard();
};

export default MangaCard;
