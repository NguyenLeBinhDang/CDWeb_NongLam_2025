import './Admin.css';
import {useEffect, useState} from 'react';
import {Box, Button, Stack} from '@mui/material';
import {Outlet, useNavigate, useLocation} from 'react-router-dom';
import {useUser} from "../context/UserContext";

const Admin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {user, loading} = useUser();

    const activeButton = location.pathname.split('/').pop(); // No local state needed

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <Box className="admin-container">
            <Box sx={{
                p: 2,
                backgroundColor: '#555',
                boxShadow: 1,
                position: 'sticky',
                top: 0,
                zIndex: 998
            }}>
                <Stack direction="row" spacing={2}>
                    <Button
                        variant={activeButton === 'manga-management' ? 'contained' : 'outlined'}
                        onClick={() => handleNavigation('/admin/manga-management')}
                    >
                        Manga Management
                    </Button>
                    <Button
                        variant={activeButton === 'user-management' ? 'contained' : 'outlined'}
                        onClick={() => handleNavigation('/admin/user-management')}
                    >
                        User Management
                    </Button>
                    <Button
                        variant={activeButton === 'button3' ? 'contained' : 'outlined'}
                        onClick={() => handleNavigation('/admin/button3')}
                    >
                        Button 3
                    </Button>
                </Stack>
            </Box>

            <Box>
                <Outlet/>
            </Box>
        </Box>
    );
};


export default Admin;
