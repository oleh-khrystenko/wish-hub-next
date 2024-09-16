import { Metadata } from 'next';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import pick from 'lodash.pick';
import { IParams } from '@/models/Settings';
import UserSessionRefresher from '@/helpers/hocs/UserSessionRefresher';
import RoutesGuard from '@/helpers/hocs/RoutesGuard';
import { fetchMetadata } from '@/helpers/utils/metadata';
import Content from '@/app/[locale]/activation-link-expired/Content';
import ThemeSwitcher from '@/components/layouts/ThemeSwitcher';
import LangSelect from '@/components/layouts/LangSelect';
import UiBrand from '@/components/ui/UiBrand';

export async function generateMetadata({ params }: IParams): Promise<Metadata> {
    return await fetchMetadata(params.locale, 'activation-link-expired');
}

export default function ActivationLinkExpired() {
    const messages = useMessages();

    return (
        <main className="flex min-h-screen flex-col items-center gap-2 p-4 tablet-md:gap-8">
            <NextIntlClientProvider
                messages={pick(messages, [
                    'activation-link-expired-page',
                    'main-page',
                    'alerts',
                ])}
            >
                <header className="flex w-full max-w-lg flex-col items-center gap-2 tablet-md:gap-8">
                    <div className="flex w-full items-center justify-between gap-4">
                        <ThemeSwitcher />
                        <LangSelect />
                    </div>

                    <UiBrand withLogo isBig />
                </header>

                <UserSessionRefresher>
                    <RoutesGuard>
                        <Content />
                    </RoutesGuard>
                </UserSessionRefresher>
            </NextIntlClientProvider>
        </main>
    );
}
