import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './MangaDetail.css';
import {useFilter} from "../../context/FilterContext";

const MangaDetail = () => {
    const {id} = useParams();
    const {manga, chapters, getMangaById, getChapterOfManga} = useFilter();
    // const [chapter, setChapter] = useState([]);

    useEffect(() => {
        const fetchManga = async () => {
            await getMangaById(id);
        }
        fetchManga();
    }, [id]);

    useEffect(() => {
        const fetchChapters = async () => {
            const result = await getChapterOfManga(id);
        };
        fetchChapters();
    }, [id])

    useEffect(() => {
        if (manga) console.log('Fetched manga:', manga);
    }, [id]);

    if (!manga) return <div>Loading manga...</div>;


    return (
        <div className="manga-detail-page">
            <div className="container">
                <div className="manga-detail-content">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="manga-cover">
                                <img src={manga.cover_img} alt={manga.name} className="img-fluid"/>
                            </div>
                            <div className="manga-info-basic">
                                <h1 className="manga-title">{manga.name}</h1>
                                <div className="manga-meta">
                                    <p><strong>Tác giả:</strong> {manga.id_author?.author_name}</p>
                                    <p><strong>Trạng thái:</strong> {manga.id_status?.status_name}</p>
                                    <p><strong>Thể
                                        loại:</strong> {manga.id_category.map(cat => cat.category_name).join(", ")}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8">
                            <div className="manga-description">
                                <h3>Nội dung</h3>
                                <p>{manga.description}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="manga-chapters">
                    <div className="chapters-list">
                        {chapters.map((ch) => (
                            <div key={ch.id} className="chapter-item">
                                <a href={`/manga/${manga.id}/chapter/${ch.id}`}
                                   className="chapter-link">
                                    <span className="chapter-number">{ch.chapter_number}</span>
                                    <span className="chapter-title">{ch.chapter_name}</span>
                                    {/*<span className="chapter-date">{ch.date}</span>*/}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MangaDetail; 