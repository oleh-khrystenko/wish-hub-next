'use client';

import { FC } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import WishList from '@/app/[locale]/user/[userId]/collection/editor/WishList';
import Breadcrumbs from '@/components/layouts/Breadcrumbs';
import CollectionIcon from '@/components/icons/CollectionIcon';
import MainIcon from '@/components/icons/MainIcon';
import EditIcon from '@/components/icons/EditIcon';

const Body: FC = () => {
    const { userId } = useParams<{ userId: string }>();

    const collectionT = useTranslations('collection-page');
    const allPagesT = useTranslations('all-pages');

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
        {
            href: `user/${userId}/collection/editor`,
            icon: (
                <EditIcon classes="w-4 h-4 fill-zinc-200 dark:fill-zinc-400" />
            ),
            name: allPagesT('editor'),
        },
    ];

    return (
        <main className="flex grow flex-col pt-3">
            <Breadcrumbs
                seoPages={breadcrumbsPages}
                visualPages={breadcrumbsPages}
            />

            <div className="mt-3 flex grow flex-col px-3 pb-5 desktop-sm:px-0">
                <h1 className="text-xl font-bold text-zinc-700 dark:text-zinc-300 mobile-xs:text-2xl">
                    {collectionT('editor_title')}
                </h1>

                <WishList userId={userId} />
            </div>
        </main>
    );
};

export default Body;
