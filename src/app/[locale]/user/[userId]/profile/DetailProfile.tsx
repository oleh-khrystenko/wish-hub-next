import { FC, useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import 'dayjs/locale/ru';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { EPrivacy, IZoomedImage } from '@/models/Settings';
import { useMyUserStore } from '@/stores/my-user';
import { useUsersStore } from '@/stores/users';
import UseFullName from '@/helpers/hooks/UseFullName';
import UseScreenSize from '@/helpers/hooks/UseScreenSize';
import UseLocaleFormats from '@/helpers/hooks/UseLocaleFormats';
import FriendAction from '@/app/[locale]/user/[userId]/profile/FriendAction';
import ZoomedImageModal from '@/components/layouts/ZoomedImageModal';
import UiAvatar from '@/components/ui/UiAvatar';

dayjs.extend(advancedFormat);

const DetailProfile: FC = () => {
    const [imageData, setImageData] = useState<IZoomedImage | null>(null);

    const activeLocale = useLocale();
    const profilePageT = useTranslations('profile-page');

    const myUser = useMyUserStore((state) => state.myUser);

    const user = useUsersStore((state) => state.user);

    const { getFullName } = UseFullName();
    const { screenWidth } = UseScreenSize();
    const { getMonthWithDate } = UseLocaleFormats();

    // Avatar
    const avatar = useMemo(() => {
        if (myUser?.id === user?.id) {
            return myUser?.avatar;
        }
        return user?.avatar;
    }, [user, myUser]);

    // isMyFriend
    const isMyFriend = useMemo(
        () => user && myUser?.friends.includes(user.id),
        [user, myUser]
    );

    // Email
    const showEmail = useMemo(() => {
        const showAll = user?.showEmail === EPrivacy.ALL;
        const showMyFriend = user?.showEmail === EPrivacy.FRIENDS && isMyFriend;
        return (
            user?.email && (user?.id === myUser?.id || showAll || showMyFriend)
        );
    }, [user, myUser]);
    const email = useMemo(() => {
        if (myUser?.id === user?.id) {
            return myUser?.email;
        } else {
            if (showEmail) {
                return user?.email;
            } else {
                return profilePageT('unknown');
            }
        }
    }, [showEmail, user, myUser]);

    // Birthday
    const showBirthday = useMemo(() => {
        const showAll = user?.showBirthday === EPrivacy.ALL;
        const showMyFriend =
            user?.showBirthday === EPrivacy.FRIENDS && isMyFriend;
        return (
            user?.birthday &&
            (user?.id === myUser?.id || showAll || showMyFriend)
        );
    }, [user, myUser]);
    const birthday = useMemo(() => {
        if (myUser?.id === user?.id) {
            if (myUser?.birthday) {
                return dayjs(myUser?.birthday)
                    .locale(activeLocale === 'ua' ? 'uk' : activeLocale)
                    .format(getMonthWithDate());
            } else {
                return profilePageT('unknown');
            }
        } else {
            if (showBirthday) {
                return dayjs(user?.birthday)
                    .locale(activeLocale === 'ua' ? 'uk' : activeLocale)
                    .format(getMonthWithDate());
            } else {
                return profilePageT('unknown');
            }
        }
    }, [showBirthday, user, myUser]);

    // Delivery Address
    const showDeliveryAddress = useMemo(() => {
        const showAll = user?.showDeliveryAddress === EPrivacy.ALL;
        const showMyFriend =
            user?.showDeliveryAddress === EPrivacy.FRIENDS && isMyFriend;
        return (
            user?.deliveryAddress &&
            (user?.id === myUser?.id || showAll || showMyFriend)
        );
    }, [user, myUser]);
    const deliveryAddress = useMemo(() => {
        if (myUser?.id === user?.id) {
            if (myUser?.deliveryAddress) {
                return myUser?.deliveryAddress;
            } else {
                return profilePageT('unknown');
            }
        } else {
            if (showDeliveryAddress) {
                return user?.deliveryAddress;
            } else {
                return profilePageT('unknown');
            }
        }
    }, [showDeliveryAddress, user, myUser]);

    // Count of successful and unsuccessful wishes
    const successfulWishes =
        user && user.successfulWishes > 0 ? user.successfulWishes : 0;
    const unsuccessfulWishes =
        user && user.unsuccessfulWishes > 0 ? user.unsuccessfulWishes : 0;
    const tWishSuccess = useMemo(() => {
        if (successfulWishes === 1) {
            return 'wish';
        }

        if (
            successfulWishes === 2 ||
            successfulWishes === 3 ||
            successfulWishes === 4
        ) {
            return 'wish_2_3_4';
        }

        return 'wishes';
    }, [successfulWishes]);
    const tWishUnsuccess = useMemo(() => {
        if (unsuccessfulWishes === 1) {
            return 'wish';
        }

        if (
            unsuccessfulWishes === 2 ||
            unsuccessfulWishes === 3 ||
            unsuccessfulWishes === 4
        ) {
            return 'wish_2_3_4';
        }

        return 'wishes';
    }, [unsuccessfulWishes]);

    const handleShowImage = (src: string | undefined, alt: string) => {
        src ? setImageData({ src, alt }) : setImageData(null);
    };

    return (
        <div className="mt-8 flex flex-col gap-5">
            <div className="flex items-center gap-3 tablet-sm:gap-4">
                <div className="relative">
                    <UiAvatar
                        avatar={avatar}
                        alt={
                            myUser?.id === user?.id
                                ? getFullName(myUser)
                                : getFullName(user)
                        }
                        priority
                        size={screenWidth < 768 ? 144 : 208}
                        sizeTailwind="w-36 min-w-36 h-36 min-h-36 tablet-md:w-52 tablet-md:min-w-52 tablet-md:h-52 tablet-md:min-h-52"
                        sizeIcon="w-28 h-28 tablet-md:w-40 tablet-md:h-40"
                        handleClick={() =>
                            handleShowImage(user?.avatar, getFullName(user))
                        }
                    />

                    {myUser && user && (
                        <FriendAction myUser={myUser} user={user} />
                    )}
                </div>

                <div className="flex max-w-32 flex-col gap-1 mobile-xs:max-w-40 mobile-sm:max-w-48 mobile-md:max-w-56 mobile-lg:max-w-60 mobile-xl:max-w-72 tablet-sm:max-w-96 tablet-md:max-w-lg tablet-lg:max-w-3xl desktop-xs:max-w-5xl">
                    <p
                        className="w-full truncate text-2xl font-bold text-zinc-700 dark:text-zinc-300 tablet-md:text-3xl"
                        title={
                            myUser?.id === user?.id
                                ? getFullName(myUser)
                                : getFullName(user)
                        }
                    >
                        {myUser?.id === user?.id
                            ? getFullName(myUser)
                            : getFullName(user)}
                    </p>

                    {showEmail && (
                        <p
                            className="w-full truncate text-xl text-zinc-600 dark:text-zinc-400 tablet-md:text-2xl"
                            title={email}
                        >
                            {email}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <p className="text-base text-zinc-600 dark:text-zinc-400">
                    {profilePageT('birthday')}:
                </p>

                <p className="text-lg font-bold text-zinc-700 dark:text-zinc-300">
                    {birthday}
                </p>
            </div>

            <div className="flex flex-col gap-1">
                <p className="text-base text-zinc-600 dark:text-zinc-400">
                    {profilePageT('delivery-address')}:
                </p>

                <p className="text-lg font-bold text-zinc-700 dark:text-zinc-300">
                    {deliveryAddress}
                </p>
            </div>

            <div className="flex items-center gap-2">
                <p className="text-base text-zinc-600 dark:text-zinc-400">
                    {profilePageT('i_have_fulfilled')}
                </p>

                <span
                    className={`${successfulWishes > 0 ? 'text-lime-400' : 'text-zinc-700 dark:text-zinc-300'} text-base`}
                >
                    {successfulWishes}
                </span>

                <p className="text-base text-zinc-600 dark:text-zinc-400">
                    {profilePageT(tWishSuccess)}
                </p>
            </div>

            <div className="flex items-center gap-2">
                <p className="text-base text-zinc-600 dark:text-zinc-400">
                    {profilePageT('i_did_not_fulfill')}
                </p>

                <span
                    className={`${unsuccessfulWishes > 0 ? 'text-rose-500' : 'text-zinc-700 dark:text-zinc-300'} text-base`}
                >
                    {unsuccessfulWishes}
                </span>

                <p className="text-base text-zinc-600 dark:text-zinc-400">
                    {profilePageT(tWishUnsuccess)}
                </p>
            </div>

            {!!imageData && (
                <ZoomedImageModal
                    src={imageData.src}
                    alt={imageData.alt}
                    hide={() => setImageData(null)}
                />
            )}
        </div>
    );
};

export default DetailProfile;
