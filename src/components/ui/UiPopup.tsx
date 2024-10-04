'use client';

import { FC, ReactNode, useRef } from 'react';
import OutsideClickHandler from '@/helpers/hocs/OutsideClickHandler';

interface IProps {
    classes: string;
    showPopupUp?: boolean;
    showPopupCenter?: boolean;
    show: boolean;
    hide: () => void;
    children: ReactNode;
}

const UiPopup: FC<IProps> = ({
    classes,
    showPopupUp = false,
    showPopupCenter = false,
    show,
    hide,
    children,
}) => {
    const wrapRef = useRef<HTMLDivElement>(null);

    return (
        show && (
            <div
                className={`${classes} ${showPopupUp ? 'bottom-0' : 'top-0'} ${showPopupCenter ? 'left-1/2 -translate-x-1/2' : 'right-0'} absolute z-40 max-h-svh max-w-72 mobile-xs:max-w-xs`}
                ref={wrapRef}
            >
                <OutsideClickHandler
                    show={show}
                    wrapRefCurrent={wrapRef.current}
                    hide={hide}
                >
                    <div className="flex flex-col rounded-xl border border-zinc-300 bg-zinc-100 dark:border-zinc-950 dark:bg-zinc-700">
                        {children}
                    </div>
                </OutsideClickHandler>
            </div>
        )
    );
};

export default UiPopup;
