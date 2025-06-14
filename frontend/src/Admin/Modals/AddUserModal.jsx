import React, {useState, useEffect, useContext} from 'react';
import {
    Modal,
    Box,
    TextField,
    Button,
    Typography,
    FormControlLabel,
    Checkbox,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import {UserContext} from "../../context/UserContext";

const AddUserModal = ({open, handleClose, onSave}) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        // avatar: '',
        password: '',
        roleId: '',
        isActive: false
    });
    const {roles, getAllRole} = useContext(UserContext);


    useEffect(() => {
        const fetchRoles = async () => {
            getAllRole();
        }
        if (roles.length === 0) {

            fetchRoles();

        }
    }, []);

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async () => {
        const dataToSave = {...formData}; // Create a shallow copy
        handleCloseModal(); // Close the modal early
        await onSave(dataToSave); // Pass the copy instead of formData directly
    };

    const handleCloseModal = () => {
        setFormData({
            username: '',
            email: '',
            // avatar: '',
            password: '',
            roleId: '',
            isActive: false
        });
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
                <Typography variant="h6">Thêm người dùng mới</Typography>

                <TextField
                    label="Họ tên"
                    name="username"
                    fullWidth
                    margin="normal"
                    value={formData.username}
                    onChange={handleChange}
                />

                <TextField
                    label="Email"
                    name="email"
                    fullWidth
                    margin="normal"
                    value={formData.email || ''}
                    onChange={handleChange}
                    // disabled // Không được chỉnh sửa email
                />

                <TextField
                    label="Mật khẩu"
                    name="password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={formData.password}
                    onChange={handleChange}
                />

                <InputLabel>Vai trò</InputLabel>

                <Select
                    labelId="role-label"
                    name="roleId"
                    value={formData.roleId}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                    variant='outlined'>
                    {roles.map(role => (
                        <MenuItem key={role.id} value={role.id}>
                            {role.role_name}
                        </MenuItem>
                    ))}
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

                {/*<InputLabel sx={{mt: 2}}>Avatar (nếu muốn đổi)</InputLabel>*/}
                {/*<input*/}
                {/*    name="avatar"*/}
                {/*    type="file"*/}
                {/*    accept="image/*"*/}
                {/*    onChange={handleImageChange}*/}
                {/*/>*/}
                {/*<Box sx={{*/}
                {/*    width: '100%',*/}
                {/*    position: 'relative',*/}
                {/*    paddingTop: '100%', // Tạo khung vuông*/}
                {/*    border: '2px dashed #ccc',*/}
                {/*    borderRadius: 2,*/}
                {/*    cursor: 'pointer',*/}
                {/*    backgroundColor: '#f9f9f9',*/}
                {/*    overflow: 'hidden',*/}
                {/*}}>*/}
                {/*    {previewImage ? (*/}
                {/*        <Box sx={{*/}
                {/*            position: 'absolute',*/}
                {/*            top: '0',*/}
                {/*            left: '0',*/}
                {/*            height: '100%',*/}
                {/*            width: '100%',*/}
                {/*            backgroundImage: `url(${previewImage})`,*/}
                {/*            backgroundSize: 'cover',*/}
                {/*            backgroundPosition: 'center',*/}
                {/*        }}/>*/}
                {/*    ) : (*/}
                {/*        <Typography*/}
                {/*            variant="body2"*/}
                {/*            sx={{*/}
                {/*                position: 'absolute',*/}
                {/*                top: '50%',*/}
                {/*                left: '50%',*/}
                {/*                transform: 'translate(-50%, -50%)',*/}
                {/*                color: '#888',*/}
                {/*                textAlign: 'center',*/}
                {/*            }}*/}
                {/*        >*/}
                {/*            Chưa có ảnh xem trước*/}
                {/*        </Typography>*/}
                {/*    )}*/}
                {/*</Box>*/}

                <Box sx={{display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2}}>
                    <Button onClick={handleCloseModal}>Hủy</Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Lưu</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddUserModal;
