import React from 'react';
import {Box, Typography} from '@mui/material';
import {keyframes} from '@emotion/react';

// Rainbow color keyframes
const rainbow = keyframes`
    0% {
        color: red;
    }
    16% {
        color: orange;
    }
    33% {
        color: yellow;
    }
    50% {
        color: green;
    }
    66% {
        color: blue;
    }
    83% {
        color: indigo;
    }
    100% {
        color: violet;
    }
`;

const AdminWelcome = () => {
    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: '#333' // optional for contrast
            }}
        >
            <Typography
                variant="h1"

                sx={{
                    fontWeight: 'bold',
                    animation: `${rainbow} 5s linear infinite`,
                    fontFamily: 'Droid Sans',
                }}
            >
                Welcome to Admin
            </Typography>
        </Box>
    );
};

export default AdminWelcome;