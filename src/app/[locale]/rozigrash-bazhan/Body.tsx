import { FC } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Cta from '@/app/[locale]/rozigrash-bazhan/Cta';
import AlgorithmBox from '@/app/[locale]/root-page-components/AlgorithmBox';
import Breadcrumbs from '@/components/layouts/Breadcrumbs';
import CountdownTimer from '@/components/layouts/CountdownTimer';
import UiImage from '@/components/ui/UiImage';
import MainIcon from '@/components/icons/MainIcon';
import CheckedIcon from '@/components/icons/CheckedIcon';
import ChainIcon from '@/components/icons/ChainIcon';
import LogInIcon from '@/components/icons/LogInIcon';
import ShareIcon from '@/components/icons/ShareIcon';
import PeopleIcon from '@/components/icons/PeopleIcon';
import LogoIcon from '@/components/icons/LogoIcon';

const Body: FC = () => {
    const rozigrashBazhanPageT = useTranslations('rozigrash-bazhan-page');
    const welcomePageT = useTranslations('welcome-page');
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

    return (
        <main className="mx-auto mt-3 max-w-7xl">
            <Breadcrumbs
                seoPages={breadcrumbsPages}
                visualPages={breadcrumbsPages}
            />

            <div className="mt-4 bg-rose-500 p-4 text-center text-2xl font-bold text-zinc-800">
                ⚠️ Увага! Інформація на цій сторінці неактуальна та не
                відповідає дійсності. Будь ласка, зверніться до головного сайту
                або служби підтримки для отримання актуальних даних.
                <br />
                <br />
                <div className="h-0.5 w-full bg-zinc-800"></div>
                <br />
                ⚠️ Attention! The information on this page is outdated and does
                not reflect the current reality. Please refer to the main
                website or contact our support team for up-to-date information.
            </div>

            <section className="mt-6 grid gap-6 px-4 pb-6 tablet-md:gap-8 desktop-xs:grid-cols-11 desktop-sm:px-0 desktop-sm:pb-10">
                <div className="desktop-xs:col-span-6">
                    {/* title */}
                    <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200 mobile-xl:text-center tablet-md:text-left tablet-md:text-4xl">
                        {rozigrashBazhanPageT('title')}
                    </h1>

                    {/* sub-title */}
                    <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400 mobile-xl:text-center tablet-md:mt-6 tablet-md:text-left tablet-md:text-lg">
                        {rozigrashBazhanPageT('invite_your_friends')}
                    </p>

                    {/* description */}
                    <div className="tablet-md:before:rotate-5 relative mx-auto mt-10 flex max-w-lg flex-col gap-4 rounded-3xl bg-zinc-400 bg-[url('/images/benefits-bg.webp')] bg-cover bg-center bg-no-repeat pb-6 pl-10 pr-5 pt-5 before:absolute before:inset-0 before:rotate-3 before:rounded-3xl before:border before:border-dashed before:border-zinc-400 dark:bg-zinc-800 before:dark:border-zinc-600 tablet-md:gap-6 tablet-md:py-10 tablet-md:pl-20 tablet-md:pr-16 desktop-xs:max-w-full">
                        <p className="-ml-6 mt-2 text-base text-zinc-600 dark:text-zinc-400 tablet-md:text-lg">
                            {rozigrashBazhanPageT('wish_hub_gives')}
                        </p>

                        <div>
                            <p className="relative text-base font-bold text-zinc-800 dark:text-zinc-200 tablet-md:text-lg">
                                {rozigrashBazhanPageT('participation_is_free')}
                                <CheckedIcon classes="absolute w-5 h-5 -left-2 top-1/2 -translate-x-full -translate-y-1/2 tablet-md:-left-2.5 tablet-md:w-7 tablet-md:h-7" />
                            </p>

                            <p className="mt-2 text-sm font-bold text-zinc-600 dark:text-zinc-400">
                                {rozigrashBazhanPageT('no_hidden_costs')}
                            </p>
                        </div>

                        <div className="w-4/5">
                            <p className="relative text-base font-bold text-zinc-800 dark:text-zinc-200 tablet-md:text-lg">
                                {rozigrashBazhanPageT('chance_to_win')}
                                <CheckedIcon classes="absolute w-5 h-5 -left-2 top-1/2 -translate-x-full -translate-y-1/2 tablet-md:-left-2.5 tablet-md:w-7 tablet-md:h-7" />
                            </p>

                            <p className="mt-2 text-sm font-bold text-zinc-600 dark:text-zinc-400">
                                {rozigrashBazhanPageT('we_will_fulfill')}
                            </p>
                        </div>

                        <div className="w-4/5">
                            <p className="relative text-base font-bold text-zinc-800 dark:text-zinc-200 tablet-md:text-lg">
                                {rozigrashBazhanPageT('fair_random')}
                                <CheckedIcon classes="absolute w-5 h-5 -left-2 top-1/2 -translate-x-full -translate-y-1/2 tablet-md:-left-2.5 tablet-md:w-7 tablet-md:h-7" />
                            </p>

                            <p className="mt-2 text-sm font-bold text-zinc-600 dark:text-zinc-400">
                                {rozigrashBazhanPageT('winner_is_chosen')}
                            </p>
                        </div>

                        <div className="absolute -right-1 bottom-52 h-10 w-10 rotate-45 mobile-lg:-right-2 tablet-md:h-12 tablet-md:w-12">
                            <Image
                                src="/images/gift-small.webp"
                                alt={welcomePageT('alts.smaller_gift')}
                                title={welcomePageT('alts.smaller_gift')}
                                fill
                                sizes={'100%'}
                                className="object-contain"
                            />
                        </div>

                        <div className="absolute bottom-28 right-3.5 h-16 w-16 -rotate-12 tablet-md:right-6 tablet-md:h-20 tablet-md:w-20">
                            <Image
                                src="/images/gift-middle.webp"
                                alt={welcomePageT('alts.middle_gift')}
                                title={welcomePageT('alts.middle_gift')}
                                fill
                                sizes={'100%'}
                                className="object-contain"
                            />
                        </div>

                        <div className="absolute -bottom-2 -right-1.5 h-24 w-24 rotate-12 tablet-md:-bottom-5 tablet-md:h-32 tablet-md:w-32">
                            <Image
                                src="/images/gift-big.webp"
                                alt={welcomePageT('alts.bigger_gift')}
                                title={welcomePageT('alts.bigger_gift')}
                                fill
                                sizes={'100%'}
                                className="object-contain"
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col items-center gap-6">
                        <CountdownTimer
                            promotionTime="2024-12-01T12:00:00+02:00"
                            labelEnd={rozigrashBazhanPageT(
                                'giveaway_has_ended'
                            )}
                            label={rozigrashBazhanPageT('time_left')}
                        />

                        <Cta />
                    </div>
                </div>

                {/* algorithm */}
                <div className="mx-auto flex max-w-lg flex-col items-center desktop-xs:col-span-5 desktop-xs:mx-0 desktop-xs:mt-16 desktop-xs:max-w-full">
                    <AlgorithmBox
                        icon={
                            <LogInIcon classes="w-5 h-5 tablet-md:w-7 tablet-md:h-7 stroke-cyan-500 dark:stroke-cyan-300" />
                        }
                        title={rozigrashBazhanPageT('sign_up_or')}
                        text={rozigrashBazhanPageT('without_account')}
                    />

                    <ChainIcon classes="w-12 min-w-12 h-12 -my-3 rotate-90 desktop-xs:-my-3.5 desktop-xs:w-16 desktop-xs:min-w-16 desktop-xs:h-16" />

                    <AlgorithmBox
                        icon={
                            <ShareIcon iconClasses="w-5 h-5 tablet-md:w-7 tablet-md:h-7 fill-cyan-500 dark:fill-cyan-300" />
                        }
                        title={rozigrashBazhanPageT('share_your_referral')}
                        text={
                            <>
                                {rozigrashBazhanPageT('look_for_link')}
                                <ShareIcon iconClasses="inline mx-0.5 w-4 h-4 fill-cyan-500 dark:fill-cyan-300" />
                                {rozigrashBazhanPageT('and_share_your')}
                            </>
                        }
                    />

                    <ChainIcon classes="w-12 min-w-12 h-12 -my-3 -rotate-90 desktop-xs:-my-3.5 desktop-xs:w-16 desktop-xs:min-w-16 desktop-xs:h-16" />

                    <AlgorithmBox
                        icon={
                            <PeopleIcon classes="w-5 h-5 tablet-md:w-7 tablet-md:h-7 fill-cyan-500 dark:fill-cyan-300" />
                        }
                        title={rozigrashBazhanPageT('invite_friends')}
                        text={rozigrashBazhanPageT('every_registration')}
                    />

                    <ChainIcon classes="w-12 min-w-12 h-12 -my-3 rotate-90 desktop-xs:-my-3.5 desktop-xs:w-16 desktop-xs:min-w-16 desktop-xs:h-16" />

                    <AlgorithmBox
                        icon={
                            <LogoIcon classes="w-5 h-5 tablet-md:w-7 tablet-md:h-7" />
                        }
                        title={rozigrashBazhanPageT('make_sure_you')}
                        text={rozigrashBazhanPageT('this_is_important')}
                    />
                </div>
            </section>
        </main>
    );
};

export default Body;
