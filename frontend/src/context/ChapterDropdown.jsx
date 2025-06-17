import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ChapterDropdown = ({
                             chapters = [],
                             currentChapter,
                             mangaId,
                             onClose,
                             position = 'right'
                         }) => {
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    // Đóng dropdown khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    return (
        <div
            ref={dropdownRef}
            className={`chapter-dropdown ${position}`}
        >
            {chapters
                .sort((a, b) => b.chapter_number - a.chapter_number)
                .map(chapter => (
                    <div
                        key={chapter.id}
                        className={`chapter-item ${currentChapter === chapter.chapter_number ? 'active' : ''}`}
                        onClick={() => {
                            navigate(`/manga/${mangaId}/chapter/${chapter.chapter_number}`);
                            onClose();
                        }}
                    >
                        <span className="chapter-number">Chapter {chapter.chapter_number}</span>
                        {chapter.chapter_name && (
                            <span className="chapter-title">{chapter.chapter_name}</span>
                        )}
                    </div>
                ))}
        </div>
    );
};

export default ChapterDropdown;