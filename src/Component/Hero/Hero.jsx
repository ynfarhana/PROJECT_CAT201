import React from 'react';
import './Hero.css';

export default function Hero ({ image, title, subtitle }) {
    console.log("Image URL:", image);
    return (
        <div className="hero"
            style={{ backgroundImage: `url(${image})` }}>
        </div>
    );
}