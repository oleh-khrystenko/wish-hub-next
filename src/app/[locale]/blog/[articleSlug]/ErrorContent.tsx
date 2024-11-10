import { FC } from 'react';
import {
    NextIntlClientProvider,
    useMessages,
    useTranslations,
} from 'next-intl';
import pick from 'lodash.pick';
import UserSessionRefresher from '@/helpers/hocs/UserSessionRefresher';
import Header from '@/components/layouts/header/Header';
import Footer from '@/components/layouts/footer/Footer';
import GlobalLoading from '@/components/layouts/GlobalLoading';

const ErrorContent: FC = () => {
    const messages = useMessages();
    const allPagesT = useTranslations('all-pages');

    return (
        <NextIntlClientProvider
            messages={pick(messages, [
                'main-page',
                'share-button',
                'all-pages',
            ])}
        >
            <main className="flex min-h-screen flex-col">
                <UserSessionRefresher>
                    <Header />
                </UserSessionRefresher>

                <div className="mx-auto mt-6 flex w-full max-w-7xl grow flex-col items-center justify-center px-4 pb-6 desktop-sm:px-0 desktop-sm:pb-10">
                    <h1 className="text-center text-xl font-bold text-rose-400">
                        {allPagesT('error.title')}
                    </h1>

                    <p className="text-center text-rose-400">
                        {allPagesT('error.text')}{' '}
                        <a
                            href="mailto:wish.hub.net@gmail.com"
                            className="font-bold"
                        >
                            wish.hub.net@gmail.com
                        </a>
                    </p>
                </div>

                <Footer />
            </main>

            <GlobalLoading />
        </NextIntlClientProvider>
    );
};

export default ErrorContent;
