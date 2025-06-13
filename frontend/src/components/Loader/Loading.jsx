import React from 'react';
import './Loading.css';

const Loading = ({size = 'medium', color = '#f39c12'}) => {
    return (
        // <!-- From Uiverse.io by adamgiebl -->
        <section className="dots-container">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </section>

    );
};

export default Loading;