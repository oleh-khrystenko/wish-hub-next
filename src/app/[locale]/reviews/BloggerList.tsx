import { FC } from 'react';
import VideoItem from '@/components/layouts/VideoItem';
import { useTranslations } from 'next-intl';

interface IProps {
    isBloggerActive: boolean;
}

const BloggerList: FC<IProps> = ({ isBloggerActive }) => {
    const reviewsPageT = useTranslations('reviews-page');

    return (
        <div
            className="mt-4"
            role="tabpanel"
            id="panel-bloggers"
            aria-labelledby="tab-bloggers"
            hidden={!isBloggerActive}
        >
            <ul className="mt-8 grid gap-6 tablet-md:grid-cols-2 tablet-md:gap-4 tablet-lg:mt-12 tablet-lg:grid-cols-3">
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
    );
};

export default BloggerList;
