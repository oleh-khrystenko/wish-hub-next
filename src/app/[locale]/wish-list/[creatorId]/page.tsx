import { useMessages, NextIntlClientProvider } from 'next-intl';
import pick from 'lodash.pick';
import Refresh from '@/helpers/hocs/Refresh';
import Content from '@/app/[locale]/wish-list/[creatorId]/Content';
import Header from '@/components/layouts/header/Header';

export default function Wish() {
    const messages = useMessages();

    return (
        <main className="mx-auto min-h-screen max-w-7xl p-1">
            <NextIntlClientProvider
                messages={pick(messages, [
                    'main-page',
                    'profile-page',
                    'wish-page',
                    'share-button',
                    'alerts',
                    'inactivated',
                ])}
            >
                <Refresh>
                    <Header />

                    <Content />
                </Refresh>
            </NextIntlClientProvider>
        </main>
    );
}
