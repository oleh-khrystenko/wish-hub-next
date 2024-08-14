'use client';

import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/uk';
import { IUser } from '@/models/User';
import { EPrivacy, ETheme } from '@/models/Settings';
import { useMyUserStore } from '@/stores/my-user';
import UiAvatar from '@/components/ui/UiAvatar';
import getFullName from '@/helpers/utils/get-full-name';
import useLocaleFormats from '@/helpers/hooks/useLocaleFormats';
import ThreeDotsIcon from '@/components/icons/ThreeDotsIcon';
import UiButton from '@/components/ui/UiButton';
import UiPopup from '@/components/ui/UiPopup';
import { EWhereRemove, IRemoveFriend } from '@/stores/my-user/types';
import PersonIcon from '@/components/icons/PersonIcon';
import PersonAddIcon from '@/components/icons/PersonAddIcon';
import PersonRemoveIcon from '@/components/icons/PersonRemoveIcon';
import { useRouter } from 'next/navigation';

dayjs.extend(advancedFormat);

interface IProps {
    user: IUser;
    updateUsers: () => void;
    userProfileT: string;
}

const UserAction: FC<IProps> = ({ user, updateUsers, userProfileT }) => {
    const mainPageT = useTranslations('main-page');

    const myUser = useMyUserStore((state) => state.myUser);
    const addFriend = useMyUserStore((state) => state.addFriend);
    const removeFriend = useMyUserStore((state) => state.removeFriend);

    const activeLocale = useLocale();
    const router = useRouter();

    const { getMonthWithDate } = useLocaleFormats();

    const popupActionRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLLIElement>(null);

    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [showPopupUp, setShowPopupUp] = useState<boolean>(false);
    const [textWidth, setTextWidth] = useState<number>(0);

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
        router.push(`/${activeLocale}/profile/${user.id}`);
    };

    const handleSelectWish = async () => {
        console.log('handleSelectWish');
        // await handleGetInitialWishList(dispatch, myUser?.id, user.id);
        // hideSidebar();
    };

    const handleAddFriend = async () => {
        if (myUser) {
            await addFriend({ myId: myUser.id, friendId: user.id });
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
            await removeFriend({
                myId: myUser.id,
                friendId: user.id,
                whereRemove,
            });
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
                setTextWidth(containerWidth - 2 - 12 - 40 - 40 - 16 - 24); // 2 - left and right border, 12 - left padding, 40 - avatar width, 40 - action width, 16 - two gaps between elements, 24 - left and right padding in content
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
            className={`${borderColor} flex items-center gap-2 rounded-md border border-dashed py-1 pl-3`}
            ref={containerRef}
        >
            <UiAvatar
                avatar={user.avatar}
                alt={getFullName(user, mainPageT('user_not_found'))}
                size={40}
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
                    {getFullName(user, mainPageT('user_not_found'))}
                </span>

                {params !== null && params}
            </button>

            <div className="relative" ref={popupActionRef}>
                <UiButton variant="text" onClick={handleShowPopup}>
                    <ThreeDotsIcon classes="m-2 w-6 h-6 stroke-zinc-800 dark:stroke-zinc-300" />
                </UiButton>

                <UiPopup
                    classes={showPopupUp ? 'pb-10' : 'pt-10'}
                    show={showPopup}
                    showPopupUp={showPopupUp}
                    hide={() => setShowPopup(false)}
                >
                    <div className="flex flex-col p-2">
                        <UiButton href={`profile/${user.id}`} variant="text">
                            <span className="flex items-center gap-2 rounded-md px-2 py-1 text-sm text-zinc-800 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800">
                                <PersonIcon classes="w-5 h-5 fill-zinc-800 dark:fill-zinc-300" />
                                {userProfileT}
                            </span>
                        </UiButton>
                        {showAddFriend && (
                            <UiButton variant="text" onClick={handleAddFriend}>
                                <span className="flex items-center gap-2 rounded-md px-2 py-1 text-sm text-zinc-800 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800">
                                    <PersonAddIcon classes="w-5 h-5 fill-zinc-800 dark:fill-zinc-300" />
                                    {myUser?.followFrom.includes(user.id)
                                        ? mainPageT('confirm-friendship')
                                        : mainPageT('add-friend')}
                                </span>
                            </UiButton>
                        )}
                        {(myUser?.friends.includes(user.id) ||
                            myUser?.followTo.includes(user.id)) && (
                            <UiButton
                                variant="text"
                                onClick={() =>
                                    handleRemoveFriend(EWhereRemove.FOLLOW_TO)
                                }
                            >
                                <span className="flex items-center gap-2 rounded-md px-2 py-1 text-sm text-zinc-800 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800">
                                    <PersonRemoveIcon classes="w-5 h-5 fill-zinc-800 dark:fill-zinc-300" />
                                    {mainPageT('delete-your')} <br />{' '}
                                    {mainPageT('delete-request')}
                                </span>
                            </UiButton>
                        )}
                        {(myUser?.friends.includes(user.id) ||
                            myUser?.followFrom.includes(user.id)) && (
                            <UiButton
                                variant="text"
                                onClick={() =>
                                    handleRemoveFriend(EWhereRemove.FOLLOW_FROM)
                                }
                            >
                                <span className="flex items-center gap-2 rounded-md px-2 py-1 text-sm text-zinc-800 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800">
                                    <PersonRemoveIcon classes="w-5 h-5 fill-zinc-800 dark:fill-zinc-300" />
                                    {mainPageT('delete-user_s')} <br />{' '}
                                    {mainPageT('delete-request')}
                                </span>
                            </UiButton>
                        )}
                        {myUser?.friends.includes(user.id) && (
                            <UiButton
                                variant="text"
                                onClick={() =>
                                    handleRemoveFriend(EWhereRemove.FRIENDS)
                                }
                            >
                                <span className="flex items-center gap-2 rounded-md px-2 py-1 text-sm text-zinc-800 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800">
                                    <PersonRemoveIcon classes="w-5 h-5 fill-zinc-800 dark:fill-zinc-300" />
                                    {mainPageT('remove-friend')}
                                </span>
                            </UiButton>
                        )}
                    </div>
                </UiPopup>
            </div>
        </li>
    );
};

export default UserAction;
