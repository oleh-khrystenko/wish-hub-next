'use client';

import { FC, useRef, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useUsersStore } from '@/stores/users';
import Loading from '@/components/layouts/Loading';
import UserAction from '@/components/layouts/sidebar/UserAction';
import { useMyUserStore } from '@/stores/my-user';
import { USERS_PAGINATION_LIMIT } from '@/helpers/utils/constants';
import { EUserType, ISendUsersParams } from '@/stores/users/types';
import UiSearch from '@/components/ui/UiSearch';

interface IProps {
    userNotFoundT: string;
}

const UserList: FC<IProps> = ({ userNotFoundT }) => {
    const myUser = useMyUserStore((state) => state.myUser);
    const getUsers = useUsersStore((state) => state.getUsers);
    const addUsers = useUsersStore((state) => state.addUsers);
    const getAllUsers = useUsersStore((state) => state.getAllUsers);
    const addAllUsers = useUsersStore((state) => state.addAllUsers);
    const users = useUsersStore((state) => state.list);
    const page = useUsersStore((state) => state.page);
    const search = useUsersStore((state) => state.search);
    const setSearch = useUsersStore((state) => state.setSearch);
    const stopRequests = useUsersStore((state) => state.stopRequests);
    const isLoading = useUsersStore((state) => state.isLoading);

    const { ref, inView } = useInView({
        threshold: 0,
    });

    const userListRef = useRef<HTMLDivElement>(null);
    const gotUser = useRef(false);

    const [firstLoad, setFirstLoad] = useState<boolean>(true);
    const [userType, setUserType] = useState<ISendUsersParams['userType']>(
        EUserType.ALL
    );

    const handleChangeSearchBar = async (value: string) => {
        await setSearch(value);

        if (!userListRef.current) return;

        userListRef.current.scrollTo(0, 0);

        if (!myUser) {
            getAllUsers({
                page: 1,
                limit: USERS_PAGINATION_LIMIT,
                search: value,
            });
        } else {
            getUsers({
                page: 1,
                limit: USERS_PAGINATION_LIMIT,
                myUserId: myUser.id,
                userType,
                search: value,
            });
        }
    };

    const updateUsers = () => {
        if (!myUser) return;

        // dispatch(getUsers({
        //     page: 1,
        //     limit: USERS_PAGINATION_LIMIT,
        //     myUserId: myUser.id,
        //     userType,
        //     search: users.search
        // }));

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
            addUsers({
                page,
                limit: USERS_PAGINATION_LIMIT,
                myUserId: myUser.id,
                userType,
                search,
            });
        } else {
            addAllUsers({ page, limit: USERS_PAGINATION_LIMIT, search });
        }
    }, [inView]);

    useEffect(() => {
        if (gotUser.current) return;
        gotUser.current = true;
        if (myUser) {
            getUsers({
                page: 1,
                limit: USERS_PAGINATION_LIMIT,
                myUserId: myUser.id,
                userType,
                search,
            });
        } else {
            getAllUsers({ page: 1, limit: USERS_PAGINATION_LIMIT, search });
        }
    }, []);

    return (
        <>
            <div>
                <UiSearch
                    id="user-search"
                    label={'ddddddddddd'}
                    changeSearchBar={handleChangeSearchBar}
                />
            </div>

            <div className="grow overflow-y-auto pr-2" ref={userListRef}>
                <ul className="list">
                    {users.map((user) => (
                        <UserAction
                            key={user.id}
                            user={user}
                            updateUsers={updateUsers}
                            userNotFoundT={userNotFoundT}
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
