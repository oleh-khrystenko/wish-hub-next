import { useMessages, NextIntlClientProvider } from 'next-intl';
import pick from 'lodash.pick';
import Refresh from '@/helpers/hocs/Refresh';
import ProfileContent from '@/app/[locale]/profile/[profileId]/ProfileContent';
import Header from '@/components/layouts/header/Header';

export default function Profile() {
    const messages = useMessages();

    return (
        <main className="flex min-h-screen flex-col items-center justify-between text-zinc-800 dark:text-zinc-300">
            <NextIntlClientProvider
                messages={pick(messages, [
                    'main-page',
                    'share-button',
                    'alerts',
                ])}
            >
                <Refresh>
                    <Header />

                    <ProfileContent />
                </Refresh>
            </NextIntlClientProvider>
        </main>
    );
}
