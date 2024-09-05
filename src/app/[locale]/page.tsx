import {
    NextIntlClientProvider,
    useMessages,
    useTranslations,
} from 'next-intl';
import pick from 'lodash.pick';
import Image from 'next/image';
import Refresh from '@/helpers/hocs/Refresh';
import Header from '@/app/[locale]/root-page-components/Header';
import CoverFigure from '@/app/[locale]/root-page-components/CoverFigure';
import Action from '@/app/[locale]/root-page-components/Action';
import Divider from '@/app/[locale]/root-page-components/Divider';

export default function Welcome() {
    const messages = useMessages();
    const welcomePageT = useTranslations('welcome-page');

    return (
        <main className="flex h-full min-h-screen flex-col bg-zinc-300 dark:bg-zinc-900">
            <section className="bg-rose-cyan-rose bg-cover bg-[80%_50%] bg-no-repeat px-4 pb-10 tablet-md:pb-20 desktop-xs:p-0 desktop-sm:bg-center">
                <div className="relative mx-auto max-w-7xl pb-10 pt-20 tablet-md:pb-28 tablet-md:pt-[104px]">
                    <NextIntlClientProvider
                        messages={pick(messages, ['welcome-page', 'alerts'])}
                    >
                        <Refresh withoutLoading>
                            <Header />
                        </Refresh>
                    </NextIntlClientProvider>

                    <div className="desktop-sm:grid desktop-sm:grid-cols-2 desktop-sm:gap-y-9">
                        <div className="mx-auto tablet-md:w-3/4 desktop-sm:mx-0 desktop-sm:w-auto">
                            <h1 className="text-4xl font-bold text-zinc-800 dark:text-zinc-200 mobile-xl:text-center tablet-md:text-left tablet-md:text-6xl desktop-sm:w-[110%]">
                                {welcomePageT('wish_hub_makes')}
                            </h1>

                            <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400 mobile-xl:text-center tablet-md:mt-6 tablet-md:text-left tablet-md:text-lg desktop-sm:w-4/5 desktop-md:w-11/12">
                                {welcomePageT('unique_platform')}
                            </p>
                        </div>

                        <CoverFigure />

                        <div className="relative mx-auto mt-7 rounded-3xl border border-dashed border-zinc-500 bg-[url('/images/action-bg.webp')] bg-cover bg-center bg-no-repeat p-6 mobile-xl:w-[400px] tablet-md:w-[500px] tablet-md:py-10 desktop-sm:m-0 desktop-sm:w-[462px]">
                            <p className="text-2xl font-bold text-zinc-800 dark:text-zinc-200 tablet-md:text-3xl">
                                {welcomePageT('take_first_step')}
                            </p>

                            <p className="mt-2 w-4/5 text-sm text-zinc-600 dark:text-zinc-400 tablet-md:mt-6 tablet-md:text-base">
                                {welcomePageT('create_wish_lists')}
                            </p>

                            <Action
                                toMainT={welcomePageT('to-main')}
                                signUpT={welcomePageT('sign-up')}
                            />

                            <div className="absolute bottom-3.5 right-6 h-20 w-20 tablet-md:bottom-2 tablet-md:right-5 tablet-md:h-28 tablet-md:w-28">
                                <Image
                                    src="/images/gift-middle.webp"
                                    alt={welcomePageT('alts.bigger_gift')}
                                    fill
                                    sizes={'100%'}
                                    className="object-contain"
                                />
                            </div>

                            <div className="absolute -right-1 bottom-28 h-10 w-10 tablet-md:-right-2 tablet-md:bottom-40 tablet-md:h-16 tablet-md:w-16">
                                <Image
                                    src="/images/gift-small.webp"
                                    alt={welcomePageT('alts.smaller_gift')}
                                    fill
                                    sizes={'100%'}
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Divider iconAlt={welcomePageT('alts.star_icon')} />
        </main>
    );
}
