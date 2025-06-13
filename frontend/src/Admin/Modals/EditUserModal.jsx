import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Typography, FormControlLabel, Checkbox, InputLabel, Select, MenuItem } from '@mui/material';

const EditUserModal = ({ open, handleClose, user, onSave, onChangeAvatar }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        password: '',
        roleId: '',
        isActive: false
    });
    const [avatarFile, setAvatarFile] = useState(null);

    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.fullName || '',
                password: '',
                roleId: user.role?.role_Id || '',
                isActive: user.isActive
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleAvatarChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setAvatarFile(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        await onSave(user.id, formData);
        if (avatarFile) {
            await onChangeAvatar(user.id, avatarFile);
        }
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box className="user-modal">
                <Typography variant="h6">Chỉnh sửa thông tin người dùng</Typography>

                <TextField
                    label="Họ tên"
                    name="fullName"
                    fullWidth
                    margin="normal"
                    value={formData.fullName}
                    onChange={handleChange}
                />

                <TextField
                    label="Email"
                    name="email"
                    fullWidth
                    margin="normal"
                    value={user?.email || ''}
                    disabled // Không được chỉnh sửa email
                />

                <TextField
                    label="Mật khẩu mới (nếu đổi)"
                    name="password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={formData.password}
                    onChange={handleChange}
                />

                <InputLabel id="role-label">Vai trò</InputLabel>
                <Select
                    labelId="role-label"
                    name="roleId"
                    value={formData.roleId}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                >
                    <MenuItem value={1}>ADMIN</MenuItem>
                    <MenuItem value={2}>MOD</MenuItem>
                    <MenuItem value={0}>USER</MenuItem>
                </Select>

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={formData.isActive}
                            onChange={handleChange}
                            name="isActive"
                        />
                    }
                    label="Đã kích hoạt"
                />

                <InputLabel sx={{ mt: 2 }}>Avatar (nếu muốn đổi)</InputLabel>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                />

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Lưu</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditUserModal;
