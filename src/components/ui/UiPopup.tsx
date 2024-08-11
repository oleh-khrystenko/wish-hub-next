'use client';

import { FC, ReactNode, useState } from 'react';
import OutsideClickHandler from '@/helpers/hocs/OutsideClickHandler';

interface IProps {
    action: ReactNode;
    children: ReactNode;
}

const UiPopup: FC<IProps> = ({ action, children }) => {
    const [show, setShow] = useState<boolean>(false);

    const handleActivate = () => {
        setShow((prevState) => !prevState);
    };

    return (
        <OutsideClickHandler setShow={setShow}>
            <button type="button" onClick={handleActivate}>
                {action}
            </button>

            <div
                className={`${show ? 'max-h-svh max-w-xl' : 'max-h-0 max-w-0'} absolute right-0 top-full z-40 mt-0.5 flex flex-col overflow-hidden rounded-xl bg-zinc-400 transition-all duration-300 ease-in-out dark:bg-zinc-700`}
            >
                {children}
            </div>
        </OutsideClickHandler>
    );
};

export default UiPopup;
