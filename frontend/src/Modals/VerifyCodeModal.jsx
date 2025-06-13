import React, {useRef, useState} from 'react';
import {Modal, Box, Typography, TextField, Button} from '@mui/material';
import {useForgotPassword} from "../context/ForgotPasswordContext";

const VerificationModal = ({isOpen, onClose, email}) => {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);
    const {verifyCode} = useForgotPassword();

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (!/^[0-9a-zA-Z]?$/.test(value)) return; // only alphanumerics or empty

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Move to next box if filled
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const onSubmit = () => {
        const fullCode = code.join('');
        verifyCode(email, fullCode);
        onClose();
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
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
                <Typography variant="h4" gutterBottom>Mã xác thực</Typography>
                <Typography variant="h6" gutterBottom>Mã xác thực đã gửi tới email</Typography>

                <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 1, mb: 2}}>
                    {code.map((char, idx) => (
                        <TextField
                            key={idx}
                            inputRef={(el) => inputRefs.current[idx] = el}
                            value={char}
                            onChange={(e) => handleChange(e, idx)}
                            onKeyDown={(e) => handleKeyDown(e, idx)}
                            placeholder="_"
                            inputProps={{maxLength: 1, style: {textAlign: 'center', fontSize: 24}}}
                            sx={{width: 40}}
                        />
                    ))}
                </Box>
                <Button variant="contained" color="primary" onClick={onSubmit}>
                    Xác thực
                </Button>
            </Box>
        </Modal>
    );
};

export default VerificationModal;
