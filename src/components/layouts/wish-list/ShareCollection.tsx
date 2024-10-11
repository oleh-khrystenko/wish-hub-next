'use client';

import { FC, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { EPrivacy } from '@/models/Settings';
import { useMyUserStore } from '@/stores/my-user';
import { useWishesStore } from '@/stores/wishes';
import ShareButton from '@/components/layouts/ShareButton';
import UiTooltip from '@/components/ui/UiTooltip';
import InfoIcon from '@/components/icons/InfoIcon';

interface IProps {
    myUserId: string;
}

const ShareCollection: FC<IProps> = ({ myUserId }) => {
    const searchParams = useSearchParams();

    const mainPageT = useTranslations('main-page');

    const myUser = useMyUserStore((state) => state.myUser);

    const wishes = useWishesStore((state) => state.list);

    const wishListIncludesShowAllWish = useMemo(
        () => wishes.some((wish) => wish.show === EPrivacy.ALL),
        [wishes]
    );

    const collectionId = searchParams.get('collectionId');

    let additionalParams = '';
    if (collectionId) {
        additionalParams = `?collectionId=${collectionId}${myUser ? `&utm_source=user&utm_medium=share&utm_campaign=user_${myUser.id}` : ''}`;
    } else {
        myUser &&
            (additionalParams = `?utm_source=user&utm_medium=share&utm_campaign=user_${myUser.id}`);
    }

    return (
        <div className="ml-auto flex items-center gap-1">
            <span
                className="cursor-pointer"
                data-tooltip-id="share-wishes"
                data-tooltip-content={
                    wishListIncludesShowAllWish
                        ? mainPageT('can-see.share-tooltip')
                        : mainPageT('can-see.inactive-share-tooltip')
                }
            >
                <InfoIcon />
            </span>
            <UiTooltip id="share-wishes" />

            <div
                className={
                    wishListIncludesShowAllWish
                        ? 'ml-1'
                        : 'pointer-events-none ml-1 opacity-20'
                }
            >
                <ShareButton
                    link={`/user/${myUserId}/collection${additionalParams}`}
                    actionClasses="flex-row-reverse"
                >
                    <span className="mr-1.5 whitespace-nowrap py-2.5 text-sm text-zinc-700 dark:text-zinc-400">
                        {mainPageT(
                            collectionId ? 'share_collection' : 'share_wishes'
                        )}
                    </span>
                </ShareButton>
            </div>
        </div>
    );
};

export default ShareCollection;
