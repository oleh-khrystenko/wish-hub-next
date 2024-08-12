'use client';

import { FC, useRef, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useUsersStore } from '@/stores/users';
import Loading from '@/components/layouts/Loading';
import UserAction from '@/components/layouts/sidebar/UserAction';
import { useMyUserStore } from '@/stores/my-user';
import { USERS_PAGINATION_LIMIT } from '@/helpers/utils/constants';
import { EUserType, ISendUsersParams } from '@/stores/users/types';

interface IProps {
    text?: string;
}

const UserList: FC<IProps> = ({ text }) => {
    const myUser = useMyUserStore((state) => state.myUser);
    const getUsers = useUsersStore((state) => state.getUsers);
    const users = useUsersStore((state) => state.list);
    const search = useUsersStore((state) => state.search);
    const stopRequests = useUsersStore((state) => state.stopRequests);
    const isLoading = useUsersStore((state) => state.isLoading);

    const { ref, inView } = useInView({
        threshold: 0,
    });

    const userListRef = useRef<HTMLDivElement>(null);

    const [firstLoad, setFirstLoad] = useState<boolean>(true);
    const [userType, setUserType] = useState<ISendUsersParams['userType']>(
        EUserType.ALL
    );

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
        console.log('UserList useEffect', myUser);
        if (myUser) {
            getUsers({
                page: 1,
                limit: USERS_PAGINATION_LIMIT,
                myUserId: myUser.id,
                userType,
                search,
            });
        } else {
            // dispatch(getAllUsers({ page: 1, limit: USERS_PAGINATION_LIMIT, search: users.search }));
        }
    }, [myUser]);

    return (
        <>
            <div className="pr-2" ref={userListRef}>
                <ul className="list">
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
