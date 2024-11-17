import { FC, ReactNode } from 'react';

interface IProps {
    src: string;
    title: ReactNode;
}

const VideoItem: FC<IProps> = ({ src, title }) => {
    return (
        <li className="flex flex-col gap-2 rounded-lg border border-dashed border-zinc-600 p-2 dark:border-zinc-400 tablet-lg:gap-3">
            <div className="relative h-0 w-full overflow-hidden rounded-lg pt-[56.25%]">
                <iframe
                    className="absolute inset-0 h-full w-full"
                    src={src}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            </div>

            <p className="text-center font-bold leading-tight text-zinc-900 dark:text-zinc-100 tablet-md:text-lg tablet-md:leading-tight tablet-lg:text-xl tablet-xl:text-2xl">
                {title}
            </p>
        </li>
    );
};

export default VideoItem;
