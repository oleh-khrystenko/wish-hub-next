'use client';

import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { IReview } from '@/models/Review';
import VideoItem from '@/components/layouts/VideoItem';
import UiButton from '@/components/ui/UiButton';

interface IProps {
    reviews: IReview[];
}

const Tabs: FC<IProps> = ({ reviews }) => {
    const [isBloggerActive, setIsBloggerActive] = useState<boolean>(true);

    const reviewsPageT = useTranslations('reviews-page');

    return (
        <>
            <div
                className="mt-4 flex items-center transition-all duration-300 ease-in-out"
                role="tablist"
                aria-label={reviewsPageT('title')}
            >
                <UiButton
                    classesWrap={`${isBloggerActive ? 'bg-cyan-400 dark:bg-cyan-300 text-zinc-700' : 'bg-zinc-300 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-cyan-400 hover:dark:text-cyan-300'} px-3 mobile-sm:px-4 py-0.5 text-xs mobile-xs:text-sm mobile-md:text-base rounded-l mobile-md:rounded-l-md font-bold transition-all duration-300 ease-in-out`}
                    variant="clear-styles"
                    role="tab"
                    id="tab-bloggers"
                    ariaControls="panel-bloggers"
                    ariaSelected="true"
                    onBtnClick={() => setIsBloggerActive(true)}
                >
                    {reviewsPageT('blogger_reviews')}
                </UiButton>

                <UiButton
                    classesWrap={`${isBloggerActive ? 'bg-zinc-300 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-cyan-400 hover:dark:text-cyan-300' : 'bg-cyan-400 dark:bg-cyan-300 text-zinc-700'} px-3 mobile-sm:px-4 py-0.5 text-xs mobile-xs:text-sm mobile-md:text-base rounded-r mobile-md:rounded-r-md font-bold transition-all duration-300 ease-in-out`}
                    variant="clear-styles"
                    role="tab"
                    id="tab-users"
                    ariaControls="panel-users"
                    ariaSelected="false"
                    onBtnClick={() => setIsBloggerActive(false)}
                >
                    {reviewsPageT('user_reviews')}
                </UiButton>
            </div>

            <div
                className="mt-4"
                role="tabpanel"
                id="panel-bloggers"
                aria-labelledby="tab-bloggers"
                hidden={!isBloggerActive}
            >
                <h2 className="text-xl font-bold text-zinc-700 dark:text-zinc-300">
                    {reviewsPageT('blogger_reviews')}
                </h2>

                <ul className="mt-8 grid gap-6 tablet-md:grid-cols-2 tablet-md:gap-8 tablet-lg:mt-12">
                    {/* victoria_zaritska_ */}
                    <VideoItem
                        src="https://www.youtube.com/embed/HOQHwBJyn1o?si=9huBXWRw-okfyeT5"
                        title={
                            <>
                                {reviewsPageT('review_from_blogger')}{' '}
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
                                {reviewsPageT('review_from_blogger')}{' '}
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
                                {reviewsPageT('review_from_blogger')}{' '}
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
                                {reviewsPageT('review_from_blogger')}{' '}
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
                                {reviewsPageT('review_from_blogger')}{' '}
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
                                {reviewsPageT('review_from_blogger')}{' '}
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
            </div>

            <div
                className="mt-4"
                role="tabpanel"
                id="panel-users"
                aria-labelledby="tab-users"
                hidden={isBloggerActive}
            >
                <h2 className="text-xl font-bold text-zinc-700 dark:text-zinc-300">
                    {reviewsPageT('user_reviews')}
                </h2>

                {reviews.length > 0 && (
                    <ul className="grid gap-3 tablet-md:grid-cols-2 tablet-lg:grid-cols-4 tablet-lg:gap-4">
                        {reviews.map((review) => (
                            <li key={review.id}>{review.fullName}</li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default Tabs;
