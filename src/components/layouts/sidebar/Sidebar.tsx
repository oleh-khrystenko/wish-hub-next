import { useTranslations } from 'next-intl';
import UserList from '@/components/layouts/sidebar/UserList';

function Sidebar(props: any) {
    const t = useTranslations();
    console.log('props: ', props);

    return (
        <div className="flex w-full flex-col gap-4 rounded-lg px-4 py-2 tablet-md:w-5/12 tablet-md:bg-zinc-300 tablet-md:dark:bg-zinc-800 tablet-lg:w-1/3 desktop-sm:w-1/4">
            <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-300">
                {t('main-page.users')}
            </h2>

            <UserList />
        </div>
    );
}

export default Sidebar;
