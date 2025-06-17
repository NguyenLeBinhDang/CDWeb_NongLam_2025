import React, {useEffect} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useUser} from "../context/UserContext";
import Loading from "../components/Loader/Loading";


const AdminRoute = ({allowedRoles}) => {
    const {userInfo, loadUserData, user, getUserInfo} = useUser();

    if (loadUserData) return;

    if (!user || !allowedRoles.includes(user?.role?.role_name)) {
        return <Navigate to="/" replace/>
    }

    return <Outlet/>;

}

export default AdminRoute;