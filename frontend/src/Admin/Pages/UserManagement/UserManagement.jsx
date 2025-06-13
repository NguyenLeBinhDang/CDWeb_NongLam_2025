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
    // MoreVertIcon
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {useEffect, useState, useContext} from "react";
import EditUserModal from "../../Modals/EditUserModal";
import UpdateAvatarModal from "../../Modals/UpdateAvatarModal";
import {UserContext} from "../../../context/UserContext";
import Loading from "../../../components/Loader/Loading";

const UserManagement = () => {
    const {
        users,
        getAllUser,
        editUserByAdmin,
        updateAvatar,
        banUser,
        changeUserRole,
        loading,
    } = useContext(UserContext);

    useEffect(() => {
        getAllUser(localStorage.getItem("token"));
    }, []);

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openAvatarModal, setOpenAvatarModal] = useState(false);

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
            await banUser(selectedUser.id);
            handleClose();
        }
    };

    const handleChangeRole = async () => {
        if (selectedUser) {
            const newRoleId = selectedUser.role.id === 1 ? 2 : 1; // ví dụ đổi role: 1 <=> 2
            await changeUserRole(selectedUser.id, newRoleId);
            handleClose();
        }
    };

    const handleSaveEdit = async (userId, data) => {
        await editUserByAdmin(userId, data);
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
                <Button variant="contained" color="primary">Thêm User</Button>
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
                                        src={"http://localhost:8080" + user.avatarUrl || null}
                                        alt="avatar"
                                        style={{width: 40, height: 40, borderRadius: '50%', objectFit: 'cover'}}
                                    />
                                </TableCell>
                                <TableCell sx={tableCellStyle}>{user.email}</TableCell>
                                <TableCell sx={tableCellStyle}>{user.fullName}</TableCell>
                                <TableCell sx={tableCellStyle}>{user.isActive ? 'Hoạt động' : 'Bị khóa'}</TableCell>
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
                handleClose={handleClose}
                user={selectedUser}
                onSave={editUserByAdmin}       // function gọi API PUT /admin-edit
                onChangeAvatar={updateAvatar}  // function POST avatar
            />

            <UpdateAvatarModal
                open={openAvatarModal}
                handleClose={() => setOpenAvatarModal(false)}
                userId={selectedUser?.id}
                onUpload={handleUploadAvatar}
            />
        </Box>
    );
};

export default UserManagement;
