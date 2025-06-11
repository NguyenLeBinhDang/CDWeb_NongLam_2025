import React, {useEffect, useState} from 'react';
import {useFilter} from '../../../context/FilterContext';
import MangaCard from '../../../components/MangaCard/mangaCard';
import {Grid, Pagination, Box, Button} from '@mui/material';
import FilterSidebar from "../../../components/FilterSidebar";

const MangaManagement = () => {
    const {mangaList, getAllManga, defaultFilter, getManga, setFilterFromHome} = useFilter();
    const [currentPage, setCurrentPage] = useState(1);
    const mangaPerPage = 8;

    useEffect(() => {
        getManga(defaultFilter);
    }, [defaultFilter]);

    useEffect(() => {
        const newFilter = {
            search: '',
            categoryIds: [],
            statusId: null,
            authorId: null
        }
        setFilterFromHome(newFilter);
    }, []);

    const indexOfLastManga = currentPage * mangaPerPage;
    const indexOfFirstManga = indexOfLastManga - mangaPerPage;
    const currentManga = mangaList.slice(indexOfFirstManga, indexOfLastManga);
    const totalPages = Math.ceil(mangaList.length / mangaPerPage);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <>
            <Box sx={{backgroundColor: '#666', padding: 3, minHeight: '100vh'}}>
                {/*manga management*/}
                <Box sx={{backgroundColor: '#666', padding: 3, borderRadius: 2, display: 'flex'}}>
                    <Button sx={{flexGrow: 1}} variant="contained" color="primary"
                            startIcon={<i className="fas fa-plus"></i>}>
                        <span className="material-icons">Thêm truyện</span>
                    </Button>

                    <Button sx={{flexGrow: 1}} variant="contained" color="error"
                            startIcon={<i className="fas fa-trash-alt"></i>}>
                        <span className="material-icons">Xóa truyện</span>
                    </Button>
                </Box>
                <Box sx={{display: 'flex', gap: 3, mt: 2}}>
                    {/* Manga grid column */}
                    <Box sx={{flexGrow: 1}}>
                        <Grid container spacing={3}>
                            {currentManga.map((manga) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={manga.id}>
                                    <MangaCard manga={manga} type="admin"/>
                                </Grid>
                            ))}
                        </Grid>
                        {/*Pagination*/}
                        <Box sx={{display: 'flex', justifyContent: 'center', mt: 4, mb: 2}}>
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={handlePageChange}
                                color="primary"
                                size="large"
                            />
                        </Box>
                    </Box>

                    {/* Sidebar column */}
                    <Box sx={{minWidth: 250}}>
                        <FilterSidebar filters={defaultFilter} onFilterChange={getManga}/>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default MangaManagement; 