import {
    NextIntlClientProvider,
    useMessages,
    useTranslations,
} from 'next-intl';
import pick from 'lodash.pick';
import UserList from '@/components/layouts/sidebar/UserList';

function Sidebar() {
    const messages = useMessages();
    const t = useTranslations();

    return (
        <div className="flex w-full flex-col gap-4 rounded-lg px-4 py-2 tablet-md:w-5/12 tablet-md:bg-zinc-300 tablet-md:dark:bg-zinc-800 tablet-lg:w-1/3 desktop-sm:w-1/4">
            <h2 className="shrink-0 text-lg font-bold text-zinc-800 dark:text-zinc-300">
                {t('main-page.users')}
            </h2>

            <NextIntlClientProvider messages={pick(messages, ['main-page'])}>
                <UserList userNotFoundT={t('main-page.user_not_found')} />
            </NextIntlClientProvider>
        </div>
    );
}

export default Sidebar;
