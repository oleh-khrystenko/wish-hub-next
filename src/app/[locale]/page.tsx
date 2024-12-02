import { Metadata } from 'next';
import {
    NextIntlClientProvider,
    useMessages,
    useTranslations,
} from 'next-intl';
import pick from 'lodash.pick';
import { IPageParams } from '@/models/Settings';
import UserSessionRefresher from '@/helpers/hocs/UserSessionRefresher';
import { fetchMetadata } from '@/helpers/utils/metadata';
import Header from '@/app/[locale]/welcome-page-components/Header';
import CoverFigure from '@/app/[locale]/welcome-page-components/CoverFigure';
import ActionBlock from '@/app/[locale]/welcome-page-components/ActionBlock';
import Divider from '@/components/layouts/Divider';
import Benefits from '@/app/[locale]/welcome-page-components/Benefits';
import SignUp from '@/app/[locale]/welcome-page-components/SignUp';
import Footer from '@/components/layouts/footer/Footer';
import GlobalLoading from '@/components/layouts/GlobalLoading';
import WindingIcon from '@/components/icons/WindingIcon';
import Algorithm from '@/app/[locale]/welcome-page-components/Algorithm';

export async function generateMetadata({
    params,
}: IPageParams): Promise<Metadata> {
    return await fetchMetadata(params.locale, 'welcome', 'welcome');
}

export default function Welcome() {
    const messages = useMessages();
    const welcomePageT = useTranslations('welcome-page');

    return (
        <main className="flex h-full min-h-screen flex-col bg-zinc-300 pb-14 dark:bg-zinc-900 tablet-md:p-0">
            <NextIntlClientProvider
                messages={pick(messages, [
                    'welcome-page',
                    'validations',
                    'all-pages',
                ])}
            >
                <section className="bg-rose-cyan-rose bg-cover bg-[80%_50%] bg-no-repeat px-4 pb-10 tablet-md:pb-20 desktop-xs:pb-28 desktop-sm:bg-center desktop-sm:px-0">
                    <div className="relative mx-auto max-w-7xl pt-20 tablet-md:pt-[104px]">
                        <UserSessionRefresher withoutLoading>
                            <Header />
                        </UserSessionRefresher>

                        <div className="desktop-sm:grid desktop-sm:grid-cols-2 desktop-sm:gap-y-9">
                            <div className="mx-auto tablet-md:w-3/4 desktop-sm:mx-0 desktop-sm:w-auto">
                                <h1 className="text-balance text-3xl font-bold text-zinc-800 dark:text-zinc-200 mobile-lg:text-4xl mobile-xl:text-center tablet-md:text-left tablet-md:text-6xl desktop-sm:w-[110%]">
                                    {welcomePageT('wish_hub_slogan')}
                                </h1>

                                <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400 mobile-xl:text-center tablet-md:mt-6 tablet-md:text-left tablet-md:text-lg desktop-sm:w-4/5 desktop-md:w-11/12">
                                    {welcomePageT('unique_platform')}
                                </p>
                            </div>

                            <CoverFigure />

                            <ActionBlock />
                        </div>
                    </div>
                </section>

                <Divider />

                <section className="bg-cyan-cyan-rose bg-cover bg-[66%_50%] bg-no-repeat px-4 pb-16 pt-10 tablet-md:bg-center tablet-md:pb-28 tablet-md:pt-20 desktop-sm:px-0">
                    <div className="mx-auto max-w-7xl">
                        <div className="mx-auto tablet-md:w-3/4 desktop-sm:mx-0 desktop-sm:w-2/5">
                            <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200 mobile-xl:text-center tablet-md:text-left tablet-md:text-4xl">
                                {welcomePageT('with_wish_hub')}
                            </h2>

                            <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400 mobile-xl:text-center tablet-md:mt-6 tablet-md:text-left tablet-md:text-lg">
                                {welcomePageT('save_time')}
                                &nbsp;
                                <br className="hidden tablet-md:block" />
                                {welcomePageT('no_more')}
                            </p>
                        </div>

                        <Algorithm />

                        <div className="mx-auto tablet-md:w-3/4 desktop-sm:mx-0 desktop-sm:w-2/5">
                            <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200 mobile-xl:text-center tablet-md:text-left tablet-md:text-4xl">
                                {welcomePageT('benefits_of_being')}
                            </h2>

                            <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400 mobile-xl:text-center tablet-md:mt-6 tablet-md:text-left tablet-md:text-lg">
                                {welcomePageT('forget_hassle')}
                            </p>
                        </div>

                        <div className="mx-auto mt-11 flex max-w-lg flex-col items-center gap-1 tablet-lg:mx-0 tablet-lg:mt-10 tablet-lg:max-w-full tablet-lg:flex-row tablet-lg:gap-5">
                            <Benefits />

                            <WindingIcon classes="w-20 h-20 desktop-sm:w-24 desktop-sm:h-24 p-2.5 tablet-lg:p-0 tablet-lg:rotate-45 rotate-[144deg]" />

                            <SignUp />

                            <GlobalLoading />
                        </div>
                    </div>
                </section>

                <Footer isWelcome />
            </NextIntlClientProvider>
        </main>
    );
}
