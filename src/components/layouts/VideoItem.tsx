'use client';

import { FC, ReactNode, RefObject, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useMyUserStore } from '@/stores/my-user';
import { useSettingsStore } from '@/stores/settings';
import ShareButton from '@/components/layouts/ShareButton';

interface IProps {
    src: string;
    title: ReactNode;
    videoRef?: RefObject<HTMLLIElement>;
    videoClasses?: string;
    tab?: string;
    video?: string;
}

const VideoItem: FC<IProps> = ({
    src,
    title,
    videoRef,
    videoClasses = 'pt-[56.25%]',
    tab,
    video,
}) => {
    const [pulse, setPulse] = useState<boolean>(false);

    const myUser = useMyUserStore((state) => state.myUser);
    const showGlobalLoading = useSettingsStore(
        (state) => state.showGlobalLoading
    );

    const searchParams = useSearchParams();

    useEffect(() => {
        setPulse(searchParams.get('video') === video);
    }, [searchParams]);

    return (
        <li
            className={`${pulse && !showGlobalLoading && 'animate-pulse'} flex flex-col gap-2 rounded-lg border border-dashed border-zinc-600 p-2 dark:border-zinc-400 tablet-lg:gap-3`}
            ref={videoRef}
        >
            <div
                className={`${videoClasses} relative h-0 w-full overflow-hidden rounded-lg`}
            >
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

            <div className="relative my-auto px-8">
                <p className="text-center font-bold leading-tight text-zinc-900 dark:text-zinc-100 tablet-md:text-lg tablet-md:leading-tight">
                    {title}
                </p>

                {video && (
                    <ShareButton
                        link={
                            myUser
                                ? `/instruction?utm_source=user&utm_medium=share&utm_campaign=user_${myUser.id}&tab=${tab}&video=${video}`
                                : `/instruction?tab=${tab}&video=${video}`
                        }
                        actionClasses="absolute top-1/2 right-0 p-1 -translate-y-1/2"
                    />
                )}
            </div>
        </li>
    );
};

export default VideoItem;
