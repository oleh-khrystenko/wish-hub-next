import { Metadata } from 'next';
import { useMessages, NextIntlClientProvider } from 'next-intl';
import pick from 'lodash.pick';
import { IPageParams } from '@/models/Settings';
import UserSessionRefresher from '@/helpers/hocs/UserSessionRefresher';
import { fetchMetadata } from '@/helpers/utils/metadata';
import Sidebar from '@/app/[locale]/main/sidebar/Sidebar';
import Body from '@/app/[locale]/main/Body';
import BottomMenu from '@/app/[locale]/main/BottomMenu';
import Header from '@/components/layouts/header/Header';
import GlobalLoading from '@/components/layouts/GlobalLoading';

export async function generateMetadata({
    params,
}: IPageParams): Promise<Metadata> {
    return await fetchMetadata(params.locale, 'main', 'main');
}

export default function Main() {
    const messages = useMessages();

    return (
        <div className="flex h-svh flex-col tablet-md:gap-1 tablet-md:p-1">
            <NextIntlClientProvider
                messages={pick(messages, [
                    'main-page',
                    'wish-page',
                    'share-button',
                    'all-pages',
                    'validations',
                    'inactivated',
                ])}
            >
                <UserSessionRefresher>
                    <Header isMainPage />

                    <main className="flex grow overflow-hidden">
                        <Sidebar />

                        <Body />
                    </main>
                </UserSessionRefresher>

                <BottomMenu />

                <GlobalLoading />
            </NextIntlClientProvider>
        </div>
    );
}
