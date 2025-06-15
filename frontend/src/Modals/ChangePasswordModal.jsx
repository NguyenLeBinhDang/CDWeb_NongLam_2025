import {Box, Button, Modal, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import {useForgotPassword} from "../context/ForgotPasswordContext";

const ChangePasswordModal = ({open, onClose, email}) => {

    const {changePassword} = useForgotPassword();

    const [changePasswordForm, setChangePasswordForm] = useState({
        email: email,
        oldPassword: '',
        newPassword: '',
    })

    const handleSubmit = async () => {
        const localFormData = {...changePasswordForm};
        handleCloseModal();
        await changePassword(localFormData);
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setChangePasswordForm({
            ...changePasswordForm,
            [name]: value,
        });

        // console.log(changePasswordForm);
    };

    const handleCloseModal = () => {
        setChangePasswordForm({
            oldPassword: '',
            newPassword: '',
        })
        onClose();
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
                    <Typography variant="h6">Nhập mật khẩu cũ:</Typography>

                    <TextField
                        label="Mật khẩu cũ"
                        name="oldPassword"
                        fullWidth
                        value={changePasswordForm.oldPassword}
                        onChange={handleChange}
                    />


                    <Typography variant="h6">Nhập mật khẩu mới:</Typography>

                    <TextField
                        label="Mật khẩu mới"
                        name="newPassword"
                        fullWidth
                        value={changePasswordForm.newPassword}
                        onChange={handleChange}
                    />


                </Box>

                <Box sx={{display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2}}>
                    <Button variant="contained" color="error" onClick={handleCloseModal}>Hủy</Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Lưu</Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default ChangePasswordModal;