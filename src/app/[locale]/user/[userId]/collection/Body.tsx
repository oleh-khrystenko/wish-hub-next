'use client';

import { FC, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { EPrivacy, IZoomedImage } from '@/models/Settings';
import { useMyUserStore } from '@/stores/my-user';
import { useWishesStore } from '@/stores/wishes';
import UseFullName from '@/helpers/hooks/UseFullName';
import UseScreenWidth from '@/helpers/hooks/UseScreenWidth';
import WishList from '@/app/[locale]/user/[userId]/collection/WishList';
import Breadcrumbs from '@/components/layouts/Breadcrumbs';
import ZoomedImageModal from '@/components/layouts/ZoomedImageModal';
import ShareButton from '@/components/layouts/ShareButton';
import UiTooltip from '@/components/ui/UiTooltip';
import UiAvatar from '@/components/ui/UiAvatar';
import CollectionIcon from '@/components/icons/CollectionIcon';
import MainIcon from '@/components/icons/MainIcon';
import InfoIcon from '@/components/icons/InfoIcon';

const Body: FC = () => {
    const [imageData, setImageData] = useState<IZoomedImage | null>(null);

    const { userId } = useParams<{ userId: string }>();

    const collectionT = useTranslations('collection-page');
    const mainPageT = useTranslations('main-page');
    const allPagesT = useTranslations('all-pages');

    const myUser = useMyUserStore((state) => state.myUser);

    const wishes = useWishesStore((state) => state.list);
    const wishesCreator = useWishesStore((state) => state.creator);

    const { getFullName } = UseFullName();
    const screenWidth = UseScreenWidth();

    const wishListIncludesShowAllWish = useMemo(
        () => wishes.some((wish) => wish.show === EPrivacy.ALL),
        [wishes]
    );

    const breadcrumbsPages = [
        {
            href: 'main',
            icon: (
                <MainIcon classes="w-3.5 h-3.5 fill-zinc-500 dark:fill-zinc-400 group-hover:dark:fill-zinc-600" />
            ),
            name: allPagesT('main'),
        },
        {
            href: `user/${userId}/collection`,
            icon: (
                <CollectionIcon classes="w-4 h-4 fill-zinc-200 dark:fill-zinc-400" />
            ),
            name: allPagesT('collection'),
        },
    ];

    const handleShowImage = (src: string | undefined, alt: string) => {
        src ? setImageData({ src, alt }) : setImageData(null);
    };

    return (
        <main className="flex grow flex-col pt-3">
            <Breadcrumbs
                seoPages={breadcrumbsPages}
                visualPages={breadcrumbsPages}
            />

            <div className="mt-3 flex grow flex-col px-3 pb-5 desktop-sm:px-0">
                <div className="flex flex-col gap-5 tablet-md:flex-row tablet-md:items-center tablet-md:justify-between">
                    <h1 className="text-xl font-bold text-zinc-700 dark:text-zinc-300 mobile-xs:text-2xl">
                        {collectionT(
                            myUser?.id === userId ? 'title_your' : 'title'
                        )}
                    </h1>

                    {myUser?.id === userId && (
                        <div className="ml-auto flex items-center gap-1 tablet-md:ml-0">
                            <span
                                className="cursor-pointer"
                                data-tooltip-id="share-wishes"
                                data-tooltip-content={
                                    wishListIncludesShowAllWish
                                        ? mainPageT('can-see.share-tooltip')
                                        : mainPageT(
                                              'can-see.inactive-share-tooltip'
                                          )
                                }
                            >
                                <InfoIcon />
                            </span>
                            <UiTooltip id="share-wishes" />

                            <div
                                className={
                                    wishListIncludesShowAllWish
                                        ? ''
                                        : 'pointer-events-none opacity-20'
                                }
                            >
                                <ShareButton
                                    link={`user/${myUser.id}/collection`}
                                    actionClasses="flex-row-reverse"
                                >
                                    <span className="mr-1.5 whitespace-nowrap text-sm text-zinc-700 dark:text-zinc-400">
                                        {mainPageT('share_wishes')}
                                    </span>
                                </ShareButton>
                            </div>
                        </div>
                    )}
                </div>

                {myUser?.id !== userId && (
                    <div className="mt-6 flex items-center gap-3 tablet-sm:gap-4">
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
                )}

                <WishList userId={userId} />
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
