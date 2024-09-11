import { useMessages, NextIntlClientProvider } from 'next-intl';
import pick from 'lodash.pick';
import Refresh from '@/helpers/hocs/Refresh';
import Content from '@/app/[locale]/wish-list/[creatorId]/Content';
import Header from '@/components/layouts/header/Header';
import Footer from '@/components/layouts/footer/Footer';

export default function Wish() {
    const messages = useMessages();

    return (
        <div className="flex min-h-screen flex-col justify-between">
            <div className="mx-auto flex w-full max-w-7xl grow flex-col">
                <NextIntlClientProvider
                    messages={pick(messages, [
                        'main-page',
                        'profile-page',
                        'wish-page',
                        'share-button',
                        'alerts',
                    ])}
                >
                    <Refresh>
                        <Header />

                        <Content />
                    </Refresh>
                </NextIntlClientProvider>
            </div>

            <Footer />
        </div>
    );
}
