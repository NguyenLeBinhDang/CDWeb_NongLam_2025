import React, {useEffect} from 'react';
import './FilterSidebar.css';
import {useFilter} from "../context/FilterContext";

const FilterSidebar = ({filters, onFilterChange}) => {
    const {categories, getAllCategories, getManga, setFilterFromHome, handleCategoryChange} = useFilter();
    useEffect(() => {
        getAllCategories();
    }, []);

    // Các options cho status
    const statusOptions = [
        {value: 'all', label: 'Tất cả'},
        {value: 'ongoing', label: 'Đang tiến hành'},
        {value: 'completed', label: 'Hoàn thành'},
        {value: 'hiatus', label: 'Tạm ngưng'}
    ];

    // Các options cho sorting
    const sortOptions = [
        {value: 'latest', label: 'Mới nhất'},
        {value: 'popular', label: 'Phổ biến'},
        {value: 'rating', label: 'Đánh giá'},
        {value: 'name', label: 'Tên A-Z'}
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

    // Reset tất cả filter
    const handleResetFilters = () => {
        const newFilter = {
            search: '',
            categoryIds: [],
            statusId: null
        };
        setFilterFromHome(newFilter);
        getManga(newFilter);
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
                        {categories.map(({id, category_name}) => (
                            <label key={id} className="filter-option">
                                <input
                                    type="checkbox"
                                    checked={filters.categoryIds.includes(id)}
                                    onChange={() => handleCategoryChange(id)}
                                />
                                <span className="checkbox-label">{category_name}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar; 