'use client';

import { FC } from 'react';
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
    const mainPageT = useTranslations('main-page');

    const myUser = useMyUserStore((state) => state.myUser);

    const activeLocale = useLocale();

    const { getFullDate } = UseLocaleFormats();

    const showDeliveryAddress =
        selectedUser?.deliveryAddress && myUser?.id === wish.booking?.userId;

    const showCancelBookWish =
        myUser?.id === wish.booking?.userId && // бажання належить тому хто створював його
        !dayjs().isAfter(dayjs(wish.booking?.start).add(3, 'days')) && // бажання можна скасувати за 3 дні до початку
        !dayjs(wish.booking?.end).isSameOrBefore(dayjs()); // термін виконання ще не минув

    const showDoneWish =
        myUser?.id === wish.userId && // бажання належить користувачу
        !wish.executed && // бажання не виконане
        !isBookingExpired(wish, myUser?.id); // термін виконання ще не минув

    const showEditWish = myUser?.id === wish.userId && !wish.booking?.end; // бажання належить користувачу і не заброньовано

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
            <div className="custom-max-height -mr-1.5 grid h-auto w-full grid-cols-1 overflow-y-auto pr-1.5 tablet-md:max-h-[88svh] desktop-xs:mr-0 desktop-xs:max-h-fit desktop-xs:grid-cols-8 desktop-xs:gap-6 desktop-xs:pr-0">
                <WishSwiper wish={wish} />

                <WishContent wish={wish} />
            </div>

            <div className="w-full pt-5">
                {showDeliveryAddress && (
                    <p className="text-center text-zinc-600 dark:text-zinc-400">
                        {mainPageT('you_can_send')}
                        {selectedUser.deliveryAddress}
                    </p>
                )}

                <div className="flex w-full flex-col gap-3 tablet-lg:flex-row tablet-lg:items-center tablet-lg:justify-between tablet-lg:gap-5">
                    <div className="flex items-center gap-1">
                        <LikeAction wish={wish} type="likes" hide={hide} />

                        <LikeAction wish={wish} type="dislikes" hide={hide} />
                    </div>

                    <div className="flex flex-col tablet-md:flex-row tablet-md:items-center tablet-md:gap-5">
                        {wish.booking?.end && (
                            <p className="detail-wish-actions-booked">
                                {myUser?.id === wish.booking?.userId ||
                                myUser?.id === wish.userId ? (
                                    <>
                                        {myUser?.id === wish.booking?.userId
                                            ? mainPageT('you-must')
                                            : mainPageT('wish-must')}
                                        <span>
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
                        {isBookingExpired(wish, myUser?.id) && (
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
