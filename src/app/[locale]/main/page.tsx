import { useMessages, NextIntlClientProvider } from 'next-intl';
import pick from 'lodash.pick';
import Refresh from '@/helpers/hocs/Refresh';
import Content from '@/app/[locale]/main/Content';
import Sidebar from '@/app/[locale]/main/sidebar/Sidebar';
import Header from '@/components/layouts/header/Header';

export default function Main() {
    const messages = useMessages();

    return (
        <main className="flex h-svh flex-col tablet-md:gap-1 tablet-md:p-1">
            <NextIntlClientProvider
                messages={pick(messages, [
                    'main-page',
                    'wish-page',
                    'share-button',
                    'alerts',
                    'validations',
                ])}
            >
                <Refresh>
                    <Header isMainPage />

                    <div className="flex grow overflow-hidden">
                        <Sidebar />

                        <Content />
                    </div>
                </Refresh>
            </NextIntlClientProvider>
        </main>
    );
}
