import React, {useEffect, useState} from 'react';
import {useFilter} from '../../../context/FilterContext';
import MangaCard from '../../../components/MangaCard/mangaCard';
import {Grid, Pagination, Box, Button} from '@mui/material';
import FilterSidebar from "../../../components/FilterSidebar";
import AddMangaModal from "../../Modals/AddMangaModal";
const MangaManagement = () => {
    const {mangaList,  defaultFilter, getManga, setFilterFromHome, totalPages, currentPage} = useFilter();
    const [openAddManga, setOpenAddManga] = useState(false);
    useEffect(() => {
        getManga(defaultFilter);
    }, [defaultFilter]);

    // useEffect(() => {
    //     const newFilter = {
    //         search: '',
    //         categoryIds: [],
    //         statusId: null,
    //         authorId: null,
    //         sortBy: 'latest',
    //     }
    //     setFilterFromHome(newFilter);
    //     getManga(newFilter);
    // }, []);

    const handlePageChange = (event, value) => {
        const zeroBasedPage = value - 1;
        setFilterFromHome({
            ...defaultFilter,
            page: zeroBasedPage
        });
        getManga({
            ...defaultFilter,
            page: zeroBasedPage
        });
    };

    const handleOpenAdd = () => setOpenAddManga(true);
    const handleCloseAdd = () => setOpenAddManga(false);
    const handleAddSuccess = () => {
        getManga(defaultFilter); // refresh list
    };

    return (
        <>
            {/*<Box sx={{backgroundColor: '#666', padding: 3, minHeight: '100vh'}}>*/}
                {/*manga management*/}
                <Box sx={{ backgroundColor: '#666', padding: 3, minHeight: '100vh' }}>
                    <Box sx={{ backgroundColor: '#666', padding: 3, borderRadius: 2, display: 'flex' }}>
                        <Button sx={{ flexGrow: 1 }} variant="contained" color="primary"
                                startIcon={<i className="fas fa-plus"></i>} onClick={handleOpenAdd}>
                            Thêm truyện
                        </Button>

                        <Button sx={{ flexGrow: 1 }} variant="contained" color="error"
                                startIcon={<i className="fas fa-trash-alt"></i>}>
                            Xóa truyện
                        </Button>
                    </Box>
                <Box sx={{display: 'flex', gap: 3, mt: 2}}>
                    {/* Manga grid column */}
                    <Box sx={{flexGrow: 1}}>
                        <Grid container spacing={3}>
                            {mangaList.map((manga) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={manga.id}>
                                    <MangaCard manga={manga} type="admin" onReload={handleAddSuccess} />
                                </Grid>
                            ))}
                        </Grid>
                        {/*Pagination*/}
                        <Box sx={{display: 'flex', justifyContent: 'center', mt: 4, mb: 2}}>
                            <Pagination
                                count={totalPages}
                                page={currentPage + 1} // vì API trả page 0-based
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
            <AddMangaModal open={openAddManga} onClose={handleCloseAdd} onSuccess={handleAddSuccess} />
        </>
    );
};

export default MangaManagement; 