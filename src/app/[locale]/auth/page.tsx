import { Metadata } from 'next';
import { useMessages, NextIntlClientProvider } from 'next-intl';
import pick from 'lodash.pick';
import Refresh from '@/helpers/hocs/Refresh';
import RoutesGuard from '@/helpers/hocs/RoutesGuard';
import { fetchMetadata } from '@/helpers/utils/metadata';
import ClientForm from '@/app/[locale]/auth/ClientForm';
import ThemeSwitcher from '@/components/layouts/ThemeSwitcher';
import LangSelect from '@/components/layouts/LangSelect';
import UiBrand from '@/components/ui/UiBrand';

interface IMetadataProps {
    params: { locale: string };
}

export async function generateMetadata({
    params,
}: IMetadataProps): Promise<Metadata> {
    return await fetchMetadata(params.locale, 'auth');
}

export default function Auth() {
    const messages = useMessages();

    return (
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

                    <UiBrand
                        withLogo
                        isBig
                        sizeLoading="h-16 min-h-16 w-16 min-w-16"
                    />
                </header>

                <Refresh>
                    <RoutesGuard isUnauthenticated>
                        <ClientForm />
                    </RoutesGuard>
                </Refresh>
            </NextIntlClientProvider>
        </main>
    );
}
