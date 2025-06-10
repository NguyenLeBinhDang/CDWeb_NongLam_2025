import {Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {useFilter} from "../../../context/FilterContext";
import {useEffect} from "react";

const UserManagement = () => {
    const {users, getAllUser} = useFilter();

    useEffect(() => {
        const fetchUsers = async () => {
            await getAllUser();
        }
        fetchUsers();
    }, []);

    // Table cell styles
    const tableCellStyle = {
        whiteSpace: 'normal',
        backgroundColor: '#fff',
        wordWrap: 'break-word',
        maxWidth: '80%', // Adjust this value as needed
        padding: '12px 16px',
        borderBottom: '1px solid rgba(224, 224, 224, 1)'
    };

    // Table header styles
    const tableHeaderStyle = {
        fontWeight: 'bold',
        // backgroundColor: '#ddd',
        position: 'sticky',
        top: 0,
        zIndex: 1,
        // ...tableCellStyle
    };

    return (
        <>
            <Box sx={{backgroundColor: '#666', padding: 3, minHeight: '100vh'}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 2}}>
                    <Typography variant="h4">Danh sách người dùng</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        // onClick={handleAddUser}
                    >
                        Thêm User
                    </Button>
                </Box>
                {/*user table*/}
                <TableContainer sx={{maxHeight: 'calc(100vh - 200px)', overflowY: 'auto', backgroundColor: '#666'}}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={tableHeaderStyle}>UserID</TableCell>
                                <TableCell sx={tableHeaderStyle}>Email</TableCell>
                                <TableCell sx={tableHeaderStyle}>FullName</TableCell>
                                <TableCell sx={tableHeaderStyle}>Status</TableCell>
                                <TableCell sx={tableHeaderStyle}>Role</TableCell>
                                <TableCell sx={tableHeaderStyle}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users
                                // .slice((page - 1) * resultsPerPage, page * resultsPerPage)
                                .map((user) => (
                                    <TableRow key={user.id} hover>
                                        <TableCell sx={tableCellStyle}>{user.id}</TableCell>
                                        <TableCell sx={tableCellStyle}>{user.email}</TableCell>
                                        <TableCell sx={tableCellStyle}>{user.fullName}</TableCell>
                                        <TableCell sx={tableCellStyle}>{user.isActive}</TableCell>
                                        <TableCell sx={tableCellStyle}>{user.role}</TableCell>
                                        <TableCell sx={tableCellStyle}>temp</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );

}

export default UserManagement;