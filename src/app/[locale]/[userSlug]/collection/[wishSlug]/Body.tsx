'use client';

import { FC, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { IPageParams } from '@/models/settings';
import { useMyUserStore } from '@/stores/my-user';
import { useWishesStore } from '@/stores/wishes';
import { WISH_SLUG_TO_ID_MAP } from '@/helpers/utils/constants';
import Wish from '@/app/[locale]/[userSlug]/collection/[wishSlug]/Wish';
import Breadcrumbs from '@/components/layouts/Breadcrumbs';
import UiButton from '@/components/ui/UiButton';
import LogoIcon from '@/components/icons/LogoIcon';
import MainIcon from '@/components/icons/MainIcon';
import CollectionIcon from '@/components/icons/CollectionIcon';

const Body: FC = () => {
    const gotWish = useRef(false);

    const { userSlug, wishSlug } = useParams<IPageParams['params']>();

    const wishPageT = useTranslations('wish-page');
    const allPagesT = useTranslations('all-pages');

    const myUser = useMyUserStore((state) => state.myUser);

    const wish = useWishesStore((state) => state.wish);
    const getWish = useWishesStore((state) => state.getWish);

    const seoPages = [
        {
            href: 'main',
            name: allPagesT('main'),
        },
        {
            href: `${userSlug}/${wishSlug}`,
            name: allPagesT('wish'),
        },
    ];

    const visualPages = [
        {
            href: 'main',
            icon: (
                <MainIcon classes="w-3.5 h-3.5 fill-zinc-500 dark:fill-zinc-400 group-hover:dark:fill-zinc-600" />
            ),
            name: allPagesT('main'),
        },
        {
            href: `${userSlug}/collection`,
            icon: (
                <CollectionIcon classes="w-4 h-4 fill-zinc-200 dark:fill-zinc-400" />
            ),
            name: allPagesT('collection'),
        },
        {
            href: `${userSlug}/collection/${wishSlug}`,
            icon: <LogoIcon classes="w-4 h-4" />,
            name: allPagesT('wish'),
        },
    ];

    useEffect(() => {
        if (gotWish.current) return;
        gotWish.current = true;

        if (!wishSlug) return;

        const wishId = WISH_SLUG_TO_ID_MAP[wishSlug];

        if (!wishId) return;

        getWish(
            { wishId },
            true,
            allPagesT('wishes-api.get-wish.error')
        ).finally();
    }, []);

    return (
        <main className="flex grow flex-col overflow-y-auto pt-3">
            <Breadcrumbs seoPages={seoPages} visualPages={visualPages} />

            {wish ? (
                <Wish />
            ) : (
                <div className="flex w-full grow flex-col items-center justify-center gap-6 p-4">
                    <p className="text-center text-base text-zinc-700 dark:text-zinc-300 tablet-md:text-lg desktop-sm:text-xl">
                        {wishPageT('empty')}
                    </p>

                    <UiButton href={myUser ? '/main' : '/'}>
                        {wishPageT('to_main')}
                    </UiButton>
                </div>
            )}
        </main>
    );
};

export default Body;
