'use client';

import { FC } from 'react';

interface IProps {
    activated: boolean;
}

const UiBurger: FC<IProps> = ({ activated }) => {
    return (
        <div className="relative z-40 flex h-10 w-10 flex-col justify-between py-1.5">
            <div
                className={`${activated ? 'w-1/2 -translate-x-0.5 translate-y-1.5 -rotate-45' : 'w-full'} h-0.5 rounded-full bg-zinc-700 transition-all duration-300 ease-in-out dark:bg-zinc-300`}
            ></div>

            <div className="h-0.5 w-full rounded-full bg-zinc-700 transition-all duration-300 ease-in-out dark:bg-zinc-300"></div>

            <div
                className={`${activated ? 'w-1/2 -translate-x-0.5 -translate-y-1.5 rotate-45' : 'w-full'} h-0.5 rounded-full bg-zinc-700 transition-all duration-300 ease-in-out dark:bg-zinc-300`}
            ></div>
        </div>
    );
};

export default UiBurger;
