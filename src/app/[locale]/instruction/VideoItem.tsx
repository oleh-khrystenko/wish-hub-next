import { FC, ReactNode } from 'react';

interface IProps {
    children: ReactNode;
    title: string;
}

const VideoItem: FC<IProps> = ({ children, title }) => {
    return (
        <li className="flex flex-col gap-2 rounded-lg border border-dashed border-zinc-600 p-2 dark:border-zinc-400 tablet-lg:gap-3">
            <div className="relative h-0 w-full overflow-hidden rounded-lg pt-[56.25%]">
                {children}
            </div>

            <p className="text-center font-bold leading-tight text-zinc-900 dark:text-zinc-100 tablet-md:text-lg tablet-md:leading-tight tablet-lg:text-xl tablet-xl:text-2xl">
                {title}
            </p>
        </li>
    );
};

export default VideoItem;
