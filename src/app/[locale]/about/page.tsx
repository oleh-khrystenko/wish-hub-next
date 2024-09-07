import { NextIntlClientProvider, useMessages } from 'next-intl';
import pick from 'lodash.pick';
import Refresh from '@/helpers/hocs/Refresh';
import Content from '@/app/[locale]/about/Content';
import Header from '@/components/layouts/header/Header';
import Footer from '@/components/layouts/footer/Footer';

export default function About() {
    const messages = useMessages();

    return (
        <>
            <main className="mx-auto flex h-full min-h-screen max-w-7xl flex-col p-1">
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
            </main>

            <Footer remove="about" />
        </>
    );
}
