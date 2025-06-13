import {Box, Button, Modal, Typography} from "@mui/material";
import React from "react";

const ChangePasswordModal = ({open, onClose, email}) => {

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
                    <Typography variant="h6">Nhập mật khẩu cũ:</Typography>

                    <Typography variant="h6">Nhập mật khẩu mới:</Typography>


                </Box>

                <Box sx={{display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2}}>
                    <Button variant="contained" color="error" onClick={onClose}>Hủy</Button>
                    <Button variant="contained" color="primary">Lưu</Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default ChangePasswordModal;