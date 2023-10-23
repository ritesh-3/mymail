import React, { useState, useEffect } from 'react';

function TextLoader({ text }) {
    const [loadingText, setLoadingText] = useState(text || 'Loading');

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingText((prevText) => {
                return prevText === 'Loading...' ? 'Loading' : prevText + '.';
            });
        }, 300);

        return () => clearInterval(interval);
    }, []);

    return (
        <span>
            <h2 style={{ opacity: 0.5 }}>{loadingText}</h2>
        </span>
    );
}

export default TextLoader;