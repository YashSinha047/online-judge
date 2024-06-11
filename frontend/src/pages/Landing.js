import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css'; // Import the CSS file

const Landing = () => {
    return (
        <div className="landing">
            <div className="content">
                <h1>Welcome to Your Coding Platform</h1>
                <p>"Hard work beats talent when talent doesn't work hard"</p>
                <p>By Tim Notke</p>
                <div className="links">
                    <Link to="/login" className="btn">Login</Link>
                    <Link to="/signup" className="btn">Sign Up</Link>
                </div>
            </div>
            <div className="background">
                <div className="cube"></div>
                <div className="cube"></div>
                <div className="cube"></div>
                <div className="cube"></div>
                <div className="cube"></div>
            </div>
        </div>
    );
};

export default Landing;

