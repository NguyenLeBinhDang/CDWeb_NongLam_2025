
import React, { useState } from 'react';
import { Modal, Box, Button, Typography, Input } from '@mui/material';
// import './UserModal.css';

const UpdateAvatarModal = ({ open, handleClose, userId, onUpload }) => {
    const [avatarFile, setAvatarFile] = useState(null);

    const handleFileChange = (e) => {
        setAvatarFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (avatarFile) {
            onUpload(userId, avatarFile);
            handleClose();
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box className="user-modal">
                <Typography variant="h6">Cập nhật ảnh đại diện</Typography>
                <Input type="file" onChange={handleFileChange} fullWidth sx={{ mt: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button variant="contained" color="primary" onClick={handleUpload}>Tải lên</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default UpdateAvatarModal;