'use client';

import { FC } from 'react';

interface IProps {
    isLocal?: boolean;
    size?: string;
    bg?: string;
    wrapClasses?: string;
}

const UiLoading: FC<IProps> = ({
    isLocal,
    size = 'h-20 min-h-20 w-20 min-w-20',
    bg = 'bg-zinc-200 dark:bg-zinc-900',
    wrapClasses = 'inset-0 w-full',
}) => {
    return (
        <div
            className={`${isLocal ? 'absolute h-full' : 'fixed h-svh'} ${bg} ${wrapClasses} z-50 flex items-center justify-center`}
        >
            <div className={`${size} relative inline-block`}>
                <div className="absolute left-[82.5%] top-[46.25%] h-[7.5%] w-[7.5%] animate-spinner-1 rounded-full bg-cyan-500 dark:bg-cyan-300"></div>
                <div className="absolute left-[77.5%] top-[27.5%] h-[7.5%] w-[7.5%] animate-spinner-2 rounded-full bg-cyan-500 dark:bg-cyan-300"></div>
                <div className="absolute left-[65%] top-[13.75%] h-[7.5%] w-[7.5%] animate-spinner-3 rounded-full bg-cyan-500 dark:bg-cyan-300"></div>
                <div className="absolute left-[46.25%] top-[8.75%] h-[7.5%] w-[7.5%] animate-spinner-4 rounded-full bg-cyan-500 dark:bg-cyan-300"></div>
                <div className="absolute left-[27.5%] top-[13.75%] h-[7.5%] w-[7.5%] animate-spinner-5 rounded-full bg-cyan-500 dark:bg-cyan-300"></div>
                <div className="absolute left-[13.75%] top-[27.5%] h-[7.5%] w-[7.5%] animate-spinner-6 rounded-full bg-cyan-500 dark:bg-cyan-300"></div>
                <div className="absolute left-[8.75%] top-[46.25%] h-[7.5%] w-[7.5%] animate-spinner-7 rounded-full bg-cyan-500 dark:bg-cyan-300"></div>
                <div className="absolute left-[13.75%] top-[65%] h-[7.5%] w-[7.5%] animate-spinner-8 rounded-full bg-cyan-500 dark:bg-cyan-300"></div>
                <div className="absolute left-[27.5%] top-[77.5%] h-[7.5%] w-[7.5%] animate-spinner-9 rounded-full bg-cyan-500 dark:bg-cyan-300"></div>
                <div className="absolute left-[46.25%] top-[82.5%] h-[7.5%] w-[7.5%] animate-spinner-10 rounded-full bg-cyan-500 dark:bg-cyan-300"></div>
                <div className="absolute left-[65%] top-[77.5%] h-[7.5%] w-[7.5%] animate-spinner-11 rounded-full bg-cyan-500 dark:bg-cyan-300"></div>
                <div className="absolute left-[77.5%] top-[65%] h-[7.5%] w-[7.5%] animate-spinner-12 rounded-full bg-cyan-500 dark:bg-cyan-300"></div>
            </div>
        </div>
    );
};

export default UiLoading;
