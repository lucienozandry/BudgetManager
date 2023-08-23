import React from 'react';

const containerStyle = {
    position: 'relative',
    height: '100vh'
};

const centerDivStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
};

export function LoadingPage() {
    return <>
        <div style={containerStyle}>
            <div style={centerDivStyle}>
                <div className="mx-3 spinner-grow text-primary spinner-grow-lg"
                    role="status">
                </div>
                <div className="mx-3 spinner-grow text-secondary spinner-grow-lg"
                    role="status">
                </div> 
                <div className="mx-3 spinner-grow text-muted spinner-grow-lg"
                    role="status">
                </div> 
                <div className="mx-3 spinner-grow text-dark spinner-grow-lg"
                    role="status">
                </div> 
                <div className="mx-3 spinner-grow text-success spinner-grow-lg"
                    role="status">
                </div> 
                <div className="mx-3 spinner-grow text-info spinner-grow-lg"
                    role="status">
                </div>                
            </div>
        </div>
    </>
}
