import { Metadata } from 'next';
import { useMessages, NextIntlClientProvider } from 'next-intl';
import pick from 'lodash.pick';
import { IParams } from '@/models/Settings';
import Refresh from '@/helpers/hocs/Refresh';
import { fetchMetadata } from '@/helpers/utils/metadata';
import Body from '@/app/[locale]/main/Body';
import BottomMenu from '@/app/[locale]/main/BottomMenu';
import Header from '@/components/layouts/header/Header';

export async function generateMetadata({ params }: IParams): Promise<Metadata> {
    return await fetchMetadata(params.locale, 'main');
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
                    'alerts',
                    'validations',
                    'inactivated',
                ])}
            >
                <Refresh>
                    <Header isMainPage />

                    <Body />
                </Refresh>

                <BottomMenu />
            </NextIntlClientProvider>
        </div>
    );
}
