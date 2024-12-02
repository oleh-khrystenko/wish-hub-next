import { FC } from 'react';
import { useTranslations } from 'next-intl';
import Cta from '@/app/[locale]/rozigrash-bazhan/Cta';
import CandidatesForWin from '@/app/[locale]/rozigrash-bazhan/CandidatesForWin';
import Algorithm from '@/app/[locale]/rozigrash-bazhan/Algorithm';
import Description from '@/app/[locale]/rozigrash-bazhan/Description';
import Breadcrumbs from '@/components/layouts/Breadcrumbs';
import CountdownTimer from '@/components/layouts/CountdownTimer';
import NotRelevantInfo from '@/components/layouts/NotRelevantInfo';
import UiImage from '@/components/ui/UiImage';
import MainIcon from '@/components/icons/MainIcon';

const Body: FC = () => {
    const rozigrashBazhanPageT = useTranslations('rozigrash-bazhan-page');
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
            href: 'rozigrash-bazhan',
            icon: (
                <div className="relative h-4 w-4">
                    <UiImage
                        src="/icons/gift-box-3D.webp"
                        alt={allPagesT('rozigrash-bazhan')}
                    />
                </div>
            ),
            name: allPagesT('rozigrash-bazhan'),
        },
    ];

    const promotionTime = '2024-12-15T12:00:00+02:00';

    return (
        <main className="mx-auto mt-3 max-w-7xl pb-10 tablet-md:pb-16">
            <Breadcrumbs
                seoPages={breadcrumbsPages}
                visualPages={breadcrumbsPages}
            />

            <NotRelevantInfo />

            <section className="mt-6 grid gap-6 px-4 tablet-md:gap-8 desktop-xs:grid-cols-11 desktop-sm:px-0">
                <div className="desktop-xs:col-span-6">
                    {/* title */}
                    <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200 mobile-xl:text-center tablet-md:text-left tablet-md:text-4xl">
                        {rozigrashBazhanPageT('title')}
                    </h1>

                    {/* sub-title */}
                    <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400 mobile-xl:text-center tablet-md:mt-6 tablet-md:text-left tablet-md:text-lg">
                        {rozigrashBazhanPageT('invite_your_friends')}
                    </p>

                    <Description />

                    <div className="mt-6 flex flex-col items-center gap-5">
                        <CountdownTimer
                            promotionTime={promotionTime}
                            labelEnd={rozigrashBazhanPageT(
                                'giveaway_has_ended'
                            )}
                            label={rozigrashBazhanPageT('time_left')}
                        />

                        <Cta />
                    </div>
                </div>

                <Algorithm />
            </section>

            <CandidatesForWin />
        </main>
    );
};

export default Body;
