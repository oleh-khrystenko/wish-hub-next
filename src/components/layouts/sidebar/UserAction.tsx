'use client';

import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/uk';
import { IUser } from '@/models/User';
import { EPrivacy } from '@/models/Settings';
import { EWhereRemove, IRemoveFriend } from '@/stores/my-user/types';
import { useMyUserStore } from '@/stores/my-user';
import { useUsersStore } from '@/stores/users';
import { useSettingsStore } from '@/stores/settings';
import UseLocaleFormats from '@/helpers/hooks/UseLocaleFormats';
import UseInitialWishes from '@/helpers/hooks/UseInitialWishes';
import UseFullName from '@/helpers/hooks/UseFullName';
import UiLoading from '@/components/ui/UiLoading';
import UiAvatar from '@/components/ui/UiAvatar';
import UiButton from '@/components/ui/UiButton';
import UiPopup from '@/components/ui/UiPopup';
import ThreeDotsIcon from '@/components/icons/ThreeDotsIcon';
import PersonIcon from '@/components/icons/PersonIcon';
import PersonAddIcon from '@/components/icons/PersonAddIcon';
import PersonRemoveIcon from '@/components/icons/PersonRemoveIcon';

dayjs.extend(advancedFormat);

interface IProps {
    user: IUser;
    updateUsers: () => void;
}

