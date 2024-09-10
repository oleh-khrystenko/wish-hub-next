'use client';

import { FC, ReactNode, useEffect, useRef } from 'react';

interface IProps {
    show: boolean;
    wrapRefCurrent: HTMLDivElement | null;
    hide: () => void;
    children: ReactNode;
}

const OutsideClickHandler: FC<IProps> = ({
    show,
    wrapRefCurrent,
    hide,
    children,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!wrapRefCurrent) return;

        if (show) {
            document.body.style.pointerEvents = 'none';
            wrapRefCurrent.style.pointerEvents = 'auto';
        } else {
            document.body.style.pointerEvents = 'auto';
            wrapRefCurrent.style.pointerEvents = 'auto';
        }

        return () => {
            document.body.style.pointerEvents = 'auto';
        };
    }, [show, wrapRefCurrent]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                hide();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [hide]);

    return <div ref={containerRef}>{children}</div>;
};

export default OutsideClickHandler;
