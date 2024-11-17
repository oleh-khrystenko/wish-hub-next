import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { IReview } from '@/models/Review';
import Breadcrumbs from '@/components/layouts/Breadcrumbs';
import VideoItem from '@/components/layouts/VideoItem';
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

                <ul className="mt-8 grid gap-6 tablet-md:grid-cols-2 tablet-md:gap-8 tablet-lg:mt-12">
                    {/* victoria_zaritska_ */}
                    <VideoItem
                        src="https://www.youtube.com/embed/HOQHwBJyn1o?si=9huBXWRw-okfyeT5"
                        title={
                            <>
                                {reviewsPageT('blogger_review')}{' '}
                                <a
                                    href="https://www.instagram.com/victoria_zaritska_/"
                                    target="_blank"
                                    rel="noopener noreferrer external nofollow"
                                    className="font-bold text-cyan-400 dark:text-cyan-300"
                                >
                                    victoria_zaritska_
                                </a>
                            </>
                        }
                    />

                    {/* andina_witch */}
                    <VideoItem
                        src="https://www.youtube.com/embed/spLbM03seRs?si=mfuLHnOVpkBjPR2C"
                        title={
                            <>
                                {reviewsPageT('blogger_review')}{' '}
                                <a
                                    href="https://www.instagram.com/andina_witch/"
                                    target="_blank"
                                    rel="noopener noreferrer external nofollow"
                                    className="font-bold text-cyan-400 dark:text-cyan-300"
                                >
                                    andina_witch
                                </a>
                            </>
                        }
                    />

                    {/* tasya.yaroshenko */}
                    <VideoItem
                        src="https://www.youtube.com/embed/r8BcvobVv8w?si=WpnfCwcydxvp4_7T"
                        title={
                            <>
                                {reviewsPageT('blogger_review')}{' '}
                                <a
                                    href="https://www.instagram.com/reel/DBjDEC5NOuo/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
                                    target="_blank"
                                    rel="noopener noreferrer external nofollow"
                                    className="font-bold text-cyan-400 dark:text-cyan-300"
                                >
                                    tasya.yaroshenko
                                </a>
                            </>
                        }
                    />

                    {/* julia_leonets */}
                    <VideoItem
                        src="https://www.youtube.com/embed/XX8btPo2Lps?si=KF_aaed2sFMPrbVM"
                        title={
                            <>
                                {reviewsPageT('blogger_review')}{' '}
                                <a
                                    href="https://www.instagram.com/julia_leonets/"
                                    target="_blank"
                                    rel="noopener noreferrer external nofollow"
                                    className="font-bold text-cyan-400 dark:text-cyan-300"
                                >
                                    julia_leonets
                                </a>
                            </>
                        }
                    />

                    {/* stushastu99 */}
                    <VideoItem
                        src="https://www.youtube.com/embed/Xv_b7mU8mZY?si=TbiowVrvHAg452CP"
                        title={
                            <>
                                {reviewsPageT('blogger_review')}{' '}
                                <a
                                    href="https://www.instagram.com/stushastu99/"
                                    target="_blank"
                                    rel="noopener noreferrer external nofollow"
                                    className="font-bold text-cyan-400 dark:text-cyan-300"
                                >
                                    stushastu99
                                </a>
                            </>
                        }
                    />

                    {/* liayurova */}
                    <VideoItem
                        src="https://www.youtube.com/embed/dmzzpExQg7Q?si=wQfplgmGlBRsRkgp"
                        title={
                            <>
                                {reviewsPageT('blogger_review')}{' '}
                                <a
                                    href="https://www.instagram.com/liayurova/"
                                    target="_blank"
                                    rel="noopener noreferrer external nofollow"
                                    className="font-bold text-cyan-400 dark:text-cyan-300"
                                >
                                    liayurova
                                </a>
                            </>
                        }
                    />
                </ul>

                {reviews.length > 0 && (
                    <ul className="grid grid-cols-2 gap-1.5 tablet-md:grid-cols-3 tablet-lg:grid-cols-4 tablet-lg:gap-4">
                        {reviews.map((review) => (
                            <li key={review.id}>{review.fullName}</li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    );
};

export default Body;
