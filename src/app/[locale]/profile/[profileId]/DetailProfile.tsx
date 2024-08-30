import { FC, useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/uk';
import 'dayjs/locale/ru';
import { EPrivacy } from '@/models/Settings';
import { useMyUserStore } from '@/stores/my-user';
import { useWishesStore } from '@/stores/wishes';
import UseFullName from '@/helpers/hooks/UseFullName';
import UseScreenWidth from '@/helpers/hooks/UseScreenWidth';
import UseLocaleFormats from '@/helpers/hooks/UseLocaleFormats';
import UiAvatar from '@/components/ui/UiAvatar';

dayjs.extend(advancedFormat);

const DetailProfile: FC = () => {
    const myUser = useMyUserStore((state) => state.myUser);

    const wishesCreator = useWishesStore((state) => state.creator);

    const profilePageT = useTranslations('profile-page');
    const activeLocale = useLocale();

    const { getMonthWithDate } = UseLocaleFormats();

    // Avatar
    const avatar = useMemo(() => {
        if (myUser?.id === wishesCreator?.id) {
            return myUser?.avatar;
        }
        return wishesCreator?.avatar;
    }, [wishesCreator, myUser]);

    const { getFullName } = UseFullName();
    const screenWidth = UseScreenWidth();

    // isMyFriend
    const isMyFriend = useMemo(
        () => wishesCreator && myUser?.friends.includes(wishesCreator.id),
        [wishesCreator, myUser]
    );

    // Email
    const showEmail = useMemo(() => {
        const showAll = wishesCreator?.showEmail === EPrivacy.ALL;
        const showMyFriend =
            wishesCreator?.showEmail === EPrivacy.FRIENDS && isMyFriend;
        return (
            wishesCreator?.email &&
            (wishesCreator?.id === myUser?.id || showAll || showMyFriend)
        );
    }, [wishesCreator, myUser]);
    const email = useMemo(() => {
        if (myUser?.id === wishesCreator?.id) {
            return myUser?.email;
        } else {
            if (showEmail) {
                return wishesCreator?.email;
            } else {
                return profilePageT('unknown');
            }
        }
    }, [showEmail, wishesCreator, myUser]);

    // Birthday
    const showBirthday = useMemo(() => {
        const showAll = wishesCreator?.showBirthday === EPrivacy.ALL;
        const showMyFriend =
            wishesCreator?.showBirthday === EPrivacy.FRIENDS && isMyFriend;
        return (
            wishesCreator?.birthday &&
            (wishesCreator?.id === myUser?.id || showAll || showMyFriend)
        );
    }, [wishesCreator, myUser]);
    const birthday = useMemo(() => {
        if (myUser?.id === wishesCreator?.id) {
            if (myUser?.birthday) {
                return dayjs(myUser?.birthday)
                    .locale(activeLocale)
                    .format(getMonthWithDate());
            } else {
                return profilePageT('unknown');
            }
        } else {
            if (showBirthday) {
                return dayjs(wishesCreator?.birthday)
                    .locale(activeLocale)
                    .format(getMonthWithDate());
            } else {
                return profilePageT('unknown');
            }
        }
    }, [showBirthday, wishesCreator, myUser]);

    // Delivery Address
    const showDeliveryAddress = useMemo(() => {
        const showAll = wishesCreator?.showDeliveryAddress === EPrivacy.ALL;
        const showMyFriend =
            wishesCreator?.showDeliveryAddress === EPrivacy.FRIENDS &&
            isMyFriend;
        return (
            wishesCreator?.deliveryAddress &&
            (wishesCreator?.id === myUser?.id || showAll || showMyFriend)
        );
    }, [wishesCreator, myUser]);
    const deliveryAddress = useMemo(() => {
        if (myUser?.id === wishesCreator?.id) {
            if (myUser?.deliveryAddress) {
                return myUser?.deliveryAddress;
            } else {
                return profilePageT('unknown');
            }
        } else {
            if (showDeliveryAddress) {
                return wishesCreator?.deliveryAddress;
            } else {
                return profilePageT('unknown');
            }
        }
    }, [showDeliveryAddress, wishesCreator, myUser]);

    // Count of successful and unsuccessful wishes
    const successfulWishes =
        wishesCreator && wishesCreator.successfulWishes > 0
            ? wishesCreator.successfulWishes
            : 0;
    const unsuccessfulWishes =
        wishesCreator && wishesCreator.unsuccessfulWishes > 0
            ? wishesCreator.unsuccessfulWishes
            : 0;
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

    return (
        <div className="mt-8 flex flex-col gap-5">
            <div className="flex items-center gap-3 tablet-sm:gap-4">
                <UiAvatar
                    avatar={avatar}
                    alt={
                        myUser?.id === wishesCreator?.id
                            ? getFullName(myUser)
                            : getFullName(wishesCreator)
                    }
                    priority
                    size={screenWidth < 768 ? 144 : 208}
                    sizeTailwind="w-36 min-w-36 h-36 min-h-36 tablet-md:w-52 tablet-md:min-w-52 tablet-md:h-52 tablet-md:min-h-52"
                    sizeIcon="w-28 h-28 tablet-md:w-40 tablet-md:h-40"
                />

                <div className="flex max-w-32 flex-col gap-1 mobile-xs:max-w-40 mobile-sm:max-w-48 mobile-md:max-w-56 mobile-lg:max-w-60 mobile-xl:max-w-72 tablet-sm:max-w-96 tablet-md:max-w-lg tablet-lg:max-w-3xl desktop-xs:max-w-5xl">
                    <p
                        className="w-full truncate text-2xl font-bold text-zinc-700 dark:text-zinc-300 tablet-md:text-3xl"
                        title={
                            myUser?.id === wishesCreator?.id
                                ? getFullName(myUser)
                                : getFullName(wishesCreator)
                        }
                    >
                        {myUser?.id === wishesCreator?.id
                            ? getFullName(myUser)
                            : getFullName(wishesCreator)}
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
        </div>
    );
};

export default DetailProfile;
