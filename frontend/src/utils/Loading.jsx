import React from 'react';
import './Loading.css';

const Loading = ({ size = 'medium', color = '#f39c12' }) => {
    return (
        <div className={`loading-container ${size}`}>
            <div className="loading-spinner" style={{ borderColor: color }}>
                <div className="loading-spinner-inner"></div>
            </div>
        </div>
    );
};

export default Loading; 