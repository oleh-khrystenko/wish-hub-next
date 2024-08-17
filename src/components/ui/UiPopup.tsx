'use client';

import { FC, ReactNode, useState } from 'react';
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
    return (
        <div
            className={`${classes} ${show ? 'max-h-svh max-w-xl' : 'max-h-0 max-w-0'} ${showPopupUp ? 'bottom-0' : 'top-0'} ${showPopupCenter ? 'left-1/2 -translate-x-1/2' : 'right-0'} absolute z-40 overflow-hidden transition-all duration-300 ease-in-out`}
        >
            <OutsideClickHandler hide={hide}>
                <div className="flex flex-col rounded-xl bg-zinc-400 dark:bg-zinc-700">
                    {children}
                </div>
            </OutsideClickHandler>
        </div>
    );
};

export default UiPopup;
