import { FC, ReactNode } from 'react';

interface IProps {
    count: number;
    title: ReactNode;
    text: ReactNode;
}

const TempItem: FC<IProps> = ({ count, title, text }) => {
    return (
        <li className="relative flex items-center gap-4 rounded-3xl bg-zinc-300 bg-[url('/images/sing-up-bg.webp')] bg-cover bg-center bg-no-repeat p-6 dark:bg-zinc-800 tablet-md:gap-6 tablet-md:px-8 tablet-md:py-6">
            <div className="relative flex h-14 w-14 min-w-14 items-center justify-center rounded-md bg-zinc-200 text-3xl font-bold text-cyan-500 before:absolute before:inset-0 before:rotate-6 before:rounded-md before:border before:border-dashed before:border-zinc-800 dark:bg-zinc-900 dark:text-cyan-300 before:dark:border-zinc-400 tablet-md:h-14 tablet-md:w-14 tablet-md:min-w-14 tablet-md:text-4xl">
                {count}
            </div>

            <div>
                <p className="text-lg font-bold text-zinc-800 dark:text-zinc-200 tablet-md:text-2xl">
                    {title}
                </p>

                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 tablet-md:text-base">
                    {text}
                </p>
            </div>
        </li>
    );
};

export default TempItem;
