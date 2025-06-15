import {createContext, useContext, useState} from "react";
import {FilterContext} from "./FilterContext";
import axios from "axios";
import {showErrorDialog} from "../utils/Alert";

const CommentsContext = createContext();

export const CommentProvider = ({children}) => {
    const [loading, setLoading] = useState(false);
    const [listComment, setListComment] = useState([]);
    const [listReplyComment, setListReplyComment] = useState([]);


    const getCommentByChapterId = async (chapterId) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/comments/chapter/${chapterId}`);
            setListComment(response.data);
            // setLoading(false);
            return response.data;

        } catch (error) {
            // setLoading(false);
            const message = error?.response?.data?.message || 'Failed to get comment';
            await showErrorDialog('Lỗi khi lấy bình luận', message);
        } finally {
            setLoading(false);
        }

    }

    const getReplies = async (commentId) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/comments/${commentId}/reply`);
            setListReplyComment(response.data);
            return response.data;
        } catch (error) {
            // setLoading(false);
            const message = error?.response?.data?.message || 'Failed to get comment';
            await showErrorDialog('Lỗi khi lấy reply', message);
        } finally {
            setLoading(false);
        }
    }

    const postCommnent = async (commentDTO) => {
        setLoading(true);
        try {
            await axios.post('http://localhost:8080/api/comments', commentDTO, {
                headers: {
                    // 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

        } catch (error) {
            // setLoading(false);
            const message = error?.response?.data?.message || 'Failed to post comment';
            await showErrorDialog('Lỗi khi đăng bình luận', message)
        } finally {
            setLoading(false);
        }
    }

    const postReply = async (commentId, replyDTO) => {
        setLoading(true);
        try {
            await axios.post(`http://localhost:8080/api/comments/${commentId}/reply`, replyDTO, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
        } catch (error) {
            // setLoading(false);
            const message = error?.response?.data?.message || 'Failed to post reply';
            await showErrorDialog('Lỗi khi phản hồi bình luận', message);
        } finally {
            setLoading(false);
        }
    }

    const deleteComment = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:8080/api/comments/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
        } catch (error) {
            // setLoading(false);
            const message = error?.response?.data?.message || 'Failed to delete comment';
            await showErrorDialog('Lỗi khi xóa bình luận', message)
        } finally {
            setLoading(false);
        }
    }


    return (
        <CommentsContext.Provider value={{
            loading,
            listComment,
            getCommentByChapterId,
            listReplyComment,
            getReplies,
            postCommnent,
            deleteComment,
            postReply,

        }}>
            {children}
        </CommentsContext.Provider>
    )
};

export const useComment = () => {
    const context = useContext(CommentsContext);
    if (!context) {
        throw new Error('useComment must be used within a CommentProvider');
    }
    return context;
};