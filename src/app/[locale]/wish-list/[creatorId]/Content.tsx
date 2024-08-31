'use client';

import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Breadcrumbs from '@/components/layouts/Breadcrumbs';
import ListIcon from '@/components/icons/ListIcon';

const Content: FC = () => {
    const { creatorId } = useParams<{ creatorId: string }>();

    const mainPageT = useTranslations('main-page');
    const profilePageT = useTranslations('profile-page');

    const pages = [
        {
            href: 'wish-list',
            icon: ListIcon,
            name: profilePageT('wish-list-title'),
        },
    ];

    return (
        <div className="pt-3">
            <Breadcrumbs pages={pages} />

            <div className="mt-3 px-3 pb-5">
                <p className="text-xl font-bold text-zinc-700 dark:text-zinc-300 mobile-xs:text-2xl">
                    {mainPageT('wish-list-page-title')}
                </p>
            </div>
        </div>
    );
};

export default Content;
