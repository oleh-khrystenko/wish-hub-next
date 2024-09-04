import {
    NextIntlClientProvider,
    useMessages,
    useTranslations,
} from 'next-intl';
import pick from 'lodash.pick';
import Image from 'next/image';
import Refresh from '@/helpers/hocs/Refresh';
import Header from '@/app/[locale]/root-page-components/Header';

export default function Welcome() {
    const messages = useMessages();
    const welcomePageT = useTranslations('welcome-page');

    return (
        <main className="flex h-full min-h-screen flex-col">
            <section className="bg-rose-cyan-rose bg-cover bg-[80%_50%] bg-no-repeat px-4 pb-10 tablet-md:pb-20 desktop-xs:p-0 desktop-sm:bg-center">
                <div className="mx-auto max-w-7xl">
                    <NextIntlClientProvider
                        messages={pick(messages, ['welcome-page', 'alerts'])}
                    >
                        <Refresh>
                            <Header />
                        </Refresh>
                    </NextIntlClientProvider>

                    <h1 className="text-cyan-300">
                        {welcomePageT('wish_hub_makes')}
                    </h1>
                    <p className="text-zinc-700 dark:text-zinc-300">
                        {welcomePageT('unique_platform')}
                    </p>
                    <Image
                        src="/images/winking-emoji.webp"
                        alt="test"
                        width={500}
                        height={500}
                    />
                </div>
            </section>
        </main>
    );
}
