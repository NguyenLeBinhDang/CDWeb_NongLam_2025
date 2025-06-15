import React, { useState, useEffect, useContext } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, FormControl, Autocomplete, Chip, Select, InputLabel, MenuItem
} from '@mui/material';
import axios from 'axios';
import { showSuccessDialog, showErrorDialog } from '../../utils/Alert';
import { FilterContext } from '../../context/FilterContext';
import Loading from "../../components/Loader/Loading";

const AddMangaModal = ({ open, onClose, onSuccess, isEdit = false, defaultData = {} }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        coverImg: null,          // file
        authorName: '',
        statusId: '',
        categoryIds: []
    });

    const { getAllCategories, getAllAuthor, getAllStatus, status, authors, categories } = useContext(FilterContext);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (open) {
            getAllCategories();
            getAllAuthor();
            getAllStatus();

            // nếu chỉnh sửa thì gán giá trị ban đầu
            if (isEdit) {
                setFormData({
                    name: defaultData.name || '',
                    description: defaultData.description || '',
                    coverImg: null, // chỉ cập nhật nếu chọn lại ảnh
                    authorName: defaultData.id_author?.author_name || '',
                    statusId: defaultData.id_status?.id || '',
                    categoryIds: defaultData.id_category?.map(cat => cat.id) || []
                });

            }
        }
    }, [open, isEdit]);

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
            if (formData.coverImg) {
                data.append("coverImg", formData.coverImg);
            }
            data.append("authorName", formData.authorName);
            data.append("statusId", formData.statusId);
            formData.categoryIds.forEach(id => data.append("categoryIds", id));
            onClose();
            setLoading(true);

            if (isEdit && defaultData?.id) {
                setLoading(false);
                await axios.put(`http://localhost:8080/api/manga/${defaultData.id}`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setLoading(false);
                await showSuccessDialog("Thành công", "Đã cập nhật truyện!");
            } else {

                await axios.post('http://localhost:8080/api/manga', data, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setLoading(false);
                await showSuccessDialog("Thành công", "Đã thêm truyện!");
            }



            onSuccess?.();
        } catch (error) {
            setLoading(false);
            const msg = error?.response?.data?.message || "Xử lý thất bại";
            await showErrorDialog("Lỗi", msg);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            {loading && <Loading size="large" />}
            <DialogTitle>{isEdit ? "Chỉnh sửa truyện" : "Thêm truyện mới"}</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Tên truyện" name="name" value={formData.name} onChange={handleChange} fullWidth />
                <TextField label="Mô tả" name="description" value={formData.description} onChange={handleChange} fullWidth multiline rows={4} />

                <Button variant="outlined" component="label">
                    {formData.coverImg ? formData.coverImg.name : "Chọn ảnh bìa"}
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
                    <InputLabel id="status-label">Trạng thái</InputLabel>
                    <Select
                        labelId="status-label"
                        label="Trạng thái"
                        name="statusId"
                        value={formData.statusId}
                        onChange={handleChange}
                    >
                        {status.map((s) => (
                            <MenuItem key={s.id} value={s.id}>
                                {s.status_name}
                            </MenuItem>
                        ))}
                    </Select>
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
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    {isEdit ? "Cập nhật" : "Thêm"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddMangaModal;
