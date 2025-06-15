import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useComment} from "../../context/CommentsContext";
import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import Loading from "../../components/Loader/Loading";
import {useUser} from "../../context/UserContext";

const Comments = () => {
    const {mangaId, chapId} = useParams();
    const {
        loading,
        listComment,
        getCommentByChapterId,
        listReplyComment,
        getReplies,
        postCommnent,
        deleteComment,
        postReply,
    } = useComment();
    const {user} = useUser();

    const [createCommentData, setCreateCommentData] = useState({
        comment: '',
        mangaId: mangaId,
        chapId: chapId,
    });

    const [isReply, setIsReply] = useState(false);
    const [activeReplyId, setActiveReplyId] = useState(null);

    useEffect(() => {
        const fetchComment = async (chapId) => {
            await getCommentByChapterId(chapId);
        }
        // if (loading) {
        //
        // }

        // if (listComment.length === 0) {
        fetchComment(chapId);
        // }
        console.log(listComment);

    }, [chapId])


    const fetchReply = async (commentId) => {
        await getReplies(commentId);
    }

    // if (loading) {
    //     return <Loading/>;
    // }

    const handlePostComment = async (createCommentData) => {
        await postCommnent(createCommentData);
        setCreateCommentData(prev => ({
            ...prev,
            comment: '',
        }))
        await getCommentByChapterId(chapId);
    }

    const handleDeleteComment = async (commentId) => {
        await deleteComment(commentId);
        await getCommentByChapterId(chapId);
    }

    const handleReply = async (commentId, replyData) => {
        await postReply(commentId, replyData);
        setActiveReplyId(null);
        setCreateCommentData(prev => ({
            ...prev,
            comment: '',
        }))
        await getReplies(commentId);
        await getCommentByChapterId(chapId);
    }

    const renderActionBox = (comment) => {
        return (
            <>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 1
                }}>
                    {/* Left side buttons */}
                    <Box sx={{display: 'flex', gap: 2}}>
                        <Typography
                            variant="caption"
                            sx={{color: "#007BFF", cursor: "pointer"}}
                            onClick={(e) => {
                                e.preventDefault(); // ← Add this just to be safe
                                fetchReply(comment.id);
                            }}
                        >
                            Xem phản hồi
                        </Typography>
                        {user?.fullName === comment.userName || user?.role.role_name === 'ADMIN' ? (
                            <Typography
                                variant="caption"
                                sx={{color: "red", cursor: "pointer"}}
                                onClick={() => handleDeleteComment(comment.id)}
                            >
                                Xóa bình luận
                            </Typography>
                        ) : (
                            <Box></Box>
                        )}
                    </Box>

                    {/* Right side button */}
                    <Typography
                        variant="caption"
                        sx={{color: "#007BFF", cursor: "pointer"}}
                        onClick={() => setActiveReplyId(activeReplyId === comment.id ? null : comment.id)}
                    >
                        Phản hồi bình luận
                    </Typography>
                </Box>


            </>
        )
    }

    const renderReplyBox = (commentId) => {
        return (
            <>


                {user ? (

                    <Box sx={{mt: 4, backgroundColor: '#fff', p: 2, borderRadius: 2}}>
                        <Stack spacing={1}>
                            <TextField
                                fullWidth
                                placeholder="Viết bình luận..."
                                multiline
                                minRows={3}
                                onChange={(e) => setCreateCommentData(prev => ({
                                    ...prev,
                                    comment: e.target.value
                                }))}
                            />

                            {/* Align button to the left */}
                            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                <Button variant="contained" color="primary"
                                        onClick={() => handleReply(commentId, createCommentData)}>
                                    Bình luận
                                </Button>
                            </Box>
                        </Stack>
                    </Box>
                ) : (

                    <Box sx={{mt: 4, backgroundColor: '#fff'}}>
                        <TextField
                            fullWidth
                            placeholder=" Vui long dang nhap"
                            multiline
                            minRows={3}
                            disabled
                        />
                    </Box>
                    // <Typography> Vui long dang nhap </Typography>
                )}
            </>
        )
    }

    const renderCommentBox = () => {
        const rootComments = listComment.filter(c => c.reply == null);
        const getReplies = (parentId) => listComment.filter(c => c.reply === parentId);
        return (
            <>

                {user ? (

                    <Box sx={{mt: 4, backgroundColor: '#fff', p: 2, borderRadius: 2}}>
                        <Stack spacing={1}>
                            <TextField
                                fullWidth
                                placeholder="Viết bình luận..."
                                multiline
                                minRows={3}
                                onChange={(e) => setCreateCommentData(prev => ({
                                    ...prev,
                                    comment: e.target.value
                                }))}
                            />

                            {/* Align button to the left */}
                            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                <Button variant="contained" color="primary"
                                        onClick={() => handlePostComment(createCommentData)}>
                                    Bình luận
                                </Button>
                            </Box>
                        </Stack>
                    </Box>
                ) : (

                    <Box sx={{mt: 4, backgroundColor: '#fff'}}>
                        <TextField
                            fullWidth
                            placeholder=" Vui long dang nhap"
                            multiline
                            minRows={3}
                            disabled
                        />
                    </Box>
                    // <Typography> Vui long dang nhap </Typography>
                )}
                {loading && <Loading/>};
                {rootComments.map((comment) => {
                    const replies = listReplyComment.filter(r => r.reply === comment.id);
                    return (

                        <Box key={comment.id} sx={{mb: 2}}>
                            {/* Main Comment */}
                            <Box
                                sx={{
                                    p: 2,
                                    border: '1px solid #ccc',
                                    borderRadius: 2,
                                    backgroundColor: comment.isDeleted ? '#f8f8f8' : 'white',
                                    opacity: comment.isDeleted ? 0.6 : 1,
                                }}
                            >
                                <Box sx={{display: 'flex', alignItems: 'center', mb: 1}}>
                                    {comment.avatarUrl && (
                                        <img
                                            src={comment.avatarUrl}
                                            alt="Avatar"
                                            style={{width: 32, height: 32, borderRadius: '50%', marginRight: 8}}
                                        />
                                    )}
                                    <Typography variant="subtitle2" sx={{color: "#555", fontWeight: 'bold'}}>
                                        {comment.userName || "Ẩn danh"}
                                    </Typography>
                                    <Typography variant="caption" sx={{marginLeft: 'auto', color: "#999"}}>
                                        {new Date(comment.updatedAt).toLocaleString("vi-VN")}
                                    </Typography>
                                </Box>

                                <Typography variant="body1" sx={{whiteSpace: 'pre-line'}}>
                                    {comment.comment}
                                </Typography>

                                {renderActionBox(comment)}

                                {activeReplyId === comment.id && renderReplyBox(comment.id)}

                            </Box>

                            {/* Replies (Indented) */}
                            {replies.length > 0 && (
                                <Box sx={{pl: 4, mt: 1}}>
                                    {replies.map(reply => (
                                        <Box
                                            key={reply.id}
                                            sx={{
                                                mt: 1,
                                                p: 2,
                                                border: '1px solid #ddd',
                                                borderRadius: 2,
                                                backgroundColor: reply.isDeleted ? '#f4f4f4' : '#fafafa',
                                                opacity: reply.isDeleted ? 0.6 : 1,
                                            }}
                                        >
                                            <Box sx={{display: 'flex', alignItems: 'center', mb: 1}}>
                                                {reply.avatarUrl && (
                                                    <img
                                                        src={reply.avatarUrl}
                                                        alt="Avatar"
                                                        style={{
                                                            width: 28,
                                                            height: 28,
                                                            borderRadius: '50%',
                                                            marginRight: 8
                                                        }}
                                                    />
                                                )}
                                                <Typography variant="subtitle2" sx={{color: "#555"}}>
                                                    {reply.userName || "Ẩn danh"}
                                                </Typography>
                                                <Typography variant="caption" sx={{marginLeft: 'auto', color: "#999"}}>
                                                    {new Date(reply.updatedAt).toLocaleString("vi-VN")}
                                                </Typography>
                                            </Box>
                                            <Typography variant="body2" sx={{whiteSpace: 'pre-line'}}>
                                                {reply.comment}
                                            </Typography>

                                            {renderActionBox(reply)}

                                            {activeReplyId === reply.id && renderReplyBox(reply.id)}

                                        </Box>
                                    ))}
                                </Box>
                            )}
                        </Box>
                    );
                })}


            </>
        )
    }

    return (
        <>
            {loading && <Loading/>}

            <Box sx={{px: 4, py: 2}}>
                <Typography variant="h6" color="primary" sx={{mb: 2}}>
                    Bình luận: {listComment.length}
                </Typography>

                {renderCommentBox()}
            </Box>
        </>
    );
};

export default Comments;