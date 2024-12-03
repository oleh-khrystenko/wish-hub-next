import { FC } from 'react';
import { useTranslations } from 'next-intl';
import Cta from '@/app/[locale]/rozigrash-bazhan/Cta';
import CandidatesForWin from '@/app/[locale]/rozigrash-bazhan/CandidatesForWin';
import Algorithm from '@/app/[locale]/rozigrash-bazhan/Algorithm';
import Description from '@/app/[locale]/rozigrash-bazhan/Description';
import TempItem from '@/app/[locale]/rozigrash-bazhan/TempItem';
import Breadcrumbs from '@/components/layouts/Breadcrumbs';
import CountdownTimer from '@/components/layouts/CountdownTimer';
import NotRelevantInfo from '@/components/layouts/NotRelevantInfo';
import Divider from '@/components/layouts/Divider';
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
        <main className="mt-3 pb-10 tablet-md:pb-16">
            <div className="mx-auto max-w-7xl">
                <Breadcrumbs
                    seoPages={breadcrumbsPages}
                    visualPages={breadcrumbsPages}
                />

                <NotRelevantInfo />
            </div>

            <section className="mx-auto mt-6 grid max-w-7xl gap-6 px-4 pb-10 tablet-md:gap-8 tablet-md:pb-16 desktop-xs:grid-cols-11 desktop-xs:px-0">
                <div className="mx-auto tablet-md:w-3/4 desktop-xs:col-span-6 desktop-xs:mx-0 desktop-xs:w-full">
                    <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200 mobile-xl:text-center tablet-md:text-left tablet-md:text-4xl">
                        {rozigrashBazhanPageT('title')}
                    </h1>

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

            <Divider />

            <section className="mx-auto mt-4 max-w-7xl px-4 tablet-md:mt-10 desktop-xs:px-0">
                <div className="mx-auto mt-10 tablet-md:mt-16 tablet-md:w-3/4 desktop-xs:mx-0 desktop-xs:w-2/5">
                    <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200 mobile-xl:text-center tablet-md:text-left tablet-md:text-4xl">
                        {rozigrashBazhanPageT('terms')}
                    </h2>

                    <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400 mobile-xl:text-center tablet-md:mt-6 tablet-md:text-left tablet-md:text-lg">
                        {rozigrashBazhanPageT('invite_your_friends')}
                    </p>
                </div>

                <ul className="mx-auto mt-10 grid gap-6 tablet-md:w-3/4 desktop-xs:mx-0 desktop-xs:w-full desktop-xs:grid-cols-2">
                    <TempItem
                        count={1}
                        title={rozigrashBazhanPageT('Lorem')}
                        text={rozigrashBazhanPageT('ipsum')}
                    />

                    <TempItem
                        count={2}
                        title={rozigrashBazhanPageT('Lorem')}
                        text={rozigrashBazhanPageT('ipsum')}
                    />

                    <TempItem
                        count={3}
                        title={rozigrashBazhanPageT('Lorem')}
                        text={rozigrashBazhanPageT('ipsum')}
                    />

                    <TempItem
                        count={4}
                        title={rozigrashBazhanPageT('Lorem')}
                        text={rozigrashBazhanPageT('ipsum')}
                    />
                </ul>

                <CandidatesForWin />
            </section>
        </main>
    );
};

export default Body;
