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

const EditUserModal = ({open, handleClose, user, onSave, onChangeAvatar}) => {
    const [formData, setFormData] = useState({
        fullName: '',
        password: '',
        roleId: '',
        isActive: false
    });


    const {roles, getAllRole} = useContext(UserContext);

    useEffect(() => {
        const fetchRoles = async () => {
            getAllRole();
        }
        if(roles.length === 0){

            fetchRoles();

        }
    }, []);


    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.fullName || '',
                password: '',
                roleId: user.role?.id || null,
                isActive: user.active
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // const handleAvatarChange = (e) => {
    //     if (e.target.files && e.target.files[0]) {
    //         setAvatarFile(e.target.files[0]);
    //     }
    // };

    const handleSubmit = async () => {
        handleCloseModal();
        await onSave(user.id, formData);
    };

    const handleCloseModal = () => {
        // setFormData({
        //     fullName: '',
        //     password: '',
        //     roleId: '',
        //     isActive: false
        // });
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

                <InputLabel >Vai trò</InputLabel>

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

                {/*<InputLabel sx={{ mt: 2 }}>Avatar (nếu muốn đổi)</InputLabel>*/}
                {/*<input*/}
                {/*    type="file"*/}
                {/*    accept="image/*"*/}
                {/*    onChange={handleAvatarChange}*/}
                {/*/>*/}

                <Box sx={{display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2}}>
                    <Button onClick={handleCloseModal}>Hủy</Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Lưu</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditUserModal;
