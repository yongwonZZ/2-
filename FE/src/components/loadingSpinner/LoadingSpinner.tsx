import React from 'react';
import '../../styles/components/LoadingSpinner.module.css';
import { MdLocalAirport } from 'react-icons/md';

interface LoadingSpinnerProps {
    message: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => {
    return (
        <div className="overlay">
            <div className="spinner">
                <div className="earth"></div>
                <div className="plane-container">
                    <MdLocalAirport className="plane" />
                </div>
            </div>
            <div style={{ position: 'absolute', color: 'white', fontSize: '20px' }}>
                {message}
            </div>
        </div>
    );
};

export default LoadingSpinner;
