import { NextIntlClientProvider, useMessages } from 'next-intl';
import pick from 'lodash.pick';
import Refresh from '@/helpers/hocs/Refresh';
import Content from '@/app/[locale]/privacy-policy/Content';
import Header from '@/components/layouts/header/Header';
import Footer from '@/components/layouts/footer/Footer';

export default function PrivacyPolicy() {
    const messages = useMessages();

    return (
        <main className="h-full min-h-screen">
            <div className="mx-auto flex max-w-7xl flex-col p-1">
                <NextIntlClientProvider
                    messages={pick(messages, [
                        'main-page',
                        'share-button',
                        'alerts',
                    ])}
                >
                    <Refresh>
                        <Header />
                    </Refresh>
                </NextIntlClientProvider>

                <Content />
            </div>

            <Footer remove="privacy-policy" />
        </main>
    );
}
