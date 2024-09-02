import { useMessages, NextIntlClientProvider } from 'next-intl';
import pick from 'lodash.pick';
import Refresh from '@/helpers/hocs/Refresh';
import RoutesGuard from '@/helpers/hocs/RoutesGuard';
import Content from '@/app/[locale]/profile/[profileId]/Content';
import Header from '@/components/layouts/header/Header';

export default function Profile() {
    const messages = useMessages();

    return (
        <main className="mx-auto min-h-screen max-w-7xl p-1">
            <NextIntlClientProvider
                messages={pick(messages, [
                    'profile-page',
                    'main-page',
                    'wish-page',
                    'share-button',
                    'alerts',
                    'validations',
                    'inactivated',
                ])}
            >
                <Refresh>
                    <RoutesGuard>
                        <Header />

                        <Content />
                    </RoutesGuard>
                </Refresh>
            </NextIntlClientProvider>
        </main>
    );
}
