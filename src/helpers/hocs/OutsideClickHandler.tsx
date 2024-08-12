'use client';

import { FC, ReactNode, useEffect, useRef } from 'react';

interface IProps {
    hide: () => void;
    children: ReactNode;
}

const OutsideClickHandler: FC<IProps> = ({ hide, children }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current?.contains(e.target as Node)
            ) {
                hide();
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
