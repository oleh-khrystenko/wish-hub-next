'use client';

import { FC, ReactNode, useState } from 'react';
import OutsideClickHandler from "@/helpers/hocs/OutsideClickHandler";

interface IProps {
    action: ReactNode;
    children: ReactNode;
}

const UiPopup: FC<IProps> = ({ action, children }) => {
    const [show, setShow] = useState<boolean>(false);

    const handleActivate = () => {
        setShow(prevState => !prevState);
    };

    return (
        <OutsideClickHandler setShow={setShow}>
            <button
                type="button"
                onClick={handleActivate}
            >
                {action}
            </button>

            {show && (
                <div className="flex flex-col gap-4 rounded-md bg-zinc-400 dark:bg-zinc-500 p-4">
                    {children}
                </div>
            )}
        </OutsideClickHandler>
    );
};

export default UiPopup;
