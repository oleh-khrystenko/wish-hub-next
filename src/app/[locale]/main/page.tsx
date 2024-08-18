import { useMessages, NextIntlClientProvider } from 'next-intl';
import Refresh from '@/helpers/hocs/Refresh';
import MainContent from '@/app/[locale]/main/MainContent';
import Header from '@/components/layouts/header/Header';
import Sidebar from '@/components/layouts/sidebar/Sidebar';
import pick from 'lodash.pick';

export default function Main() {
    const messages = useMessages();

    return (
        <main className="flex h-svh flex-col p-1 tablet-md:gap-1">
            <NextIntlClientProvider
                messages={pick(messages, [
                    'main-page',
                    'share-button',
                    'alerts',
                    'validations', // it is a bad idea
                ])}
            >
                <Refresh>
                    <Header />

                    <div className="flex grow overflow-hidden">
                        <Sidebar />

                        <MainContent />
                    </div>
                </Refresh>
            </NextIntlClientProvider>
        </main>
    );
}
