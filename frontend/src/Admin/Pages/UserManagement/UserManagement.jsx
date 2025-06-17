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
    MenuItem, TextField,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import "/img.png";
import {useEffect, useState, useContext} from "react";
import EditUserModal from "../../Modals/EditUserModal";
import UpdateAvatarModal from "../../Modals/UpdateAvatarModal";
import {useUser} from "../../../context/UserContext";
import Loading from "../../../components/Loader/Loading";
import AddUserModal from "../../Modals/AddUserModal";
import {showConfirmDialog, showErrorDialog, showSuccessDialog} from "../../../utils/Alert";
import Swal from "sweetalert2";

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
        getAllRole,
        roles,
    } = useUser();
    useEffect(() => {
        const fetchRoles = async () => {
            getAllRole();
        }
        if(roles.length === 0){

            fetchRoles();

        }
    }, []);
    const [userFilter, setUserFilter] = useState('');

    useEffect(() => {
        const fetchAllUser = async () => {
            try {
                await getAllUser(userFilter);
            } catch (error) {
                console.log('Error fetching users:', error);
            }
        };

        fetchAllUser(); // just fetch with current filter
    }, [userFilter]);

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

    // const handleBanUser = async () => {
    //     if (selectedUser) {
    //         try {
    //             const confirm =await showConfirmDialog(`Bạn có chắc chặn ${selectedUser.fullName}`)
    //             if (!confirm.isConfirmed) {
    //                 return;
    //             }
    //             handleClose();
    //             await banUser(selectedUser.id);
    //             await showSuccessDialog("Ban thành công")
    //             await getAllUser(); // Refresh list after operation
    //         } catch (error) {
    //
    //         }
    //     }
    // };
    const handleBanUser = async () => {
        if (!selectedUser) return;
        const action = selectedUser.isActive ? "Khóa" : "Mở khóa";
        const result = await showConfirmDialog(`${action} người dùng này?`);

        if (result.isConfirmed) {
            try {
                handleClose();
                await banUser(selectedUser.id);
                await showSuccessDialog(`${action} thành công`);
            }catch (error){
                await showErrorDialog(error?.response?.data?.message);
            }

        }
    };
    // const handleChangeRole = async () => {
    //     if (selectedUser) {
    //         try {
    //             const newRoleId = selectedUser.role.id === 1 ? 2 : 1;
    //             handleClose();
    //             await changeUserRole(selectedUser.id, newRoleId);
    //             await getAllUser(); // Refresh list after operation
    //         } catch (error) {
    //             console.error('Error changing role:', error);
    //         }
    //     }
    // };
    const handleChangeRole = async () => {
        if (!selectedUser || !roles.length) return;

        const roleOptions = roles.reduce((acc, role) => {
            acc[role.id] = role.role_name;
            return acc;
        }, {});
        const { value: selectedRoleId } = await Swal.fire({
            title: "Chọn vai trò mới",
            input: "select",
            inputOptions: roleOptions,
            inputPlaceholder: "Chọn vai trò",
            showCancelButton: true,
            confirmButtonText: "Xác nhận",
            cancelButtonText: "Hủy"
        });

        if (selectedRoleId) {
            try {
            await changeUserRole(selectedUser.id, Number(selectedRoleId));
            // await showSuccessDialog("Cập nhật vai trò thành công");
            }
            catch (error) {
                await showErrorDialog(error?.response?.data?.message || "Lỗi khi thay đổi role");
            }
        }
    };
    const handleAddUserClick = () => {
        setOpenAddUserModal(true);
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

    const handleSearchUser = async (e) => {
        setUserFilter(e.target.value);
    }

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
            <Box
                sx={{
                    display: 'flex',
                    mb: 2,
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <Typography variant="h4" sx={{color: '#fff'}}>
                    Danh sách người dùng
                </Typography>

                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                    <TextField
                        // label="Tìm kiếm người dùng"
                        size="small" // Ensures it matches the button height
                        sx={{backgroundColor: '#fff', borderRadius: 1}}
                        placeholder="Nhập tên người dùng"
                        onChange={handleSearchUser}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddUserClick}
                        sx={{height: '40px'}}
                    >
                        Thêm User
                    </Button>
                </Box>
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
                <MenuItem onClick={handleBanUser}>
                    {selectedUser?.active ? 'Khóa' : 'Mở khóa'}
                </MenuItem>
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