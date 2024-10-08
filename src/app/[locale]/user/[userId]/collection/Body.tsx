'use client';

import { FC, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ICollection } from '@/models/Collection';
import { IZoomedImage } from '@/models/Settings';
import { useMyUserStore } from '@/stores/my-user';
import { useWishesStore } from '@/stores/wishes';
import collectionApi from '@/stores/collection/api';
import UseFullName from '@/helpers/hooks/UseFullName';
import UseScreenWidth from '@/helpers/hooks/UseScreenWidth';
import WishList from '@/app/[locale]/user/[userId]/collection/WishList';
import Breadcrumbs from '@/components/layouts/Breadcrumbs';
import ZoomedImageModal from '@/components/layouts/ZoomedImageModal';
import UiAvatar from '@/components/ui/UiAvatar';
import CollectionIcon from '@/components/icons/CollectionIcon';
import MainIcon from '@/components/icons/MainIcon';

const Body: FC = () => {
    const [collectionName, setCollectionName] =
        useState<ICollection['name']>('');
    const [imageData, setImageData] = useState<IZoomedImage | null>(null);

    const { userId } = useParams<{ userId: string }>();
    const searchParams = useSearchParams();

    const collectionPageT = useTranslations('collection-page');
    const allPagesT = useTranslations('all-pages');

    const myUser = useMyUserStore((state) => state.myUser);

    const wishesCreator = useWishesStore((state) => state.creator);

    const { getFullName } = UseFullName();
    const screenWidth = UseScreenWidth();

    const collectionId = searchParams.get('collectionId');

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

    useEffect(() => {
        if (!collectionId) return;

        const fetchCollection = async () => {
            const response = await collectionApi.getCollection({
                collectionId,
            });

            setCollectionName(response.data.name);
        };

        fetchCollection().finally();
    }, []);

    return (
        <main className="flex grow flex-col pt-3">
            <Breadcrumbs
                seoPages={breadcrumbsPages}
                visualPages={breadcrumbsPages}
            />

            <div className="mt-3 flex grow flex-col px-3 pb-5 desktop-sm:px-0">
                <h1 className="text-xl font-bold text-zinc-700 dark:text-zinc-300 mobile-xs:text-2xl">
                    {collectionPageT(
                        myUser?.id === userId ? 'my_collection' : 'collection'
                    )}

                    {collectionId && (
                        <>
                            &nbsp;
                            <span className="italic text-zinc-900 dark:text-zinc-100">
                                &quot;
                                {collectionName}
                                &quot;
                            </span>
                        </>
                    )}

                    {myUser?.id !== userId && (
                        <>&nbsp;{collectionPageT('of_user')}:</>
                    )}
                </h1>

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
