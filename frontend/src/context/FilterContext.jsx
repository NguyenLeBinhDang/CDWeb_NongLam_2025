import React, { createContext, useState, useContext } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [defaultFilter, setDefaultFilter] = useState({
        status: 'all',
        sortBy: 'latest',
        genres: []
    });

    const setFilterFromHome = (filter) => {
        setDefaultFilter(filter);
    };

    return (
        <FilterContext.Provider value={{ defaultFilter, setFilterFromHome }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilter = () => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilter must be used within a FilterProvider');
    }
    return context;
};