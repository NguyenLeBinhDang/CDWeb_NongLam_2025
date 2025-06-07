import './Admin.css';
import { useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const Admin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeButton, setActiveButton] = useState('manga');

    const handleNavigation = (path) => {
        navigate(path);
        setActiveButton(path.split('/').pop());
    };

    return (
        <Box className="admin-container">
            {/* Persistent Header */}
            <Box sx={{ 
                p: 2, 
                backgroundColor: '#fff',
                boxShadow: 1,
                position: 'sticky',
                top: 0,
                zIndex: 1000
            }}>
                <Stack direction="row" spacing={2}>
                    <Button 
                        variant={location.pathname.includes('manga-management') ? 'contained' : 'outlined'}
                        onClick={() => handleNavigation('/admin/manga-management')}
                    >
                        Manga Management
                    </Button>
                    <Button 
                        variant={location.pathname.includes('button2') ? 'contained' : 'outlined'}
                        onClick={() => handleNavigation('/admin/button2')}
                    >
                        Button 2
                    </Button>
                    <Button 
                        variant={location.pathname.includes('button3') ? 'contained' : 'outlined'}
                        onClick={() => handleNavigation('/admin/button3')}
                    >
                        Button 3
                    </Button>
                </Stack>
            </Box>

            {/* Content Area */}
            <Box sx={{ p: 2 }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default Admin;
