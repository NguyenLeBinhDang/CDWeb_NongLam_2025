import React, { useState, useEffect, useContext } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, FormControl, Autocomplete, Chip
} from '@mui/material';
import axios from 'axios';
import { showSuccessDialog, showErrorDialog } from '../../utils/Alert';
import { FilterContext } from '../../context/FilterContext';

const AddMangaModal = ({ open, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        coverImg: null,
        authorName: '', // dùng name thay vì id
        statusId: '',
        categoryIds: []
    });

    const { getAllCategories, getAllAuthor, getAllStatus, status, authors, categories } = useContext(FilterContext);

    useEffect(() => {
        if (open) {
            getAllCategories();
            getAllAuthor();
            getAllStatus();
        }
    }, [open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            coverImg: e.target.files[0]
        }));
    };

    const handleSubmit = async () => {
        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("description", formData.description);
            data.append("coverImg", formData.coverImg);
            data.append("authorName", formData.authorName); // gửi name thay vì id
            data.append("statusId", formData.statusId);
            formData.categoryIds.forEach(id => data.append("categoryIds", id));

            await axios.post('http://localhost:8080/api/manga', data, {
                headers: {
                    // "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${localStorage.getItem("token")}`}

            });

            showSuccessDialog("Thành công", "Đã thêm truyện!");
            onSuccess();
            onClose();
        } catch (error) {
            const msg = error?.response?.data?.message || "Thêm truyện thất bại";
            showErrorDialog("Lỗi", msg);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Thêm truyện mới</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Tên truyện" name="name" value={formData.name} onChange={handleChange} fullWidth />
                <TextField label="Mô tả" name="description" value={formData.description} onChange={handleChange} fullWidth multiline rows={4} />

                <Button variant="outlined" component="label">
                    Ảnh bìa
                    <input type="file" hidden onChange={handleFileChange} accept="image/*" />
                </Button>

                <Autocomplete
                    freeSolo
                    options={authors.map(a => a.author_name)}
                    value={formData.authorName}
                    onInputChange={(event, newValue) => {
                        setFormData(prev => ({ ...prev, authorName: newValue }));
                    }}
                    renderInput={(params) => <TextField {...params} label="Tác giả" />}
                />

                <FormControl fullWidth>
                    <TextField
                        select
                        label="Trạng thái"
                        name="statusId"
                        value={formData.statusId}
                        onChange={handleChange}
                    >
                        {status.map(s => (
                            <option key={s.id} value={s.id}>{s.status_name}</option>
                        ))}
                    </TextField>
                </FormControl>

                <Autocomplete
                    multiple
                    options={categories}
                    getOptionLabel={(option) => option.category_name}
                    value={categories.filter(cat => formData.categoryIds.includes(cat.id))}
                    onChange={(e, newValue) => {
                        setFormData(prev => ({
                            ...prev,
                            categoryIds: newValue.map(c => c.id)
                        }));
                    }}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip
                                label={option.category_name}
                                {...getTagProps({ index })}
                                key={option.id}
                            />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField {...params} variant="outlined" label="Thể loại" />
                    )}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Hủy</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">Thêm</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddMangaModal;
