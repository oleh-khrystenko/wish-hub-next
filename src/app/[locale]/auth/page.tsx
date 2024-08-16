import {
    useTranslations,
    useMessages,
    NextIntlClientProvider,
} from 'next-intl';
import ClientForm from '@/app/[locale]/auth/ClientForm';
import UiThemeSwitcher from '@/components/ui/UiThemeSwitcher';
import WishHub from '@/components/ui/WishHub';
import UiLangSelect from '@/components/ui/UiLangSelect';
import RoutesGuard from '@/helpers/hocs/RoutesGuard';
import Refresh from '@/helpers/hocs/Refresh';
import pick from 'lodash.pick';

export default function Auth() {
    const t = useTranslations();
    const messages = useMessages();

    return (
        <main className="flex min-h-screen flex-col items-center gap-2 p-4 tablet-md:gap-8">
            <header className="flex w-full max-w-lg flex-col items-center gap-2 tablet-md:gap-8">
                <div className="flex w-full items-center justify-between gap-4">
                    <UiThemeSwitcher />
                    <UiLangSelect />
                </div>

                <WishHub withLogo isBig />
            </header>

            <NextIntlClientProvider
                messages={pick(messages, [
                    'auth-page',
                    'alerts',
                    'validations',
                ])}
            >
                <Refresh refreshT={t('alerts.my-user-api.refresh.error')}>
                    <RoutesGuard isUnauthenticated>
                        <ClientForm />
                    </RoutesGuard>
                </Refresh>
            </NextIntlClientProvider>
        </main>
    );
}
