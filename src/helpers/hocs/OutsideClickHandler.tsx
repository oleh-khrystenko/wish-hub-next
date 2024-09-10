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
            // console.log('handleClickOutside');
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                // console.log('hide');
                hide();
                // document.body.style.pointerEvents = 'none';
                // e.stopImmediatePropagation();
                // e.preventDefault();
                // e.stopPropagation();
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
