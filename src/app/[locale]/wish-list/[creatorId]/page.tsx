import { Metadata } from 'next';
import { useMessages, NextIntlClientProvider } from 'next-intl';
import pick from 'lodash.pick';
import { IParams } from '@/models/Settings';
import UserSessionRefresher from '@/helpers/hocs/UserSessionRefresher';
import { fetchMetadata } from '@/helpers/utils/metadata';
import Content from '@/app/[locale]/wish-list/[creatorId]/Content';
import Header from '@/components/layouts/header/Header';
import Footer from '@/components/layouts/footer/Footer';

export async function generateMetadata({ params }: IParams): Promise<Metadata> {
    return await fetchMetadata(params.locale, 'wish-list');
}

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
                    <UserSessionRefresher>
                        <Header />

                        <Content />
                    </UserSessionRefresher>
                </NextIntlClientProvider>
            </div>

            <Footer />
        </div>
    );
}
