import React, {createContext, useState, useContext} from 'react';
import axios from "axios";

const FilterContext = createContext();

export const FilterProvider = ({children}) => {

    const [mangaList, setMangaList] = useState([]);
    const [manga, setManga] = useState(null);
    const [categories, setCategories] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [defaultFilter, setDefaultFilter] = useState({
        status: 'all',
        sortBy: 'latest',
        genres: []
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

    const getMangaByCategory = async (categoryId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/manga/category/${categoryId}`);
            setMangaList(response.data);
        } catch (error) {
            console.error(`Error fetching manga for category with ID ${categoryId}:`, error);
            throw new Error(`Failed to fetch manga for category with ID ${categoryId}`);
        }
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
            getMangaByCategory
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