'use client';

import { useState, useEffect } from 'react';

const UseScreenWidth = () => {
    const [screenWidth, setScreenWidth] = useState<number>(
        typeof window === 'undefined' ? 0 : window.innerWidth
    );
    const [screenHeight, setScreenHeight] = useState<number>(
        typeof window === 'undefined' ? 0 : window.innerHeight
    );

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setScreenWidth(window.innerWidth);
                setScreenHeight(window.innerHeight);
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    return { screenWidth, screenHeight };
};

export default UseScreenWidth;
