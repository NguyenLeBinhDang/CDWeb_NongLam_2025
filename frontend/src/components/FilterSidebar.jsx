import React from 'react';
import './FilterSidebar.css';

const FilterSidebar = ({ filters, onFilterChange }) => {
    // Các options cho status
    const statusOptions = [
        { value: 'all', label: 'Tất cả' },
        { value: 'ongoing', label: 'Đang tiến hành' },
        { value: 'completed', label: 'Hoàn thành' },
        { value: 'hiatus', label: 'Tạm ngưng' }
    ];

    // Các options cho sorting
    const sortOptions = [
        { value: 'latest', label: 'Mới nhất' },
        { value: 'popular', label: 'Phổ biến' },
        { value: 'rating', label: 'Đánh giá' },
        { value: 'name', label: 'Tên A-Z' }
    ];

    // Danh sách thể loại
    const genres = [
        "Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery",
        "Romance", "School Life", "Sci-Fi", "Slice of Life", "Sports", "Supernatural", "Thriller"
    ];

    // Xử lý thay đổi status
    const handleStatusChange = (e) => {
        onFilterChange({
            ...filters,
            status: e.target.value
        });
    };

    // Xử lý thay đổi sorting
    const handleSortChange = (e) => {
        onFilterChange({
            ...filters,
            sortBy: e.target.value
        });
    };

    // Xử lý thay đổi genre
    const handleGenreToggle = (genre) => {
        const newGenres = filters.genres.includes(genre)
            ? filters.genres.filter(g => g !== genre)
            : [...filters.genres, genre];
        
        onFilterChange({
            ...filters,
            genres: newGenres
        });
    };

    // Reset tất cả filter
    const handleResetFilters = () => {
        onFilterChange({
            status: 'all',
            sortBy: 'latest',
            genres: []
        });
    };

    return (
        <div className="filter-sidebar">
            <div className="filter-content">
                {/* Reset Filters Button */}
                <button className="reset-filters" onClick={handleResetFilters}>
                    <i className="fas fa-redo"></i> Reset Filters
                </button>

                {/* Status Filter */}
                <div className="filter-group">
                    <h3 className="filter-title">Trạng thái</h3>
                    <div className="filter-options">
                        {statusOptions.map(option => (
                            <label key={option.value} className="filter-option">
                                <input
                                    type="radio"
                                    name="status"
                                    value={option.value}
                                    checked={filters.status === option.value}
                                    onChange={handleStatusChange}
                                />
                                <span className="radio-label"></span>
                                {option.label}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Sort Options */}
                <div className="filter-group">
                    <h3 className="filter-title">Sắp xếp theo</h3>
                    <div className="filter-options">
                        {sortOptions.map(option => (
                            <label key={option.value} className="filter-option">
                                <input
                                    type="radio"
                                    name="sort"
                                    value={option.value}
                                    checked={filters.sortBy === option.value}
                                    onChange={handleSortChange}
                                />
                                <span className="radio-label"></span>
                                {option.label}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Genres Filter */}
                <div className="filter-group">
                    <h3 className="filter-title">Thể loại</h3>
                    <div className="genres-grid">
                        {genres.map(genre => (
                            <label key={genre} className="genre-option">
                                <input
                                    type="checkbox"
                                    checked={filters.genres.includes(genre)}
                                    onChange={() => handleGenreToggle(genre)}
                                />
                                <span className="checkbox-label"></span>
                                {genre}
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar; 