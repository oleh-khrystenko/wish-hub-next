'use client';

import { FC, useRef, useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useInView } from 'react-intersection-observer';
import { EUserType, ISendUsersParams } from '@/stores/users/types';
import { useMyUserStore } from '@/stores/my-user';
import { useUsersStore } from '@/stores/users';
import { USERS_PAGINATION_LIMIT } from '@/helpers/utils/constants';
import UserItem from '@/app/[locale]/main/sidebar/UserItem';
import UiLoading from '@/components/ui/UiLoading';
import UiSelect, { IOption } from '@/components/ui/UiSelect';
import UiSearch from '@/components/ui/UiSearch';

const UserList: FC = () => {
    const [firstLoaded, setFirstLoaded] = useState<boolean>(false);
    const [userType, setUserType] = useState<ISendUsersParams['userType']>(
        EUserType.ALL
    );
    const [isLoadingGet, setIsLoadingGet] = useState<boolean>(false);
    const [isLoadingAdd, setIsLoadingAdd] = useState<boolean>(false);

    const userListRef = useRef<HTMLDivElement>(null);
    const gotUsers = useRef(false);

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
    const setSearch = useUsersStore((state) => state.setSearch);
    const getUsers = useUsersStore((state) => state.getUsers);
    const addUsers = useUsersStore((state) => state.addUsers);
    const getAllUsers = useUsersStore((state) => state.getAllUsers);
    const addAllUsers = useUsersStore((state) => state.addAllUsers);

    const selectOptions: IOption[] = [
        {
            label: (
                <span className="pr-6 text-left text-sm font-bold text-zinc-800 dark:text-zinc-300">
                    {mainPageT('all')}
                </span>
            ),
            value: EUserType.ALL,
        },
        {
            label: (
                <span className="pr-6 text-left text-sm font-bold text-zinc-800 dark:text-zinc-300">
                    {mainPageT('friends')}
                </span>
            ),
            value: EUserType.FRIENDS,
        },
        {
            label: (
                <>
                    <span className="pr-6 text-left text-sm font-bold text-zinc-800 dark:text-zinc-300">
                        {mainPageT('friend-requests')}
                    </span>
                    {followFromCount > 0 && (
                        <span className="absolute right-2 top-1/2 z-40 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md bg-zinc-300 text-xs font-bold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">
                            {followFromCount}
                        </span>
                    )}
                </>
            ),
            value: EUserType.FOLLOW_FROM,
        },
        {
            label: (
                <span className="pr-6 text-left text-sm font-bold text-zinc-800 dark:text-zinc-300">
                    {mainPageT('sent-friend-requests')}
                </span>
            ),
            value: EUserType.FOLLOW_TO,
        },
    ];

    const handleChangeUserType = async (value: IOption['value']) => {
        setUserType(value as EUserType);

        if (!myUser) return;

        setIsLoadingGet(true);

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

        if (userListRef.current) {
            userListRef.current.scrollTo({
                behavior: 'smooth',
                top: 0,
            });
        }

        setIsLoadingGet(false);
    };

    const handleChangeSearchBar = async (value: string) => {
        setSearch(value);

        setIsLoadingGet(true);

        if (myUser) {
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
        } else {
            await getAllUsers(
                {
                    page: 1,
                    limit: USERS_PAGINATION_LIMIT,
                    search: value,
                },
                alertsT('users-api.get-all-users.error')
            );
        }

        if (userListRef.current) {
            userListRef.current.scrollTo({
                behavior: 'smooth',
                top: 0,
            });
        }

        setIsLoadingGet(false);
    };

    const updateUsers = async () => {
        if (!myUser) return;

        setIsLoadingGet(true);

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

        if (userListRef.current) {
            userListRef.current.scrollTo({
                behavior: 'smooth',
                top: 0,
            });
        }

        setIsLoadingGet(false);
    };

    useEffect(() => {
        if (!firstLoaded) return;

        if (!inView || stopRequests) return;

        const fetchUsers = async () => {
            setIsLoadingAdd(true);

            if (myUser) {
                await addUsers(
                    {
                        page,
                        limit: USERS_PAGINATION_LIMIT,
                        myUserId: myUser.id,
                        userType,
                        search,
                    },
                    alertsT('users-api.get-users.error')
                );
            } else {
                await addAllUsers(
                    { page, limit: USERS_PAGINATION_LIMIT, search },
                    alertsT('users-api.get-all-users.error')
                );
            }

            setIsLoadingAdd(false);
        };

        fetchUsers().finally();
    }, [inView]);

    useEffect(() => {
        if (gotUsers.current) return;
        gotUsers.current = true;

        const fetchUsers = async () => {
            setIsLoadingGet(true);

            if (myUser) {
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
            } else {
                await getAllUsers(
                    { page: 1, limit: USERS_PAGINATION_LIMIT, search },
                    alertsT('users-api.get-all-users.error')
                );
            }

            setFirstLoaded(true);
            setIsLoadingGet(false);
        };

        fetchUsers().finally();
    }, []);

    return (
        <>
            {myUser && (
                <div className="mb-6 flex items-center gap-3">
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
                            <span className="absolute right-2 top-1/2 z-40 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md bg-zinc-300 text-xs font-bold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">
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
                className="relative mt-4 grow overflow-y-auto overflow-x-hidden pr-2"
                ref={userListRef}
            >
                <ul className="flex flex-col gap-1">
                    {users.map((user) => (
                        <UserItem
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

                {isLoadingGet && (
                    <UiLoading isLocal bg="bg-zinc-300 dark:bg-zinc-800" />
                )}

                {isLoadingAdd && (
                    <div className="relative mt-2 h-10 w-full">
                        <UiLoading
                            isLocal
                            size="h-10 min-h-10 w-10 min-w-10"
                            bg="bg-zinc-300 dark:bg-zinc-800"
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default UserList;
