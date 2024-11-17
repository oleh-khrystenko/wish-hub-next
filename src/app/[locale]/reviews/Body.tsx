import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { IReview } from '@/models/Review';
import Tabs from '@/app/[locale]/reviews/Tabs';
import Breadcrumbs from '@/components/layouts/Breadcrumbs';
import MainIcon from '@/components/icons/MainIcon';
import ReviewIcon from '@/components/icons/ReviewIcon';

interface IProps {
    reviews: IReview[];
}

const Body: FC<IProps> = ({ reviews }) => {
    const reviewsPageT = useTranslations('reviews-page');
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
            href: 'reviews',
            icon: (
                <ReviewIcon classes="w-4 h-4 fill-zinc-500 dark:fill-zinc-400 group-hover:dark:fill-zinc-600" />
            ),
            name: allPagesT('reviews'),
        },
    ];

    return (
        <main className="mx-auto mt-3 w-full max-w-7xl">
            <Breadcrumbs
                seoPages={breadcrumbsPages}
                visualPages={breadcrumbsPages}
            />

            <section className="mt-6 flex flex-col px-4 pb-6 desktop-sm:px-0 desktop-sm:pb-10">
                <h1 className="text-4xl font-bold text-zinc-700 dark:text-zinc-300">
                    {reviewsPageT('title')}
                </h1>

                <Tabs reviews={reviews} />
            </section>
        </main>
    );
};

export default Body;
