import React from 'react';
import './Hero.css';

const Hero = ({ image, title, subtitle }) => {
    console.log("Image URL:", image);
    return (
        <div>
            <h1 className="hero-title">{title}</h1>
            <p className="hero-subtitle">{subtitle}</p>
            <div className="hero"
                style={{ backgroundImage: `url(${image})` }}>
            </div>
        </div>
    );
};

export default Hero;