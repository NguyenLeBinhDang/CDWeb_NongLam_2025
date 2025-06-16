import Swal from 'sweetalert2';
import 'animate.css';
import './Alert.css';

const defaultCustomClass = {
    popup: 'swal2-custom-popup',
    title: 'swal2-custom-title',
    confirmButton: 'swal2-custom-confirm',
    cancelButton: 'swal2-custom-cancel'
};

const defaultShowClass = {
    popup: 'animate__animated animate__fadeInDown'
};

const defaultHideClass = {
    popup: 'animate__animated animate__fadeOutUp'
};

export const showConfirmDialog = async (
    title = "Bạn chắc chắn chứ?",
    icon = "question"
) => {
    return await Swal.fire({
        title,
        icon,
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Hủy",
        customClass: defaultCustomClass,
        showClass: defaultShowClass,
        hideClass: defaultHideClass
    });
};

export const showSuccessDialog = async (
    title = "Thành công",
    text = ""
) => {
    return await Swal.fire({
        title,
        text,
        icon: "success",
        confirmButtonText: "OK",
        customClass: defaultCustomClass,
        showClass: defaultShowClass,
        hideClass: defaultHideClass
    });
};

export const showErrorDialog = async (
    title = "Lỗi",
    text = ""
) => {
    return await Swal.fire({
        title,
        text,
        icon: "error",
        confirmButtonText: "OK",
        customClass: defaultCustomClass,
        showClass: defaultShowClass,
        hideClass: defaultHideClass
    });
};
