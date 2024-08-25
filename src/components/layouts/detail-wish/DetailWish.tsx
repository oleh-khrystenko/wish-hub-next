'use client';

import { FC, useState, useRef, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import dayjs from 'dayjs';
import { IWish } from '@/models/Wish';
import { IUser } from '@/models/User';
import WishSwiper from '@/components/layouts/detail-wish/WishSwiper';
import WishContent from '@/components/layouts/detail-wish/WishContent';
import { useMyUserStore } from '@/stores/my-user';
import { isBookingExpired } from '@/helpers/utils/date-validators';
import LikeAction from '@/components/layouts/LikeAction';
import UiButton from '@/components/ui/UiButton';
import UseLocaleFormats from '@/helpers/hooks/UseLocaleFormats';
import { EWhoseWish } from '@/stores/wishes/types';
import BookWish from '@/components/layouts/detail-wish/BookWish';
import CancelBookWish from '@/components/layouts/detail-wish/CancelBookWish';
import DoneWish from '@/components/layouts/detail-wish/DoneWish';
import BookingExpired from '@/components/layouts/detail-wish/BookingExpired';

interface IProps {
    wish: IWish;
    selectedUser?: IUser;
    editWish?: () => void;
    hide: () => void;
}

const DetailWish: FC<IProps> = ({ wish, selectedUser, editWish, hide }) => {
    const [bodyHeight, setBodyHeight] = useState<number>(0);
    const footRef = useRef<HTMLDivElement>(null);

    const mainPageT = useTranslations('main-page');

    const myUser = useMyUserStore((state) => state.myUser);

    const activeLocale = useLocale();

    const { getFullDate } = UseLocaleFormats();

    const showDeliveryAddress =
        selectedUser?.deliveryAddress && myUser?.id === wish.booking?.userId;

    useEffect(() => {
        const footHeight = footRef.current?.clientHeight || 0;

        setBodyHeight(window.innerHeight - footHeight - 32);
    }, [footRef.current]);

    // я забронював або створив бажання
    const myUserBookedOrCreatedWish =
        myUser?.id === wish.booking?.userId || myUser?.id === wish.userId;

    // бажання належить тому хто створював його
    // && бажання можна скасувати за 3 дні до початку
    // && термін виконання ще не минув
    const showCancelBookWish =
        myUser?.id === wish.booking?.userId &&
        !dayjs().isAfter(dayjs(wish.booking?.start).add(3, 'days')) &&
        !dayjs(wish.booking?.end).isSameOrBefore(dayjs());

    // бажання належить користувачу
    // && бажання не виконане
    // && термін виконання ще не минув
    const showDoneWish =
        myUser?.id === wish.userId &&
        !wish.executed &&
        !isBookingExpired(wish, myUser?.id);

    // бажання належить користувачу і не заброньовано
    const showEditWish = myUser?.id === wish.userId && !wish.booking?.end;

    // бажання належить користувачу і термін виконання минув
    const showBookingExpired =
        myUser?.id === wish.userId && isBookingExpired(wish, myUser?.id);

    // МОЖЛИВІ КЕЙСИ
    // Моє бажання / не моє
    //// виконане / не виконане
    //// заброньоване / не заброньоване
    ////// перші 3 дні минули / не минули
    ////// термін виконання минув / не минув

    const handleEditWish = () => {
        editWish && editWish();
        close();
    };

    return (
        <>
            <div
                style={{ height: `${bodyHeight}px` }}
                className="-mr-1.5 grid w-full grid-cols-1 overflow-y-auto tablet-md:max-h-[88svh] desktop-xs:mr-0 desktop-xs:max-h-fit desktop-xs:grid-cols-8 desktop-xs:gap-6"
            >
                {wish.images.length > 0 && <WishSwiper wish={wish} />}

                <WishContent wish={wish} />
            </div>

            <div
                className="w-full px-4 pt-5 tablet-md:px-5 tablet-lg:px-8"
                ref={footRef}
            >
                {showDeliveryAddress && (
                    <p className="text-right text-zinc-600 dark:text-zinc-400">
                        {mainPageT('you_can_send')}
                        {selectedUser.deliveryAddress}
                    </p>
                )}

                <div className="flex w-full flex-col gap-3 tablet-lg:flex-row tablet-lg:items-center tablet-lg:justify-between tablet-lg:gap-5">
                    <div className="flex items-center justify-center gap-1">
                        <LikeAction wish={wish} type="likes" hide={hide} />

                        <LikeAction wish={wish} type="dislikes" hide={hide} />
                    </div>

                    <div className="flex flex-col gap-1 tablet-md:flex-row tablet-md:items-center tablet-md:gap-5">
                        {wish.booking?.end && (
                            <p className="flex flex-wrap items-center justify-end gap-1 text-zinc-700 dark:text-zinc-300">
                                {myUserBookedOrCreatedWish ? (
                                    <>
                                        <span>
                                            {myUser?.id === wish.booking?.userId
                                                ? mainPageT('you-must')
                                                : mainPageT('wish-must')}
                                        </span>
                                        <span className="font-bold">
                                            {dayjs(wish.booking?.end)
                                                .locale(activeLocale)
                                                .format(getFullDate())}
                                        </span>
                                    </>
                                ) : (
                                    <>{mainPageT('coming-true')}</>
                                )}
                            </p>
                        )}

                        {/* Book */}
                        {!wish.booking?.end && (
                            <BookWish wish={wish} hide={hide} />
                        )}

                        {/* Cancel Book */}
                        {showCancelBookWish && (
                            <CancelBookWish
                                wish={wish}
                                userId={myUser?.id}
                                hide={hide}
                            />
                        )}

                        {/* Done */}
                        {showDoneWish && (
                            <DoneWish
                                wish={wish}
                                userId={myUser?.id}
                                whoseWish={
                                    wish.booking?.userId
                                        ? EWhoseWish.SOMEONE
                                        : EWhoseWish.MY
                                }
                                hide={hide}
                            />
                        )}

                        {/* Booking Expired */}
                        {showBookingExpired && (
                            <BookingExpired
                                wish={wish}
                                userId={myUser?.id}
                                whoseWish={
                                    wish.booking?.userId
                                        ? EWhoseWish.SOMEONE
                                        : EWhoseWish.MY
                                }
                                hide={hide}
                            />
                        )}

                        {/* Edit Wish */}
                        {showEditWish && (
                            <UiButton onClick={handleEditWish}>
                                {mainPageT('edit-wish')}
                            </UiButton>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailWish;
