import React, {createContext, useState, useContext} from 'react';
import axios from "axios";

const FilterContext = createContext();

export const FilterProvider = ({children}) => {

    const [mangaList, setMangaList] = useState([]);
    const [manga, setManga] = useState(null);
    const [categories, setCategories] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [defaultFilter, setDefaultFilter] = useState({
        search: '',
        categoryIds: [],
        statusId: null
    });

    const getChapterOfManga = async (mangaId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/manga/${mangaId}/chapter`);
            setChapters(response.data);
            return response.data;
        } catch (error) {
            console.error(`Error fetching chapters for manga with ID ${mangaId}:`, error);
            throw new Error(`Failed to fetch chapters for manga with ID ${mangaId}`);
        }
    }

    const getAllCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw new Error('Failed to fetch categories');
        }
    }

    const getAllManga = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/manga');
            setMangaList(response.data);
        } catch (error) {
            console.error('Error fetching manga list:', error);
            throw new Error('Failed to fetch manga list');
        }
    };

    const getMangaById = async (mangaId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/manga/${mangaId}`);
            setManga(response.data);
        } catch (error) {
            console.error(`Error fetching manga with ID ${mangaId}:`, error);
            throw new Error(`Failed to fetch manga with ID ${mangaId}`);
        }
    };

    const getManga = async (filter = defaultFilter) => {
        try {
            const params = new URLSearchParams();

            if (filter.search) params.append("search", filter.search);
            if (filter.statusId !== null) params.append("statusId", filter.statusId);
            if (Array.isArray(filter.categoryIds)) {
                filter.categoryIds.forEach(id => params.append("categoryIds", id));
            }
            const response = await axios.get(`http://localhost:8080/api/manga?${params.toString()}`);
            setMangaList(response.data);
        } catch (error) {
            console.error('Error fetching manga:', error);
            throw new Error('Failed to fetch manga');
        }
    };

    const handleCategoryChange = (categoryId) => {
        setDefaultFilter(prevFilter => {
            const isSelected = prevFilter.categoryIds.includes(categoryId);
            const updatedCategories = isSelected
                ? prevFilter.categoryIds.filter(id => id !== categoryId)
                : [...prevFilter.categoryIds, categoryId];

            const newFilter = {
                ...prevFilter,
                categoryIds: updatedCategories
            };

            // Fetch new manga based on updated filters
            getManga(newFilter);
            return newFilter;
        });
    };

    const setFilterFromHome = (filter) => {
        setDefaultFilter(filter);
    };

    return (
        <FilterContext.Provider value={{
            defaultFilter,
            mangaList,
            manga,
            categories,
            chapters,
            getAllCategories,
            setFilterFromHome,
            getAllManga,
            getMangaById,
            getChapterOfManga,
            getManga,
            handleCategoryChange
        }}>
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