'use client';

import { FC } from 'react';

interface IProps {
    isLocal?: boolean;
}

const Loading: FC<IProps> = ({ isLocal }) => {
    return (
        <div
            className={`${isLocal ? 'absolute h-full' : 'fixed h-svh'} inset-0 z-50 flex w-full items-center justify-center bg-zinc-300 p-5 dark:bg-zinc-800`}
        >
            <div className="relative inline-block h-20 w-20">
                <div className="animate-spinner-1 absolute left-[66px] top-[37px] h-1.5 w-1.5 rounded-full bg-cyan-500 dark:bg-cyan-300"></div>
                <div className="animate-spinner-2 absolute left-[62px] top-[22px] h-1.5 w-1.5 rounded-full bg-cyan-500 dark:bg-cyan-300"></div>
                <div className="animate-spinner-3 absolute left-[52px] top-[11px] h-1.5 w-1.5 rounded-full bg-cyan-500 dark:bg-cyan-300"></div>
                <div className="animate-spinner-4 absolute left-[37px] top-[7px] h-1.5 w-1.5 rounded-full bg-cyan-500 dark:bg-cyan-300"></div>
                <div className="animate-spinner-5 absolute left-[22px] top-[11px] h-1.5 w-1.5 rounded-full bg-cyan-500 dark:bg-cyan-300"></div>
                <div className="animate-spinner-6 absolute left-[11px] top-[22px] h-1.5 w-1.5 rounded-full bg-cyan-500 dark:bg-cyan-300"></div>
                <div className="animate-spinner-7 absolute left-[7px] top-[37px] h-1.5 w-1.5 rounded-full bg-cyan-500 dark:bg-cyan-300"></div>
                <div className="animate-spinner-8 absolute left-[11px] top-[52px] h-1.5 w-1.5 rounded-full bg-cyan-500 dark:bg-cyan-300"></div>
                <div className="animate-spinner-9 absolute left-[22px] top-[62px] h-1.5 w-1.5 rounded-full bg-cyan-500 dark:bg-cyan-300"></div>
                <div className="animate-spinner-10 absolute left-[37px] top-[66px] h-1.5 w-1.5 rounded-full bg-cyan-500 dark:bg-cyan-300"></div>
                <div className="animate-spinner-11 absolute left-[52px] top-[62px] h-1.5 w-1.5 rounded-full bg-cyan-500 dark:bg-cyan-300"></div>
                <div className="animate-spinner-12 absolute left-[62px] top-[52px] h-1.5 w-1.5 rounded-full bg-cyan-500 dark:bg-cyan-300"></div>
            </div>
        </div>
    );
};

export default Loading;
