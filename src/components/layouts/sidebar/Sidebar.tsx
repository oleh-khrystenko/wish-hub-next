import { useTranslations } from 'next-intl';
import UserList from '@/components/layouts/sidebar/UserList';

function Sidebar() {
    const mainPageT = useTranslations('main-page');

    return (
        <div className="flex w-full flex-col rounded-lg px-3 py-2 tablet-md:w-1/4 tablet-md:bg-zinc-300 tablet-md:dark:bg-zinc-800">
            <span className="shrink-0 text-xl font-bold text-zinc-800 dark:text-zinc-300">
                {mainPageT('users')}
            </span>

            <UserList />
        </div>
    );
}

export default Sidebar;
