import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    IconButton,
    Menu,
    MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import "/img.png";
import {useEffect, useState, useContext} from "react";
import EditUserModal from "../../Modals/EditUserModal";
import UpdateAvatarModal from "../../Modals/UpdateAvatarModal";
import {useUser} from "../../../context/UserContext";
import Loading from "../../../components/Loader/Loading";
import AddUserModal from "../../Modals/AddUserModal";

const UserManagement = () => {
    const {
        users,
        getAllUser,
        editUserByAdmin,
        updateAvatar,
        banUser,
        changeUserRole,
        loading,
        addUser,
    } = useUser();

    useEffect(() => {
        const fetchAllUser = async () => {
            try {
                await getAllUser();
            } catch (error) {
                console.log('Error fetching users:', error);
            }
        }
        if (users.length === null || users.length === 0) {
            fetchAllUser();
        }
    }, []);

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openAvatarModal, setOpenAvatarModal] = useState(false);
    const [openAddUserModal, setOpenAddUserModal] = useState(false);

    const handleMenuClick = (event, user) => {
        setAnchorEl(event.currentTarget);
        setSelectedUser(user);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenEditModal = () => {
        setOpenEditModal(true);
        handleClose();
    };

    const handleOpenAvatarModal = () => {
        setOpenAvatarModal(true);
        handleClose();
    };

    const handleBanUser = async () => {
        if (selectedUser) {
            try {
                handleClose();
                await banUser(selectedUser.id);
                await getAllUser(); // Refresh list after operation
            } catch (error) {
                console.error('Error banning user:', error);
            }
        }
    };

    const handleChangeRole = async () => {
        if (selectedUser) {
            try {
                const newRoleId = selectedUser.role.id === 1 ? 2 : 1;
                handleClose();
                await changeUserRole(selectedUser.id, newRoleId);
                await getAllUser(); // Refresh list after operation
            } catch (error) {
                console.error('Error changing role:', error);
            }
        }
    };

    const handleAddUserClick = () => {
        setOpenAddUserModal(true);
    }

    const handleAddUser = async (data) => {
        await addUser(data);
    }

    const handleSaveEdit = async (userId, data) => {
        try {
            await editUserByAdmin(userId, data);
            await getAllUser(); // Refresh list after operation
        } catch (error) {
            console.error('Error editing user:', error);
        }
    };

    const handleUploadAvatar = async (userId, file) => {
        await updateAvatar(userId, file);
    };

    const tableCellStyle = {
        whiteSpace: 'normal',
        backgroundColor: '#fff',
        wordWrap: 'break-word',
        maxWidth: '100%',
        padding: '12px 16px',
        borderBottom: '1px solid rgba(224, 224, 224, 1)',
        zIndex: 1,
    };

    const tableHeaderStyle = {
        fontWeight: 'bold',
        width: '10%',
        position: 'sticky',
        top: 0,
        zIndex: 2,
        backgroundColor: '#f4f4f4',
    };

    return (
        <Box sx={{backgroundColor: '#666', padding: 3, minHeight: '100vh'}}>
            {loading && <Loading/>}
            <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 2}}>
                <Typography variant="h4" sx={{color: '#fff'}}>Danh sách người dùng</Typography>
                <Button variant="contained" color="primary" onClick={handleAddUserClick}>Thêm User</Button>
            </Box>

            <TableContainer sx={{maxHeight: 'calc(100vh - 200px)', overflowY: 'auto'}}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={tableHeaderStyle}>UserID</TableCell>
                            <TableCell sx={tableHeaderStyle}>Avatar</TableCell>
                            <TableCell sx={tableHeaderStyle}>Email</TableCell>
                            <TableCell sx={tableHeaderStyle}>FullName</TableCell>
                            <TableCell sx={tableHeaderStyle}>Status</TableCell>
                            <TableCell sx={tableHeaderStyle}>Role</TableCell>
                            <TableCell sx={tableHeaderStyle}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id} hover>
                                <TableCell sx={tableCellStyle}>{user.id}</TableCell>
                                <TableCell sx={tableCellStyle}>
                                    <img
                                        src={user.avatarUrl || '/img.png'}
                                        alt="avatar"
                                        style={{width: 40, height: 40, borderRadius: '50%', objectFit: 'cover'}}
                                    />
                                </TableCell>
                                <TableCell sx={tableCellStyle}>{user.email}</TableCell>
                                <TableCell sx={tableCellStyle}>{user.fullName}</TableCell>
                                <TableCell sx={tableCellStyle}>{user.active ? 'Hoạt động' : 'Bị khóa'}</TableCell>
                                <TableCell sx={tableCellStyle}>{user.role.role_name}</TableCell>
                                <TableCell sx={tableCellStyle}>
                                    <IconButton onClick={(e) => handleMenuClick(e, user)}>
                                        <MoreVertIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handleOpenEditModal}>Chỉnh sửa thông tin</MenuItem>
                <MenuItem onClick={handleOpenAvatarModal}>Cập nhật avatar</MenuItem>
                <MenuItem onClick={handleBanUser}>Ban</MenuItem>
                <MenuItem onClick={handleChangeRole}>Thay đổi role</MenuItem>
            </Menu>

            <EditUserModal
                open={openEditModal}
                handleClose={() => setOpenEditModal(false)}
                user={selectedUser}
                onSave={editUserByAdmin}       // function gọi API PUT /admin-edit
            />

            <UpdateAvatarModal
                open={openAvatarModal}
                handleClose={() => setOpenAvatarModal(false)}
                userId={selectedUser?.id}
                onUpload={handleUploadAvatar}
            />

            <AddUserModal
                open={openAddUserModal}
                handleClose={() => setOpenAddUserModal(false)}
                onSave={addUser} // function gọi API POST /users
                onUpload={handleUploadAvatar} // function gọi API POST /users/avatar
            />
        </Box>
    );
};

export default UserManagement;