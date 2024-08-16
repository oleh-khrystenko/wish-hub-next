'use client';

import { FC, useRef, useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useInView } from 'react-intersection-observer';
import { EUserType, ISendUsersParams } from '@/stores/users/types';
import { useMyUserStore } from '@/stores/my-user';
import { useUsersStore } from '@/stores/users';
import Loading from '@/components/layouts/Loading';
import UserAction from '@/components/layouts/sidebar/UserAction';
import UiSelect, { IOption } from '@/components/ui/UiSelect';
import UiSearch from '@/components/ui/UiSearch';
import { USERS_PAGINATION_LIMIT } from '@/helpers/utils/constants';

const UserList: FC = () => {
    const [firstLoad, setFirstLoad] = useState<boolean>(true);
    const [userType, setUserType] = useState<ISendUsersParams['userType']>(
        EUserType.ALL
    );

    const userListRef = useRef<HTMLDivElement>(null);
    const gotUser = useRef(false);

    const mainPageT = useTranslations('main-page');
    const alertsT = useTranslations('alerts');

    const { ref, inView } = useInView({
        threshold: 0,
    });

    const myUser = useMyUserStore((state) => state.myUser);
    const users = useUsersStore((state) => state.list);
    const page = useUsersStore((state) => state.page);
    const search = useUsersStore((state) => state.search);
    const followFromCount = useUsersStore((state) => state.followFromCount);
    const stopRequests = useUsersStore((state) => state.stopRequests);
    const isLoading = useUsersStore((state) => state.isLoading);
    const setSearch = useUsersStore((state) => state.setSearch);
    const getUsers = useUsersStore((state) => state.getUsers);
    const addUsers = useUsersStore((state) => state.addUsers);
    const getAllUsers = useUsersStore((state) => state.getAllUsers);
    const addAllUsers = useUsersStore((state) => state.addAllUsers);

    const selectOptions: IOption[] = [
        {
            label: (
                <span className="pr-6 text-sm font-bold text-zinc-800 dark:text-zinc-300">
                    {mainPageT('all')}
                </span>
            ),
            value: EUserType.ALL,
        },
        {
            label: (
                <span className="pr-6 text-sm font-bold text-zinc-800 dark:text-zinc-300">
                    {mainPageT('friends')}
                </span>
            ),
            value: EUserType.FRIENDS,
        },
        {
            label: (
                <>
                    <span className="pr-6 text-sm font-bold text-zinc-800 dark:text-zinc-300">
                        {mainPageT('friend-requests')}
                    </span>
                    {followFromCount > 0 && (
                        <span className="absolute right-2 top-1/2 z-40 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md bg-zinc-400 text-xs font-bold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">
                            {followFromCount}
                        </span>
                    )}
                </>
            ),
            value: EUserType.FOLLOW_FROM,
        },
        {
            label: (
                <span className="pr-6 text-sm font-bold text-zinc-800 dark:text-zinc-300">
                    {mainPageT('sent-friend-requests')}
                </span>
            ),
            value: EUserType.FOLLOW_TO,
        },
    ];

    const handleChangeUserType = async (value: IOption['value']) => {
        setUserType(value as EUserType);

        if (!myUser || !userListRef.current) return;

        userListRef.current.scrollTo(0, 0);

        await getUsers(
            {
                page: 1,
                limit: USERS_PAGINATION_LIMIT,
                myUserId: myUser.id,
                userType: value as EUserType,
                search,
            },
            alertsT('users-api.get-users.error')
        );
    };

    const handleChangeSearchBar = async (value: string) => {
        setSearch(value);

        if (!userListRef.current) return;

        userListRef.current.scrollTo(0, 0);

        if (!myUser) {
            await getAllUsers(
                {
                    page: 1,
                    limit: USERS_PAGINATION_LIMIT,
                    search: value,
                },
                alertsT('users-api.get-all-users.error')
            );
        } else {
            await getUsers(
                {
                    page: 1,
                    limit: USERS_PAGINATION_LIMIT,
                    myUserId: myUser.id,
                    userType,
                    search: value,
                },
                alertsT('users-api.get-users.error')
            );
        }
    };

    const updateUsers = async () => {
        if (!myUser) return;

        await getUsers(
            {
                page: 1,
                limit: USERS_PAGINATION_LIMIT,
                myUserId: myUser.id,
                userType,
                search,
            },
            alertsT('users-api.get-users.error')
        );

        if (!userListRef.current) return;

        userListRef.current.scrollTo(0, 0);
    };

    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false);
            return;
        }

        if (!inView || stopRequests) return;
        if (myUser) {
            addUsers(
                {
                    page,
                    limit: USERS_PAGINATION_LIMIT,
                    myUserId: myUser.id,
                    userType,
                    search,
                },
                alertsT('users-api.get-users.error')
            ).finally();
        } else {
            addAllUsers(
                { page, limit: USERS_PAGINATION_LIMIT, search },
                alertsT('users-api.get-all-users.error')
            ).finally();
        }
    }, [inView]);

    useEffect(() => {
        if (gotUser.current) return;
        gotUser.current = true;
        if (myUser) {
            getUsers(
                {
                    page: 1,
                    limit: USERS_PAGINATION_LIMIT,
                    myUserId: myUser.id,
                    userType,
                    search,
                },
                alertsT('users-api.get-users.error')
            ).finally();
        } else {
            getAllUsers(
                { page: 1, limit: USERS_PAGINATION_LIMIT, search },
                alertsT('users-api.get-all-users.error')
            ).finally();
        }
    }, []);

    return (
        <>
            {myUser && (
                <div className="mt-4 flex items-center gap-3">
                    <span className="text-base text-zinc-800 dark:text-zinc-300">
                        {mainPageT('filter')}:
                    </span>

                    <div className="relative w-full">
                        <UiSelect
                            options={selectOptions}
                            value={userType as EUserType}
                            onChange={handleChangeUserType}
                        />

                        {followFromCount > 0 && (
                            <span className="absolute right-2 top-1/2 z-40 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md bg-zinc-400 text-xs font-bold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">
                                {followFromCount}
                            </span>
                        )}
                    </div>
                </div>
            )}

            <UiSearch
                id="user-search"
                label={mainPageT('users-search')}
                changeSearchBar={handleChangeSearchBar}
            />

            <div
                className="relative mt-4 grow overflow-y-auto pr-2"
                ref={userListRef}
            >
                <ul className="flex flex-col gap-1">
                    {users.map((user) => (
                        <UserAction
                            key={user.id}
                            user={user}
                            updateUsers={updateUsers}
                        />
                    ))}
                </ul>

                <div
                    className="h-px w-full"
                    style={{ display: stopRequests ? 'none' : 'block' }}
                    ref={ref}
                ></div>

                {isLoading && <Loading isLocal />}
            </div>
        </>
    );
};

export default UserList;
