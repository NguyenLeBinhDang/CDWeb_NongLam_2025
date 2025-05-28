import React from 'react';
import { Link } from 'react-router-dom';
import './mangaCard.css';

const MangaCard = ({ manga, type = 'latest' }) => {
    const renderCard = () => {
        switch (type) {
            case 'latest':
                return (
                    <div className="manga-card">
                        <div className="manga-image">
                            <Link to={`/manga/${manga.id}`}>
                                <img src={manga.image} alt={manga.title} className="img-fluid" />
                            </Link>
                            <div className="manga-update">
                                <span>{manga.chapter}</span>
                            </div>
                        </div>
                        <div className="manga-info">
                            <h3 className="manga-title">
                                <Link to={`/manga/${manga.id}`}>{manga.title}</Link>
                            </h3>
                            <div className="update-time">
                                <i className="far fa-clock"></i> {manga.time}
                            </div>
                        </div>
                    </div>
                );
            case 'popular':
                return (
                    <div className="popular-card">
                        <div className="popular-image">
                            <Link to={`/manga/${manga.id}`}>
                                <img src={manga.image} alt={manga.title} className="img-fluid" />
                            </Link>
                            <div className="popular-ranking">
                                <span>{manga.id - 10}</span>
                            </div>
                        </div>
                        <div className="popular-info">
                            <h3 className="manga-title">
                                <Link to={`/manga/${manga.id}`}>{manga.title}</Link>
                            </h3>
                            <div className="manga-views">
                                <i className="far fa-eye"></i> {manga.views}
                            </div>
                        </div>
                    </div>
                );
            case 'recommended':
                return (
                    <div className="manga-card recommended">
                        <div className="manga-image">
                            <Link to={`/manga/${manga.id}`}>
                                <img src={manga.image} alt={manga.title} className="img-fluid" />
                            </Link>
                        </div>
                        <div className="manga-info">
                            <h3 className="manga-title">
                                <Link to={`/manga/${manga.id}`}>{manga.title}</Link>
                            </h3>
                            <div className="manga-views">
                                <i className="far fa-eye"></i> {manga.views}
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
