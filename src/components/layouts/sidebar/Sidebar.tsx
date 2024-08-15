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
        <div className="flex w-full flex-col rounded-lg px-3 py-2 tablet-md:w-2/5 tablet-md:bg-zinc-300 tablet-md:dark:bg-zinc-800 tablet-lg:w-1/3 desktop-sm:w-1/4">
            <span className="shrink-0 text-xl font-bold text-zinc-800 dark:text-zinc-300">
                {t('main-page.users')}
            </span>

            <NextIntlClientProvider messages={pick(messages, ['main-page'])}>
                <UserList
                    getUsersErrorT={t('alerts.users-api.get-users.error')}
                    getAllUsersErrorT={t(
                        'alerts.users-api.get-all-users.error'
                    )}
                    addFriendErrorT={t('alerts.my-user-api.add-friend.error')}
                    removeFriendErrorT={t(
                        'alerts.my-user-api.remove-friend.error'
                    )}
                    userProfileT={t('profile-page.user-profile')}
                />
            </NextIntlClientProvider>
        </div>
    );
}

export default Sidebar;
