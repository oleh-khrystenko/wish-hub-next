'use client';

import { FC, useEffect, useState, useRef } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { IGuestWish } from '@/models/Wish';
import { IActionWish, IGetAnyWish } from '@/stores/wishes/types';
import { useMyUserStore } from '@/stores/my-user';
import { useWishesStore } from '@/stores/wishes';
import SavedWish from '@/app/[locale]/user/[userId]/wish/SavedWish';
import GuestWish from '@/app/[locale]/user/[userId]/wish/GuestWish';
import Breadcrumbs from '@/components/layouts/Breadcrumbs';
import UiButton from '@/components/ui/UiButton';
import LogoIcon from '@/components/icons/LogoIcon';
import MainIcon from '@/components/icons/MainIcon';
import CollectionIcon from '@/components/icons/CollectionIcon';

const Body: FC = () => {
    const [guestWish, setGuestWish] = useState<IGuestWish | undefined>(
        undefined
    );

    const gotWish = useRef(false);

    const { userId } = useParams<{ userId: string }>();
    const searchParams = useSearchParams();

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
            href: `user/${userId}/wish`,
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
            href: `user/${userId}/collection`,
            icon: (
                <CollectionIcon classes="w-4 h-4 fill-zinc-200 dark:fill-zinc-400" />
            ),
            name: allPagesT('collection'),
        },
        {
            href: `user/${userId}/wish`,
            icon: <LogoIcon classes="w-4 h-4" />,
            name: allPagesT('wish'),
        },
    ];

    const fromPage = searchParams.get('fromPage');
    if (fromPage) {
        if (fromPage === 'main') {
            delete visualPages[1];
        }
    }

    useEffect(() => {
        if (gotWish.current) return;
        gotWish.current = true;

        if (userId.includes('guest')) return;

        const anyWishId = searchParams.get('anyWishId');

        const wishId = searchParams.get('wishId') || anyWishId;

        if (!wishId) return;

        const params: IGetAnyWish | IActionWish = {
            wishId,
        };
        !anyWishId && myUser && ((params as IActionWish).userId = myUser.id);

        getWish(
            params,
            !!anyWishId,
            allPagesT('wishes-api.get-wish.error')
        ).finally();
    }, [myUser?.id, searchParams]);

    useEffect(() => {
        if (myUser || !userId.includes('guest')) return;

        const guestWishes = localStorage.getItem('guestWishes') || '';

        const parsedGuestWishes: IGuestWish[] =
            guestWishes.length > 0
                ? (JSON.parse(guestWishes) as IGuestWish[])
                : [];

        const wishId = searchParams.get('wishId');

        const currentGuestWish = parsedGuestWishes.find(
            (wish) => wish.id === wishId
        );
        setGuestWish(currentGuestWish);
    }, [myUser, userId, searchParams]);

    return (
        <main className="flex grow flex-col overflow-y-auto pt-3">
            <Breadcrumbs seoPages={seoPages} visualPages={visualPages} />

            {wish ? (
                <SavedWish />
            ) : (
                <>
                    {guestWish ? (
                        <GuestWish wish={guestWish} />
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
                </>
            )}
        </main>
    );
};

export default Body;
