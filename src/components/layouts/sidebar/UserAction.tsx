'use client';

import { FC, useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/uk';
import { IUser } from '@/models/User';
import { EPrivacy } from '@/models/Settings';
import { useMyUserStore } from '@/stores/my-user';
import UiAvatar from '@/components/ui/UiAvatar';
import getFullName from '@/helpers/utils/get-full-name';
import useLocaleFormats from '@/helpers/hooks/useLocaleFormats';

dayjs.extend(advancedFormat);

interface IProps {
    user: IUser;
    updateUsers: () => void;
    userNotFoundT: string;
}

const UserAction: FC<IProps> = ({ user, updateUsers, userNotFoundT }) => {
    const mainPageT = useTranslations('main-page');

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
                    {mainPageT('bd', {
                        birthday: dayjs(user.birthday)
                            .locale(activeLocale)
                            .format(getMonthWithDate()),
                    })}
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
        <li className="flex items-center gap-5 py-2">
            <UiAvatar
                avatar={user.avatar}
                alt={getFullName(user, userNotFoundT)}
                size={40}
                handleClick={handleClick}
            />

            <div className="flex grow flex-col gap-0.5">
                <span className="text-sm text-zinc-800 dark:text-zinc-300">
                    {getFullName(user, userNotFoundT)}
                </span>

                {params !== null && params}
            </div>
        </li>
    );
};

export default UserAction;
