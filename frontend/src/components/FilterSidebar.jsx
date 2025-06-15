import React, {useEffect} from 'react';
import './FilterSidebar.css';
import {useFilter} from "../context/FilterContext";

const FilterSidebar = ({filters, pages}) => {
    const {
        categories,
        getAllCategories,
        getAllStatus,
        getManga,
        status,
        setFilterFromHome,
        handleCategoryChange,
        handleStatusChange,
        handleSortChange
    } = useFilter();

    useEffect(() => {
        getAllStatus();
        getAllCategories();
    }, []);

    // Các options cho sorting
    const sortOptions = [
        {value: 'latest', label: 'Mới nhất'},
        {value: 'popular', label: 'Phổ biến'},
        {value: 'rating', label: 'Đánh giá'},
        {value: 'name', label: 'Tên A-Z'}
    ];

    // Reset tất cả filter
    const handleResetFilters = () => {
        const newFilter = {
            search: '',
            categoryIds: [],
            statusId: null,
            authorId: null,
            sortBy: 'latest'
        };
        setFilterFromHome(newFilter);
        getManga(newFilter);
    };

    const renderFilterSidebar = () => {
        switch (pages) {
            case 'category':
                return (
                    <div className="filter-sidebar">
                        <div className="filter-content">
                            {/* Reset Filters Button */}
                            <button className="reset-filters" onClick={handleResetFilters}>
                                <i className="fas fa-redo"></i> Reset Filters
                            </button>

                            {/*Status Filter*/}
                            <div className="filter-group">
                                <h3 className="filter-title">Trạng thái</h3>
                                <div className="filter-options">
                                    <label key="all" className="filter-option">
                                        <input
                                            type="radio"
                                            name="status"
                                            checked={filters.statusId === null}
                                            onChange={() => handleStatusChange(null)}
                                        />
                                        <span className="radio-label"></span>
                                        All
                                    </label>
                                    {status.map(({id, status_name}) => (
                                        <label key={id} className="filter-option">
                                            <input
                                                type="radio"
                                                name="status"
                                                checked={filters.statusId === id}
                                                onChange={() => handleStatusChange(id)}
                                            />
                                            <span className="radio-label"></span>
                                            {status_name}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/*/!* Sort Options *!/*/}
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
                                                onChange={() => handleSortChange(option.value)}
                                            />
                                            <span className="radio-label"></span>
                                            {option.label}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="filter-sidebar">
                        <div className="filter-content">
                            {/* Reset Filters Button */}
                            <button className="reset-filters" onClick={handleResetFilters}>
                                <i className="fas fa-redo"></i> Reset Filters
                            </button>

                            {/*Status Filter*/}
                            <div className="filter-group">
                                <h3 className="filter-title">Trạng thái</h3>
                                <div className="filter-options">
                                    <label key="all" className="filter-option">
                                        <input
                                            type="radio"
                                            name="status"
                                            checked={filters.statusId === null}
                                            onChange={() => handleStatusChange(null)}
                                        />
                                        <span className="radio-label"></span>
                                        All
                                    </label>
                                    {status.map(({id, status_name}) => (
                                        <label key={id} className="filter-option">
                                            <input
                                                type="radio"
                                                name="status"
                                                checked={filters.statusId === id}
                                                onChange={() => handleStatusChange(id)}
                                            />
                                            <span className="radio-label"></span>
                                            {status_name}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/*/!* Sort Options *!/*/}
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
                                                onChange={() => handleSortChange(option.value)}
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
        }
    }
    return renderFilterSidebar();
    // return (
    //     <div className="filter-sidebar">
    //         <div className="filter-content">
    //             {/* Reset Filters Button */}
    //             <button className="reset-filters" onClick={handleResetFilters}>
    //                 <i className="fas fa-redo"></i> Reset Filters
    //             </button>
    //
    //             {/*Status Filter*/}
    //             <div className="filter-group">
    //                 <h3 className="filter-title">Trạng thái</h3>
    //                 <div className="filter-options">
    //                     <label key="all" className="filter-option">
    //                         <input
    //                             type="radio"
    //                             name="status"
    //                             checked={filters.statusId === null}
    //                             onChange={() => handleStatusChange(null)}
    //                         />
    //                         <span className="radio-label"></span>
    //                         All
    //                     </label>
    //                     {status.map(({id, status_name}) => (
    //                         <label key={id} className="filter-option">
    //                             <input
    //                                 type="radio"
    //                                 name="status"
    //                                 checked={filters.statusId === id}
    //                                 onChange={() => handleStatusChange(id)}
    //                             />
    //                             <span className="radio-label"></span>
    //                             {status_name}
    //                         </label>
    //                     ))}
    //                 </div>
    //             </div>
    //
    //             {/*/!* Sort Options *!/*/}
    //             <div className="filter-group">
    //                 <h3 className="filter-title">Sắp xếp theo</h3>
    //                 <div className="filter-options">
    //                     {sortOptions.map(option => (
    //                         <label key={option.id} className="filter-option">
    //                             <input
    //                                 type="radio"
    //                                 name="sort"
    //                                 value={option.value}
    //                                 checked={filters.sortBy === option.id}
    //                                 // onChange={}
    //                             />
    //                             <span className="radio-label"></span>
    //                             {option.label}
    //                         </label>
    //                     ))}
    //                 </div>
    //             </div>
    //
    //             {/* Genres Filter */}
    //             <div className="filter-group">
    //                 <h3 className="filter-title">Thể loại</h3>
    //                 <div className="genres-grid">
    //                     {categories.map(({id, category_name}) => (
    //                         <label key={id} className="filter-option">
    //                             <input
    //                                 type="checkbox"
    //                                 checked={filters.categoryIds.includes(id)}
    //                                 onChange={() => handleCategoryChange(id)}
    //                             />
    //                             <span className="checkbox-label">{category_name}</span>
    //                         </label>
    //                     ))}
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );
};

export default FilterSidebar;