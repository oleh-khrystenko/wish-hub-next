'use client';

import { FC, ReactNode, useEffect, useRef } from 'react';

interface IProps {
    setShow: (value: boolean) => void;
    children: ReactNode;
}

const OutsideClickHandler: FC<IProps> = ({ setShow, children }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current?.contains(e.target as Node)
            ) {
                setShow(false);
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
