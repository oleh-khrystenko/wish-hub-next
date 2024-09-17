import { Metadata } from 'next';
import { useMessages, NextIntlClientProvider } from 'next-intl';
import pick from 'lodash.pick';
import { IParams } from '@/models/Settings';
import UserSessionRefresher from '@/helpers/hocs/UserSessionRefresher';
import RoutesGuard from '@/helpers/hocs/RoutesGuard';
import { fetchMetadata } from '@/helpers/utils/metadata';
import ClientForm from '@/app/[locale]/auth/ClientForm';
import ThemeSwitcher from '@/components/layouts/ThemeSwitcher';
import LangSelect from '@/components/layouts/LangSelect';
import GlobalLoading from '@/components/layouts/GlobalLoading';
import UiBrand from '@/components/ui/UiBrand';

export async function generateMetadata({ params }: IParams): Promise<Metadata> {
    return await fetchMetadata(params.locale, 'auth');
}

export default function Auth() {
    const messages = useMessages();

    return (
        <>
            <main className="flex min-h-screen flex-col items-center gap-2 p-4 tablet-md:gap-8">
                <NextIntlClientProvider
                    messages={pick(messages, [
                        'auth-page',
                        'alerts',
                        'validations',
                    ])}
                >
                    <header className="flex w-full max-w-lg flex-col items-center gap-2 tablet-md:gap-8">
                        <div className="flex w-full items-center justify-between gap-4">
                            <ThemeSwitcher />
                            <LangSelect selectHoverItemBg="hover:bg-zinc-100 hover:dark:bg-zinc-700" />
                        </div>

                        <UiBrand withLogo isBig />
                    </header>

                    <UserSessionRefresher>
                        <RoutesGuard isUnauthenticated>
                            <ClientForm />
                        </RoutesGuard>
                    </UserSessionRefresher>
                </NextIntlClientProvider>
            </main>

            <GlobalLoading />
        </>
    );
}
