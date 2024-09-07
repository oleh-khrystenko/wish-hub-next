'use client';

import { FC, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useMyUserStore } from '@/stores/my-user';
import { useUsersStore } from '@/stores/users';
import { useSettingsStore } from '@/stores/settings';
import UseFullName from '@/helpers/hooks/UseFullName';
import WishList from '@/app/[locale]/main/WishList';
import Inactivated from '@/components/layouts/Inactivated';
import UiBrand from '@/components/ui/UiBrand';

const Content: FC = () => {
    const mainPageT = useTranslations('main-page');

    const myUser = useMyUserStore((state) => state.myUser);

    const users = useUsersStore((state) => state.list);
    const selectedUserId = useUsersStore((state) => state.selectedUserId);

    const activatedBurgerMenu = useSettingsStore(
        (state) => state.activatedBurgerMenu
    );
    const setActivatedBurgerMenu = useSettingsStore(
        (state) => state.setActivatedBurgerMenu
    );

    const { getFullName } = UseFullName();

    const selectedUserFullName = useMemo(() => {
        const selectedUser = users.find((user) => user.id === selectedUserId);
        return getFullName(selectedUser);
    }, [users, selectedUserId]);

    return (
        <div className="relative flex w-full grow flex-col pb-5 pl-1 pr-2 pt-2 tablet-md:w-2/3 tablet-xl:w-3/4">
            <div className="-mr-2 flex items-center justify-between pl-2.5 tablet-md:hidden">
                <button
                    type="button"
                    className="relative z-40 flex h-10 w-10 flex-col justify-between py-1.5"
                    onClick={() => setActivatedBurgerMenu(!activatedBurgerMenu)}
                >
                    <div
                        className={`${activatedBurgerMenu ? 'w-1/2 -translate-x-0.5 translate-y-1.5 -rotate-45' : 'w-full'} h-0.5 rounded-full bg-zinc-700 transition-all duration-300 ease-in-out dark:bg-zinc-300`}
                    ></div>

                    <div className="h-0.5 w-full rounded-full bg-zinc-700 transition-all duration-300 ease-in-out dark:bg-zinc-300"></div>

                    <div
                        className={`${activatedBurgerMenu ? 'w-1/2 -translate-x-0.5 -translate-y-1.5 rotate-45' : 'w-full'} h-0.5 rounded-full bg-zinc-700 transition-all duration-300 ease-in-out dark:bg-zinc-300`}
                    ></div>
                </button>

                <UiBrand isMainPage />
            </div>

            {selectedUserId && (
                <div className="mb-6 pl-2.5">
                    {myUser?.id === selectedUserId ? (
                        <p className="text-base font-bold text-zinc-800 dark:text-zinc-300 tablet-md:text-xl">
                            {mainPageT('my_wishes')}
                        </p>
                    ) : (
                        <p className="flex max-w-full flex-wrap items-center">
                            <span className="mr-1 min-h-7 whitespace-nowrap text-base font-bold text-zinc-800 dark:text-zinc-300 tablet-md:text-xl">
                                {mainPageT('wishes_of_user')}
                            </span>
                            <span className="min-h-7 max-w-full truncate pr-0.5 text-base font-bold italic text-zinc-800 dark:text-zinc-300 tablet-md:text-xl">
                                {selectedUserFullName}
                            </span>
                        </p>
                    )}
                </div>
            )}

            <WishList selectedUserFullName={selectedUserFullName} />

            {myUser && !myUser.isActivated && <Inactivated />}
        </div>
    );
};

export default Content;
