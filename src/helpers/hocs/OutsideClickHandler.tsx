'use client';

import { FC, ReactNode, useEffect, useRef } from 'react';

interface IProps {
    hid: () => void;
    children: ReactNode;
}

const OutsideClickHandler: FC<IProps> = ({ hid, children }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current?.contains(e.target as Node)
            ) {
                hid();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return <div ref={containerRef}>{children}</div>;
};

export default OutsideClickHandler;
