import React, {useEffect} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useUser} from "../context/UserContext";
import Loading from "../components/Loader/Loading";


const AdminRoute = ({allowedRoles}) => {
    const {userInfo, loading, user, getUserInfo} = useUser();

    // useEffect(() => {
    //     const fetchUserInfo = async (userId) => {
    //         try {
    //             await getUserInfo(userId);
    //         } catch (error) {
    //             console.error('Error fetching user info:', error);
    //         }
    //     }
    //     if (user) {
    //         fetchUserInfo(user.id);
    //     }
    // }, [user]);

    if (loading) return ;

    if (!user || !allowedRoles.includes(user?.role?.role_name)) {
        return <Navigate to="/" replace/>
    }

    return <Outlet/>;

}

export default AdminRoute;