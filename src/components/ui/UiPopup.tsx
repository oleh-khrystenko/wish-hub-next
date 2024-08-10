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

            {show && (
                <div className="absolute right-0 top-full mt-0.5 flex flex-col rounded-md bg-zinc-400 dark:bg-zinc-700">
                    {children}
                </div>
            )}
        </OutsideClickHandler>
    );
};

export default UiPopup;
