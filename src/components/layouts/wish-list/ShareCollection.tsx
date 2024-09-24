'use client';

import { FC, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { EPrivacy } from '@/models/Settings';
import { useWishesStore } from '@/stores/wishes';
import ShareButton from '@/components/layouts/ShareButton';
import UiTooltip from '@/components/ui/UiTooltip';
import InfoIcon from '@/components/icons/InfoIcon';

interface IProps {
    myUserId: string;
}

const ShareCollection: FC<IProps> = ({ myUserId }) => {
    const mainPageT = useTranslations('main-page');

    const wishes = useWishesStore((state) => state.list);

    const wishListIncludesShowAllWish = useMemo(
        () => wishes.some((wish) => wish.show === EPrivacy.ALL),
        [wishes]
    );

    return (
        <div className="ml-auto flex items-center gap-1 tablet-md:ml-0">
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
                    link={`user/${myUserId}/collection`}
                    actionClasses="flex-row-reverse"
                >
                    <span className="mr-1.5 whitespace-nowrap py-2.5 text-sm text-zinc-700 dark:text-zinc-400">
                        {mainPageT('share_wishes')}
                    </span>
                </ShareButton>
            </div>
        </div>
    );
};

export default ShareCollection;
