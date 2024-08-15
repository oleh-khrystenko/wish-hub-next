'use client';

import { useState, useEffect } from 'react';

const UseScreenWidth = (): number => {
    const [screenWidth, setScreenWidth] = useState<number>(
        typeof window === 'undefined' ? 0 : window.innerWidth
    );

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setScreenWidth(window.innerWidth);
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    return screenWidth;
};

export default UseScreenWidth;
