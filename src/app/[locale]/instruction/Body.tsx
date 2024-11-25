import { FC } from 'react';
import { useTranslations } from 'next-intl';
import Tabs from '@/app/[locale]/instruction/Tabs';
import Breadcrumbs from '@/components/layouts/Breadcrumbs';
import UiImage from '@/components/ui/UiImage';
import MainIcon from '@/components/icons/MainIcon';
import YouTubeIcon from '@/components/icons/YouTubeIcon';

const Body: FC = () => {
    const instructionPageT = useTranslations('instruction-page');
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
            href: 'instruction',
            icon: <YouTubeIcon classes="w-4 h-4" />,
            name: allPagesT('instruction'),
        },
    ];

    return (
        <main className="mx-auto mt-3 max-w-7xl">
            <Breadcrumbs
                seoPages={breadcrumbsPages}
                visualPages={breadcrumbsPages}
            />

            <div className="mt-6 flex flex-col gap-5 px-4 pb-6 desktop-sm:px-0 desktop-sm:pb-10">
                <section className="flex flex-col">
                    <h1 className="text-3xl font-bold text-zinc-700 dark:text-zinc-300 tablet-md:text-4xl">
                        {instructionPageT('title')}
                        <span className="whitespace-nowrap">Wish Hub</span>
                    </h1>

                    <Tabs />
                </section>
            </div>
        </main>
    );
};

export default Body;
