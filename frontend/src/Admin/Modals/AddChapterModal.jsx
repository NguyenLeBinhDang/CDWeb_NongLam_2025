import React, {useState} from 'react';
import axios from 'axios';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography,
    Box,
    IconButton
} from '@mui/material';
import {DndContext, closestCenter, PointerSensor, useSensor, useSensors} from '@dnd-kit/core';
import {arrayMove, SortableContext, useSortable, verticalListSortingStrategy} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import DeleteIcon from '@mui/icons-material/Delete';
import {showErrorDialog, showSuccessDialog} from "../../utils/Alert";
import Loading from "../../components/Loader/Loading";
import {useFilter} from "../../context/FilterContext";


const SortableImageItem = ({id, file, index, removeFile}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        display: 'flex',
        alignItems: 'center',
        marginBottom: 12,
        padding: 8,
        border: '1px solid #ddd',
        borderRadius: 8,
        background: '#f9f9f9',
    };

    return (
        <Box ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <img
                src={URL.createObjectURL(file)}
                alt={`page-${index}`}
                style={{width: 80, height: 80, objectFit: 'cover', marginRight: 12, borderRadius: 4}}
            />
            <Typography sx={{flexGrow: 1}}>{file.name}</Typography>
            <IconButton onClick={() => removeFile(index)} color="error">
                <DeleteIcon/>
            </IconButton>
        </Box>
    );
};

const AddChapterModal = ({mangaId, onClose}) => {
    const [chapterName, setChapterName] = useState('');
    const [chapterNumber, setChapterNumber] = useState('');
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(false);
    // const { getChapterOfManga } = useFilter();
    const sensors = useSensors(useSensor(PointerSensor));

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        setPages(prev => [...prev, ...newFiles]);
    };

    const removeFile = (index) => {
        setPages(prev => prev.filter((_, i) => i !== index));
    };

    const handleDragEnd = (event) => {
        const {active, over} = event;
        if (active.id !== over.id) {
            const oldIndex = pages.findIndex((_, i) => i.toString() === active.id);
            const newIndex = pages.findIndex((_, i) => i.toString() === over.id);
            setPages(prev => arrayMove(prev, oldIndex, newIndex));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('chapterName', chapterName);
        formData.append('chapterNumber', chapterNumber);
        pages.forEach(file => formData.append('pages', file));

        try {
            setLoading(true);
            const respone = await axios.post(`http://localhost:8080/api/manga/${mangaId}/chapter`, formData, {
                headers: {'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }

            });
            // await getChapterOfManga(mangaId);
            setLoading(false);
            onClose();
            await showSuccessDialog(respone?.data?.message || "Thêm chap thành công!");

        } catch (error) {
            setLoading(false);
            console.error(error);
            onClose();
            const msg = error?.response?.data?.message || "Thêm chap thất bại";
            await showErrorDialog("Lỗi", msg);
        }
    };

    return (
        <Dialog open onClose={onClose} fullWidth maxWidth="sm">
            {loading && <Loading size="large"/>}
            <DialogTitle>Thêm Chapter</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent dividers>
                    <TextField
                        label="Tên chapter"
                        fullWidth
                        margin="normal"
                        value={chapterName}
                        onChange={(e) => setChapterName(e.target.value)}
                    />
                    <TextField
                        label="Số chapter"
                        fullWidth
                        margin="normal"
                        type="number"
                        value={chapterNumber}
                        onChange={(e) => setChapterNumber(e.target.value)}
                        required
                    />
                    <Button
                        variant="outlined"
                        component="label"
                        fullWidth
                        sx={{my: 2}}
                    >
                        Chọn ảnh
                        <input
                            type="file"
                            hidden
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </Button>

                    <Typography variant="subtitle1" sx={{mb: 1}}>
                        Ảnh đã chọn (kéo để sắp xếp):
                    </Typography>
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={pages.map((_, i) => i.toString())}
                            strategy={verticalListSortingStrategy}
                        >
                            {pages.map((file, index) => (
                                <SortableImageItem
                                    key={index}
                                    id={index.toString()}
                                    file={file}
                                    index={index}
                                    removeFile={removeFile}
                                />
                            ))}
                        </SortableContext>
                    </DndContext>
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose}>Hủy</Button>
                    <Button variant="contained" type="submit">Thêm</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddChapterModal;
