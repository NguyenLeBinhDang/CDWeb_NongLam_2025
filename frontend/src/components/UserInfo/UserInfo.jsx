import React from 'react';
import { useUser } from '../../context/UserContext';
import './UserInfo.css';

const UserInfo = () => {
    const { user } = useUser();

    if (!user) {
        return <div className="user-info-container">Please login to view your information</div>;
    }

    return (
        <div className="user-info-container">
            <div className="user-info-card">
                <div className="user-avatar">
                    {user.avatarUrl ? (
                        <img src={user.avatarUrl} alt="User avatar" />
                    ) : (
                        <div className="avatar-placeholder">
                            {user.fullName?.charAt(0) || user.email?.charAt(0)}
                        </div>
                    )}
                </div>
                <div className="user-details">
                    <h2>{user.fullName || 'No name provided'}</h2>
                    <p className="email">{user.email}</p>
                    <div className="user-roles">
                        <h3>Roles:</h3>
                        <ul>
                            {user.roles?.map((role, index) => (
                                <li key={index}>{role.name}</li>
                            ))}
                        </ul>
                    </div>
                    <p className="account-status">
                        Account Status: {user.isActive ? 'Active' : 'Inactive'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserInfo; 