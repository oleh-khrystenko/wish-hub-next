'use client';

import { FC } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Breadcrumbs from '@/components/layouts/Breadcrumbs';
import MainIcon from '@/components/icons/MainIcon';
import EditIcon from '@/components/icons/EditIcon';
import LogoIcon from '@/components/icons/LogoIcon';
import CollectionIcon from '@/components/icons/CollectionIcon';

const Body: FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const searchParams = useSearchParams();

    const wishPageT = useTranslations('wish-page');
    const allPagesT = useTranslations('all-pages');

    const wishId = searchParams.get('wishId');

    const seoPages = [
        {
            href: 'main',
            name: allPagesT('main'),
        },
        {
            href: `user/${userId}/wish`,
            name: allPagesT('wish'),
        },
        {
            href: `user/${userId}/wish/editor`,
            name: allPagesT('wish_editor'),
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
        {
            href: `user/${userId}/wish/editor`,
            icon: (
                <EditIcon classes="w-3.5 h-3.5 fill-zinc-200 dark:fill-zinc-400" />
            ),
            name: allPagesT('wish_editor'),
        },
    ];

    const fromPage = searchParams.get('fromPage');
    if (fromPage) {
        if (fromPage === 'main') {
            delete visualPages[1];
        }
    }

    return (
        <main className="flex grow flex-col pt-3">
            <Breadcrumbs seoPages={seoPages} visualPages={visualPages} />

            <div className="mt-3 flex grow flex-col px-3 pb-5 desktop-sm:px-0">
                <h1 className="text-xl font-bold text-zinc-700 dark:text-zinc-300 mobile-xs:text-2xl">
                    {wishPageT(wishId ? 'editing_wish' : 'creating_wish')}
                </h1>

                {wishId ? <p>Edit</p> : <p>Create</p>}
            </div>
        </main>
    );
};

export default Body;