const UserAction: FC<IProps> = ({ user, updateUsers }) => {
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [showPopupUp, setShowPopupUp] = useState<boolean>(false);
    const [textWidth, setTextWidth] = useState<number>(0);
    const [isLoadingNav, setIsLoadingNav] = useState<boolean>(false);
    const [isLoadingAddFriend, setIsLoadingAddFriend] =
        useState<boolean>(false);
    const [isLoadingRemoveFriend, setIsLoadingRemoveFriend] = useState<
        Record<EWhereRemove, boolean>
    >({
        [EWhereRemove.FRIENDS]: false,
        [EWhereRemove.FOLLOW_FROM]: false,
        [EWhereRemove.FOLLOW_TO]: false,
    });

    const popupActionRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLLIElement>(null);

    const router = useRouter();

    const activeLocale = useLocale();
    const mainPageT = useTranslations('main-page');
    const alertsT = useTranslations('alerts');

    const myUser = useMyUserStore((state) => state.myUser);
    const addFriend = useMyUserStore((state) => state.addFriend);
    const removeFriend = useMyUserStore((state) => state.removeFriend);

    const selectedUserId = useUsersStore((state) => state.selectedUserId);

    const setActivatedBurgerMenu = useSettingsStore(
        (state) => state.setActivatedBurgerMenu
    );

    const { getMonthWithDate } = UseLocaleFormats();
    const { getInitialWishList } = UseInitialWishes();
    const { getFullName } = UseFullName();

    let borderColor = 'border-transparent';
    myUser?.followTo.includes(user.id) &&
        (borderColor = 'border-zinc-400 dark:border-zinc-700');
    myUser?.followFrom.includes(user.id) &&
        (borderColor = 'border-zinc-200 dark:border-zinc-600');
    myUser?.friends.includes(user.id) &&
        (borderColor = 'border-cyan-400 dark:border-cyan-700');

    const showAddFriend =
        myUser?.followFrom.includes(user.id) ||
        (!myUser?.friends.includes(user.id) &&
            !myUser?.followTo.includes(user.id));

    const params = useMemo(() => {
        const showBirthday =
            user?.birthday &&
            (user?.id === myUser?.id ||
                user?.showBirthday === EPrivacy.ALL ||
                (user?.showBirthday === EPrivacy.FRIENDS &&
                    myUser?.friends.includes(user.id)));
        if (showBirthday) {
            return (
                <span
                    className="truncate text-left text-xs text-zinc-700 dark:text-zinc-400"
                    style={{ width: `${textWidth}px` }}
                >
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
                <span
                    className="truncate text-left text-xs text-zinc-700 dark:text-zinc-400"
                    style={{ width: `${textWidth}px` }}
                >
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
                <span
                    className="truncate text-left text-xs text-zinc-700 dark:text-zinc-400"
                    style={{ width: `${textWidth}px` }}
                >
                    {user.email}
                </span>
            );
        }

        return null;
    }, [user, myUser, textWidth]);

    const handleGoToProfilePage = () => {
        setIsLoadingNav(true);
        router.push(`/${activeLocale}/profile/${user.id}`);
    };

    const handleSelectWish = async () => {
        await getInitialWishList(myUser?.id, user.id);
        setActivatedBurgerMenu(false);
    };

    const handleAddFriend = async () => {
        if (myUser) {
            setIsLoadingAddFriend(true);

            await addFriend(
                { myId: myUser.id, friendId: user.id },
                alertsT('my-user-api.add-friend.error')
            );

            setIsLoadingAddFriend(false);
            setShowPopup(false);
            updateUsers();
        } else {
            router.push(`/${activeLocale}/auth`);
        }
    };

    const handleRemoveFriend = async (
        whereRemove: IRemoveFriend['whereRemove']
    ) => {
        if (myUser) {
            setIsLoadingRemoveFriend((prev) => ({
                ...prev,
                [whereRemove]: true,
            }));

            await removeFriend(
                {
                    myId: myUser.id,
                    friendId: user.id,
                    whereRemove,
                },
                alertsT('my-user-api.remove-friend.error')
            );

            setIsLoadingRemoveFriend((prev) => ({
                ...prev,
                [whereRemove]: false,
            }));
            setShowPopup(false);
            updateUsers();
        } else {
            router.push(`/${activeLocale}/auth`);
        }
    };

    const handleShowPopup = () => {
        if (popupActionRef.current) {
            const windowHeight = window.innerHeight;
            const threshold = windowHeight * (2 / 3);
            const popupActionTop =
                popupActionRef.current.getBoundingClientRect().top;

            if (popupActionTop > threshold) {
                setShowPopupUp(true);
            } else {
                setShowPopupUp(false);
            }
        }

        setShowPopup(true);
    };

    useEffect(() => {
        if (containerRef.current) {
            const handleResize = () => {
                const containerWidth: number =
                    containerRef.current?.offsetWidth || 0;

                // 2 - left and right border,
                // 12 - left padding,
                // 40 - avatar width,
                // 40 - action width,
                // 16 - two gaps between elements,
                // 24 - left and right padding in content
                setTextWidth(containerWidth - 2 - 12 - 40 - 40 - 16 - 24);
            };
            handleResize();

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    return (
        <li
            className={`${borderColor} ${user.id === selectedUserId ? 'bg-zinc-100 dark:bg-zinc-900' : ''} flex items-center gap-2 rounded-md border border-dashed py-1 pl-3`}
            ref={containerRef}
        >
            <UiAvatar
                avatar={user.avatar}
                alt={getFullName(user)}
                size={40}
                isLoading={isLoadingNav}
                bgLoading={
                    user.id === selectedUserId
                        ? 'bg-zinc-100 dark:bg-zinc-900'
                        : 'bg-zinc-300 dark:bg-zinc-800'
                }
                handleClick={handleGoToProfilePage}
            />

            <button
                type="button"
                className="flex grow flex-col gap-0.5 rounded-md px-3 py-1 transition-all duration-300 ease-in-out hover:bg-zinc-200 hover:dark:bg-zinc-700"
                onClick={handleSelectWish}
            >
                <span
                    className="truncate text-left text-sm text-zinc-800 dark:text-zinc-300"
                    style={{ width: `${textWidth}px` }}
                >
                    {getFullName(user)}
                </span>

                {params !== null && params}
            </button>

            <div className="relative" ref={popupActionRef}>
                <UiButton variant="text" onBtnClick={handleShowPopup}>
                    <ThreeDotsIcon classes="m-2 w-6 h-6 stroke-zinc-800 dark:stroke-zinc-300" />
                </UiButton>

                <UiPopup
                    classes={showPopupUp ? 'pb-10' : 'pt-10'}
                    show={showPopup}
                    showPopupUp={showPopupUp}
                    hide={() => setShowPopup(false)}
                >
                    <div className="flex flex-col p-2">
                        <button
                            className="relative flex items-center gap-2 whitespace-nowrap rounded-md px-2 py-2.5 text-left text-sm font-bold text-zinc-500 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800"
                            type="button"
                            onClick={handleGoToProfilePage}
                        >
                            <PersonIcon classes="w-5 min-w-5 h-5 fill-zinc-500 dark:fill-zinc-300" />

                            {mainPageT('user-profile')}

                            {isLoadingNav && (
                                <UiLoading
                                    isLocal
                                    size="h-6 min-h-6 w-6 min-w-6"
                                    bg="bg-zinc-100 dark:bg-zinc-700"
                                />
                            )}
                        </button>
                        {showAddFriend && (
                            <button
                                className="relative flex items-center gap-2 whitespace-nowrap rounded-md px-2 py-2.5 text-left text-sm font-bold text-zinc-500 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800"
                                type="button"
                                onClick={handleAddFriend}
                            >
                                <PersonAddIcon classes="w-5 min-w-5 h-5 fill-zinc-500 dark:fill-zinc-300" />

                                {myUser?.followFrom.includes(user.id)
                                    ? mainPageT('confirm-friendship')
                                    : mainPageT('add-friend')}

                                {isLoadingAddFriend && (
                                    <UiLoading
                                        isLocal
                                        size="h-6 min-h-6 w-6 min-w-6"
                                        bg="bg-zinc-100 dark:bg-zinc-700"
                                    />
                                )}
                            </button>
                        )}
                        {(myUser?.friends.includes(user.id) ||
                            myUser?.followTo.includes(user.id)) && (
                            <button
                                className="relative flex items-center gap-2 whitespace-nowrap rounded-md px-2 py-2.5 text-left text-sm font-bold text-zinc-500 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800"
                                type="button"
                                onClick={() =>
                                    handleRemoveFriend(EWhereRemove.FOLLOW_TO)
                                }
                            >
                                <PersonRemoveIcon classes="w-5 min-w-5 h-5 fill-zinc-500 dark:fill-zinc-300" />
                                {mainPageT('delete-your')} <br />{' '}
                                {mainPageT('delete-request')}
                                {isLoadingRemoveFriend[
                                    EWhereRemove.FOLLOW_TO
                                ] && (
                                    <UiLoading
                                        isLocal
                                        size="h-6 min-h-6 w-6 min-w-6"
                                        bg="bg-zinc-100 dark:bg-zinc-700"
                                    />
                                )}
                            </button>
                        )}
                        {(myUser?.friends.includes(user.id) ||
                            myUser?.followFrom.includes(user.id)) && (
                            <button
                                className="relative flex items-center gap-2 whitespace-nowrap rounded-md px-2 py-2.5 text-left text-sm font-bold text-zinc-500 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800"
                                type="button"
                                onClick={() =>
                                    handleRemoveFriend(EWhereRemove.FOLLOW_FROM)
                                }
                            >
                                <PersonRemoveIcon classes="w-5 min-w-5 h-5 fill-zinc-500 dark:fill-zinc-300" />
                                {mainPageT('delete-user_s')} <br />{' '}
                                {mainPageT('delete-request')}
                                {isLoadingRemoveFriend[
                                    EWhereRemove.FOLLOW_FROM
                                ] && (
                                    <UiLoading
                                        isLocal
                                        size="h-6 min-h-6 w-6 min-w-6"
                                        bg="bg-zinc-100 dark:bg-zinc-700"
                                    />
                                )}
                            </button>
                        )}
                        {myUser?.friends.includes(user.id) && (
                            <button
                                className="relative flex items-center gap-2 whitespace-nowrap rounded-md px-2 py-2.5 text-left text-sm font-bold text-zinc-500 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800"
                                type="button"
                                onClick={() =>
                                    handleRemoveFriend(EWhereRemove.FRIENDS)
                                }
                            >
                                <PersonRemoveIcon classes="w-5 min-w-5 h-5 fill-zinc-500 dark:fill-zinc-300" />

                                {mainPageT('remove-friend')}

                                {isLoadingRemoveFriend[
                                    EWhereRemove.FRIENDS
                                ] && (
                                    <UiLoading
                                        isLocal
                                        size="h-6 min-h-6 w-6 min-w-6"
                                        bg="bg-zinc-100 dark:bg-zinc-700"
                                    />
                                )}
                            </button>
                        )}
                    </div>
                </UiPopup>
            </div>
        </li>
    );
};

export default UserAction;
