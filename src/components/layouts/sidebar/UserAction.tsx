'use client';

import { FC, useMemo } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import UiAvatar from '@/components/ui/UiAvatar';
import { IUser } from '@/models/User';
import getFullName from '@/helpers/utils/get-full-name';
import { useMyUserStore } from '@/stores/my-user';
import { EPrivacy } from '@/models/Settings';
import { useLocale } from 'next-intl';
import useLocaleFormats from '@/helpers/hooks/useLocaleFormats';

interface IProps {
    user: IUser;
    updateUsers: () => void;
}

const UserAction: FC<IProps> = ({ user }) => {
    const myUser = useMyUserStore((state) => state.myUser);

    const activeLocale = useLocale();

    const { getMonthWithDate } = useLocaleFormats();

    const params = useMemo(() => {
        const showBirthday =
            user?.birthday &&
            (user?.id === myUser?.id ||
                user?.showBirthday === EPrivacy.ALL ||
                (user?.showBirthday === EPrivacy.FRIENDS &&
                    myUser?.friends.includes(user.id)));
        if (showBirthday) {
            return (
                <span className="text-xs text-zinc-700 dark:text-zinc-400">
                    {/*{t('main-page.bd', {*/}
                    {/*    birthday: dayjs(user.birthday)*/}
                    {/*        .locale(activeLocale)*/}
                    {/*        .format(getMonthWithDate()),*/}
                    {/*})}*/}
                </span>
            );
        }

        const showDeliveryAddress =
            user?.deliveryAddress &&
            (user?.id === myUser?.id ||
                user?.showDeliveryAddress === EPrivacy.ALL ||
                (user?.showDeliveryAddress === EPrivacy.FRIENDS &&
                    myUser?.friends.includes(user.id)));
        if (showDeliveryAddress) {
            return (
                <span className="text-xs text-zinc-700 dark:text-zinc-400">
                    {user.deliveryAddress}
                </span>
            );
        }

        const showEmail =
            user?.email &&
            (user?.id === myUser?.id ||
                user?.showEmail === EPrivacy.ALL ||
                (user?.showEmail === EPrivacy.FRIENDS &&
                    myUser?.friends.includes(user.id)));
        if (showEmail) {
            return (
                <span className="text-xs text-zinc-700 dark:text-zinc-400">
                    {user.email}
                </span>
            );
        }

        return null;
    }, [user, myUser]);

    const handleClick = () => {
        console.log('handleClick');
    };

    return (
        <li>
            <UiAvatar
                avatar={user.avatar}
                alt={getFullName(user, 'ddddd')}
                size={32}
                handleClick={handleClick}
            />

            <div>
                <span>{getFullName(user, 'ddddd')}</span>
                <span>{getFullName(user, 'ddddd')}</span>
            </div>
        </li>
    );
};

export default UserAction;
