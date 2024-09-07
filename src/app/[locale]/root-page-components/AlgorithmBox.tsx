import { FC, ReactNode } from 'react';

interface IProps {
    icon?: ReactNode;
    title: string;
    text: string;
}

const AlgorithmBox: FC<IProps> = ({ icon, title, text }) => {
    return (
        <div className="w-full self-stretch rounded-3xl border border-dashed border-zinc-400 bg-[url('/images/algorithm-bg.webp')] bg-cover bg-center bg-no-repeat px-5 py-6 dark:border-zinc-600">
            <div className="flex items-center gap-3.5">
                <div className="relative flex h-11 w-11 min-w-11 items-center justify-center rounded-md bg-zinc-500 before:absolute before:inset-0 before:rotate-12 before:rounded-md before:border before:border-dashed before:border-zinc-800 dark:bg-zinc-800 before:dark:border-zinc-400 tablet-md:h-14 tablet-md:w-14 tablet-md:min-w-14">
                    {icon}
                </div>

                <p className="text-base font-bold text-zinc-800 dark:text-zinc-200 tablet-md:text-xl">
                    {title}
                </p>
            </div>

            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 tablet-md:mt-4">
                {text}
            </p>
        </div>
    );
};

export default AlgorithmBox;
