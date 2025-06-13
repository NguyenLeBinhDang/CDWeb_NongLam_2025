import React, {useState} from 'react';
import {Modal, Box, Button, Typography, Input} from '@mui/material';
// import './UserModal.css';

const UpdateAvatarModal = ({open, handleClose, userId, onUpload}) => {
    const [avatarFile, setAvatarFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
        }
    }

    const handleUpload = () => {
        if (avatarFile) {
            onUpload(userId, avatarFile);
            handleCloseButton();
        }
    };

    const handleCloseButton = () => {
        setAvatarFile(null);
        setPreviewImage(null);
        handleClose();
    }

    return (
        <Modal open={open} onClose={handleClose}>

            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'background.paper',
                width: '80%',
                maxWidth: 500,
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
            }} className="user-modal">
                <Typography variant="h6">Cập nhật ảnh đại diện</Typography>
                <Input type="file" onChange={handleImageChange} fullWidth sx={{mt: 2}}/>
                {/*<Image> a</Image>*/}
                <Box sx={{
                    width: '100%',
                    position: 'relative',
                    paddingTop: '100%', // Tạo khung vuông
                    border: '2px dashed #ccc',
                    borderRadius: 2,
                    cursor: 'pointer',
                    backgroundColor: '#f9f9f9',
                    overflow: 'hidden',
                }}>
                    {previewImage ? (
                        <Box sx={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            height: '100%',
                            width: '100%',
                            backgroundImage: `url(${previewImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}/>
                    ) : (
                        <Typography
                            variant="body2"
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                color: '#888',
                                textAlign: 'center',
                            }}
                        >
                            Chưa có ảnh xem trước
                        </Typography>
                    )}
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2}}>
                    <Button onClick={handleCloseButton}>Hủy</Button>
                    <Button variant="contained" color="primary" onClick={handleUpload}>Tải lên</Button>
                </Box>
            </Box>

        </Modal>
    );
};

export default UpdateAvatarModal;