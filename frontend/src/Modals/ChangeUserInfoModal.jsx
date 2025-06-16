import React, {useEffect, useState} from "react";
import {Box, Button, Input, Modal, TextField, Typography} from "@mui/material";
import {useUser} from "../context/UserContext";
import axios from "axios";
import {showErrorDialog, showSuccessDialog} from "../utils/Alert";

const ChangeUserInfoModal = ({open, onClose, user}) => {

    const {updateAvatar, getUserInfo} = useUser();
    const [loading, setLoading] = useState(true);


    const [userFormData, setUserFormData] = useState({
        id: user?.id,
        fullName: user?.fullName,
    })

    const [avatarFile, setAvatarFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(user?.avatarUrl);

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

    const handleChangeName = async (userDTO) => {
        setLoading(true);
        try {
            await axios.put(`http://localhost:8080/api/users/update`, userDTO, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })

            await showSuccessDialog('Thành công','Cập nhật thông tin thành công')

            // setLoading(false);
        } catch (error) {
            setLoading(false);
            const message = error?.response?.data?.message || 'Failed to get comment';
            await showErrorDialog('Lỗi khi chinh sua thong tin nguoi dung', message)
        } finally {
            setLoading(false);
        }
    }

    const handleUpload = async () => {
        if (avatarFile) {
            await updateAvatar(user?.id, avatarFile);
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserFormData({
            ...userFormData,
            [name]: value,
        });

    }

    const handleCloseButton = () => {
        onClose();
    }

    const handleChangeUserInfo = async () => {
        await handleCloseButton();
        await handleUpload();
        await handleChangeName(userFormData);
        await getUserInfo(user?.id);

        setUserFormData((prev) =>({
            ...prev,
            fullName: userFormData.fullName,
        }));
        setAvatarFile('');
        setPreviewImage(user?.avatarUrl);
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'background.paper',
                width: '80%',
                maxWidth: 400,
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
                textAlign: 'center'
            }}>
                <Box>
                    <Typography variant="h6">Nhập tên mới (nếu đổi):</Typography>

                    <TextField
                        label="Tên người dùng"
                        name="fullName"
                        fullWidth
                        value={userFormData.fullName}
                        onChange={handleChange}
                    />


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


                </Box>

                <Box sx={{display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2}}>
                    <Button variant="contained" color="error" onClick={handleCloseButton}>Hủy</Button>
                    <Button variant="contained" color="primary" onClick={handleChangeUserInfo}>Lưu</Button>
                </Box>
            </Box>
        </Modal>
    )
};

export default ChangeUserInfoModal;