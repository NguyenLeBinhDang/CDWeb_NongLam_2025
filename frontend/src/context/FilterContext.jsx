import React, {createContext, useContext, useState} from 'react';
import axios from "axios";
import {showConfirmDialog, showErrorDialog} from "../utils/Alert";

export const FilterContext = createContext();

export const FilterProvider = ({children}) => {

    const [mangaList, setMangaList] = useState([]);
    const [manga, setManga] = useState([]);
    const [categories, setCategories] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [users, setUsers] = useState([]);
    const [mangaChapters, setMangaChapters] = useState({});
    const [status, setStatus] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMassage, setErrorMessage] = useState('some error');
    const [authors, setAuthors] = useState([]);
    const [totalPages,setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [defaultFilter, setDefaultFilter] = useState({
        search: '',
        categoryIds: [],
        statusId: null,
        authorId: null,
        sortBy: 'latest',
        page: 0,
        size: 12,
    });
    const [defaultf, setDefaultf] = useState({
        search: '',
        categoryIds: [],
        statusId: null,
        authorId: null,
        sortBy: 'latest',
        page: 0,
        size: 12,
    });


    const fetchChapterForAll = async () => {
        const chaptersMap = {};
        if (mangaList !== null) {
            await Promise.all(mangaList.map(async (manga) => {
                chaptersMap[manga.id] = await getChapterOfManga(manga.id);
            }))
            setMangaChapters(chaptersMap);
        }
    };
    //fetch status
    const getAllStatus = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/status');
            setStatus(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching status:', error);
            throw new Error('Failed to fetch status');
        }
    }
    // const getAllUser = async () => {
    //     try {
    //         setLoading(true);
    //         const response = await axios.get('http://localhost:8080/api/users',  {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${localStorage.getItem('token')}`
    //             }
    //         });
    //         setLoading(false)
    //         setUsers(response.data);
    //         return response.data;
    //     } catch (error) {
    //         setLoading(false);
    //         console.error('Error fetching users:', error);
    //         const message = error?.response?.data?.message || 'Failed to fetch users';
    //         setErrorMessage(message);
    //         await showErrorDialog("Lỗi", message);
    //     }
    // }

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

    // const getAllManga = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:8080/api/manga');
    //         setMangaList(response.data);
    //     } catch (error) {
    //         console.error('Error fetching manga list:', error);
    //         throw new Error ('Failed to fetch manga list');
    //     }
    // };

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
            // setLoading(true);
            const params = new URLSearchParams();

            if (filter.search) params.append("search", filter.search);
            if (filter.statusId !== null) params.append("statusId", filter.statusId);
            if (Array.isArray(filter.categoryIds)) {
                filter.categoryIds.forEach(id => params.append("categoryIds", id));
            }
            if (filter.sortBy !== null) params.append("sortBy", filter.sortBy);
            params.append("page", filter.page || 0);          // page: 0-based
            params.append("size", filter.size || 12);
            setLoading(true);
            const response = await axios.get(`http://localhost:8080/api/manga?${params.toString()}`);
            // setMangaList(response.data);
            const data = response.data;
            setMangaList(data.content);  // dữ liệu trang hiện tại
            setTotalPages(data.totalPages); // dùng để hiển thị phân trang
            setCurrentPage(data.number);    // dùng cho UI active page

            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error fetching manga:', error);
            const message = error?.response?.data?.message || 'Failed to fetch manga';
            await setErrorMessage(message);
            await showErrorDialog('', message)
        }
    };
    const getAllAuthor  = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/authors`);
            setAuthors(response.data);
        } catch (error) {
            console.error(`Error fetching :`, error);
            throw new Error(`Failed to fetch`);
        }

    };
    const handleCategoryChange = (categoryId) => {
        setDefaultFilter(prevFilter => {
            const isSelected = prevFilter.categoryIds.includes(categoryId);
            const updatedCategories = isSelected
                ? prevFilter.categoryIds.filter(id => id !== categoryId)
                : [...prevFilter.categoryIds, categoryId];
            // Fetch new manga based on updated filters
            return {
                ...prevFilter,
                categoryIds: updatedCategories
            };
        });
    };

    const handleStatusChange = (statusId) => {
        setDefaultFilter(prevFilter => {

            // Fetch new manga based on updated filters
            return {
                ...prevFilter,
                statusId: statusId
            };
        });
    }
    const handleSortChange = (sortBy) => {
        setDefaultFilter(prevFilter => {

            // Fetch new manga based on updated filters
            return {
                ...prevFilter,
                sortBy: sortBy
            };
        });
    }
    const handlePageChange = (page) => {
        setDefaultFilter(prev => ({
            ...prev,
            page: page
        }));
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
            users,
            mangaChapters,
            authors,
            status,
            loading,
            totalPages,
            currentPage,
            handlePageChange,
            getAllCategories,
            setFilterFromHome,
            // getAllManga,
            getMangaById,
            getChapterOfManga,
            getManga,
            handleCategoryChange,
            // getAllUser,
            defaultf,
            fetchChapterForAll,
            handleStatusChange,
            getAllStatus,
            getAllAuthor,
            handleSortChange
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