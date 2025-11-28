import React from 'react';

const styles = {
    crosshairContainer: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        width: '32px',
        height: '32px',
        cursor: 'default',
        zIndex: 50,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
    },
    crosshairLineHorizontal: {
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        height: '2px',
        backgroundColor: '#fff',
        marginTop: '-1px',
    },
    crosshairLineVertical: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '50%',
        width: '2px',
        backgroundColor: '#fff',
        marginLeft: '-1px',
    },
};

const Crosshair = () => {
    return (
        <div
            style={styles.crosshairContainer}
        >
            <div style={styles.crosshairLineHorizontal}></div>
            <div style={styles.crosshairLineVertical}></div>
        </div>
    );
};

export default Crosshair;