import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import './MangaDetail.css';

const MangaDetail = () => {
    const {id} = useParams();
    // const [activeTab, setActiveTab] = useState('info');

    // Dữ liệu mẫu cho chi tiết truyện
    const mangaDetail = {
        id: id,
        title: "One Piece",
        author: "Eiichiro Oda",
        status: "Đang tiến hành",
        genres: ["Action", "Adventure", "Comedy", "Drama", "Fantasy"],
        description: "One Piece là câu chuyện về Monkey D. Luffy, một cậu bé có ước mơ trở thành Vua Hải Tặc. Sau khi vô tình ăn phải trái ác quỷ, cơ thể cậu có khả năng co giãn như cao su. Cùng với những người bạn đồng hành, Luffy bắt đầu cuộc hành trình tìm kiếm kho báu One Piece và thực hiện ước mơ của mình.",
        coverImage: "https://via.placeholder.com/300x400",
        rating: 4.8,
        views: "1.2M",
        chapters: [
            {id: 1, number: "1090", title: "Chapter 1090", date: "2 giờ trước"},
            {id: 2, number: "1089", title: "Chapter 1089", date: "1 ngày trước"},
            {id: 3, number: "1088", title: "Chapter 1088", date: "2 ngày trước"},
            {id: 4, number: "1087", title: "Chapter 1087", date: "3 ngày trước"},
            {id: 5, number: "1086", title: "Chapter 1086", date: "4 ngày trước"},
        ]
    };

    return (
        <div className="manga-detail-page">
            <div className="container">
                <div className="manga-detail-content">
                    <div className="row">
                        {/* Manga Cover and Basic Info */}
                        <div className="col-lg-4">
                            <div className="manga-cover">
                                <img src={mangaDetail.coverImage} alt={mangaDetail.title} className="img-fluid"/>
                            </div>
                            <div className="manga-info-basic">
                                <h1 className="manga-title">{mangaDetail.title}</h1>
                                <div className="manga-meta">
                                    <p><strong>Tác giả:</strong> {mangaDetail.author}</p>
                                    <p><strong>Trạng thái:</strong> {mangaDetail.status}</p>
                                    <p><strong>Thể loại:</strong> {mangaDetail.genres.join(", ")}</p>
                                    <p><strong>Đánh giá:</strong> {mangaDetail.rating}/5</p>
                                    <p><strong>Lượt xem:</strong> {mangaDetail.views}</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8">
                            <div className="manga-description">
                                <h3>Nội dung</h3>
                                <p>{mangaDetail.description}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="manga-chapters">
                    <div className="chapters-list">
                        {mangaDetail.chapters.map(chapter => (
                            <div key={chapter.id} className="chapter-item">
                                <a href={`/manga/${mangaDetail.id}/chapter/${chapter.number}`}
                                   className="chapter-link">
                                    <span className="chapter-number">{chapter.number}</span>
                                    <span className="chapter-title">{chapter.title}</span>
                                    <span className="chapter-date">{chapter.date}</span>
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