import React, {useEffect, useState} from 'react';
import {useUser} from '../../context/UserContext';
import './UserInfo.css';
import Loading from "../../components/Loader/Loading";
import ChangePasswordModal from "../../Modals/ChangePasswordModal";
import ChangeUserInfoModal from "../../Modals/ChangeUserInfoModal";


const UserInfo = () => {
    const {user, userInfo, getUserInfo, loading} = useUser();
    const [openEditInfo, setOpenEditInfo] = useState(false);
    const [openChangePassword, setOpenChangePassword] = useState(false);

    useEffect(() => {
        const fetchUserInfo = async (userId) => {
            try {
                await getUserInfo(userId);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        }
        if (user) {
            fetchUserInfo(user.id);
        }
    }, [user])

    useEffect(() => {
        if (userInfo) {
            console.log('Updated userInfo:', userInfo);
        }
    }, [userInfo]);

    if (!user) {
        return <div className="user-info-container">Please login to view your information</div>;
    }

    return (
        <div className="user-info-container">
            {loading && <Loading/>}
            <div className="user-info-card">
                <div className="user-avatar">
                    {userInfo?.avatarUrl ? (
                        <img src={userInfo.avatarUrl || '/img.png'} alt="User avatar"/>
                    ) : (
                        <div className="avatar-placeholder">
                            {userInfo?.fullName?.charAt(0) || userInfo?.email?.charAt(0)}
                        </div>
                    )}
                </div>
                <div className="user-details">
                    <h2>{userInfo?.fullName || 'No name provided'}</h2>
                    <p className="email">{userInfo?.email}</p>
                    <div className="user-roles">
                        <h3>Roles:</h3>
                        <ul>
                            {userInfo?.role?.role_name}
                        </ul>
                    </div>
                    <p className="account-status">
                        Account Status: {userInfo?.active ? 'Active' : 'Inactive'}
                    </p>
                </div>

            </div>
            <div className="user-actions">
                <button onClick={() => setOpenEditInfo(true)}>Chỉnh sửa thông tin</button>
                <button onClick={() => setOpenChangePassword(true)}>Đổi mật khẩu</button>
            </div>

            {userInfo && (
                <>
                    <ChangePasswordModal
                        open={openChangePassword}
                        onClose={() => setOpenChangePassword(false)}
                        email={userInfo.email}
                    />
                    <ChangeUserInfoModal
                        open={openEditInfo}
                        onClose={() => setOpenEditInfo(false)}
                        user={userInfo}
                    />

                </>
            )}


        </div>
    );
};

export default UserInfo;