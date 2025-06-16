import Swal from 'sweetalert2';

export const showConfirmDialog = async (title = "Bạn chắc chắn chứ?", icon = "question") => {
    return await Swal.fire({
        title,
        icon,
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Hủy",
    });
};

export const showSuccessDialog = async (title = "Thành công", text = "") => {
    return await Swal.fire({
        title,
        text,
        icon: "success",
        confirmButtonText: "OK",
    });
};

export const showErrorDialog = async (title = "Lỗi", text = "") => {
    return await Swal.fire({
        title,
        text,
        icon: "error",
        confirmButtonText: "OK",
    });
};