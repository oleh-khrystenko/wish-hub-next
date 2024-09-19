'use client';

import { FC, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { IZoomedImage } from '@/models/Settings';
import { useWishesStore } from '@/stores/wishes';
import UseFullName from '@/helpers/hooks/UseFullName';
import UseScreenWidth from '@/helpers/hooks/UseScreenWidth';
import Breadcrumbs from '@/components/layouts/Breadcrumbs';
import WishList from '@/components/layouts/wish-list/WishList';
import ZoomedImageModal from '@/components/layouts/ZoomedImageModal';
import UiAvatar from '@/components/ui/UiAvatar';
import ListIcon from '@/components/icons/ListIcon';

const Body: FC = () => {
    const [imageData, setImageData] = useState<IZoomedImage | null>(null);

    const { creatorId } = useParams<{ creatorId: string }>();

    const mainPageT = useTranslations('main-page');
    const profilePageT = useTranslations('profile-page');

    const wishesCreator = useWishesStore((state) => state.creator);

    const { getFullName } = UseFullName();
    const screenWidth = UseScreenWidth();

    const pages = [
        {
            href: 'wish-list',
            icon: (
                <ListIcon classes="w-4 h-4 fill-zinc-200 dark:fill-zinc-400" />
            ),
            name: profilePageT('wish-list-title'),
        },
    ];

    const handleShowImage = (src: string | undefined, alt: string) => {
        src ? setImageData({ src, alt }) : setImageData(null);
    };

    return (
        <main className="flex grow flex-col pt-3">
            <Breadcrumbs pages={pages} />

            <div className="mt-3 flex grow flex-col px-3 pb-5 desktop-sm:px-0">
                <p className="text-xl font-bold text-zinc-700 dark:text-zinc-300 mobile-xs:text-2xl">
                    {mainPageT('wish_list_page_title')}
                </p>

                <div className="my-6 flex items-center gap-3 tablet-sm:gap-4">
                    <UiAvatar
                        avatar={wishesCreator?.avatar}
                        alt={getFullName(wishesCreator)}
                        priority
                        size={screenWidth < 768 ? 144 : 208}
                        sizeTailwind="w-36 min-w-36 h-36 min-h-36 tablet-md:w-52 tablet-md:min-w-52 tablet-md:h-52 tablet-md:min-h-52"
                        sizeIcon="w-28 h-28 tablet-md:w-40 tablet-md:h-40"
                        handleClick={() =>
                            handleShowImage(
                                wishesCreator?.avatar,
                                getFullName(wishesCreator)
                            )
                        }
                    />

                    <p
                        className="max-w-32 truncate text-2xl font-bold text-zinc-700 dark:text-zinc-300 mobile-xs:max-w-40 mobile-sm:max-w-48 mobile-md:max-w-56 mobile-lg:max-w-60 mobile-xl:max-w-72 tablet-sm:max-w-96 tablet-md:max-w-lg tablet-md:text-3xl tablet-lg:max-w-3xl desktop-xs:max-w-5xl"
                        title={getFullName(wishesCreator)}
                    >
                        {getFullName(wishesCreator)}
                    </p>
                </div>

                <WishList userId={creatorId} />
            </div>

            {!!imageData && (
                <ZoomedImageModal
                    src={imageData.src}
                    alt={imageData.alt}
                    hide={() => setImageData(null)}
                />
            )}
        </main>
    );
};

export default Body;
