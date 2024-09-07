import { useMessages, NextIntlClientProvider } from 'next-intl';
import pick from 'lodash.pick';
import Refresh from '@/helpers/hocs/Refresh';
import Content from '@/app/[locale]/wish/[wishId]/Content';
import Header from '@/components/layouts/header/Header';
import Footer from '@/components/layouts/footer/Footer';

export default function WishList() {
    const messages = useMessages();

    return (
        <main className="flex h-full min-h-screen flex-col justify-between">
            <div className="mx-auto flex w-full max-w-7xl flex-col p-1">
                <NextIntlClientProvider
                    messages={pick(messages, [
                        'main-page',
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
        </main>
    );
}
