'use client';

import { FC } from 'react';

interface IProps {
    isLocal?: boolean;
    size?: string;
    bg?: string;
}

const Loading: FC<IProps> = ({
    isLocal,
    size = 'h-20 min-h-20 w-20 min-w-20',
    bg = 'bg-zinc-300 dark:bg-zinc-800',
}) => {
    return (
        <div
            className={`${isLocal ? 'absolute h-full' : 'fixed h-svh p-5'} ${bg} inset-0 z-50 flex w-full items-center justify-center`}
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

export default Loading;
