'use client';

import { FC, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import dayjs from 'dayjs';
import { EPrivacy } from '@/models/Settings';
import { useMyUserStore } from '@/stores/my-user';
import { EWhoseWish } from '@/stores/wishes/types';
import { useWishesStore } from '@/stores/wishes';
import UseFullName from '@/helpers/hooks/UseFullName';
import UseLocaleFormats from '@/helpers/hooks/UseLocaleFormats';
import { isBookingExpired } from '@/helpers/utils/date-validators';
import Content from '@/app/[locale]/wish/[wishId]/Content';
import BookWish from '@/app/[locale]/wish/[wishId]/BookWish';
import CancelBookWish from '@/app/[locale]/wish/[wishId]/CancelBookWish';
import DoneWish from '@/app/[locale]/wish/[wishId]/DoneWish';
import BookingExpired from '@/app/[locale]/wish/[wishId]/BookingExpired';
import EditWish from '@/app/[locale]/main/wish-editor/EditWish';
import Breadcrumbs from '@/components/layouts/Breadcrumbs';
import LikeAction from '@/components/layouts/LikeAction';
import UiAvatar from '@/components/ui/UiAvatar';
import UiButton from '@/components/ui/UiButton';
import LogoIcon from '@/components/icons/LogoIcon';
import ArrowBackIcon from '@/components/icons/ArrowBackIcon';

const Body: FC = () => {
    const [showEditWishModal, setShowEditWishModal] = useState<boolean>(false);

    const gotWish = useRef(false);

    const router = useRouter();
    const { wishId } = useParams<{ wishId: string }>();

    const activeLocale = useLocale();
    const mainPageT = useTranslations('main-page');
    const wishPageT = useTranslations('wish-page');
    const alertsT = useTranslations('alerts');

    const myUser = useMyUserStore((state) => state.myUser);

    const wish = useWishesStore((state) => state.wish);
    const creator = useWishesStore((state) => state.creator);
    const getWish = useWishesStore((state) => state.getWish);

    const { getFullName } = UseFullName();
    const { getFullDate } = UseLocaleFormats();

    const breadcrumbsPages = [
        {
            href: 'wish',
            icon: <LogoIcon classes="w-4 h-4" />,
            name: mainPageT('wish'),
        },
    ];

    let showDeliveryAddress =
        creator?.deliveryAddress && creator?.deliveryAddress.length > 0;
    if (showDeliveryAddress) {
        creator?.showDeliveryAddress === EPrivacy.NOBODY &&
            (showDeliveryAddress = false);
        creator?.showDeliveryAddress === EPrivacy.FRIENDS &&
            !myUser?.friends.includes(creator.id) &&
            (showDeliveryAddress = false);
    }

    // я забронював або створив бажання
    const myUserBookedOrCreatedWish =
        myUser?.id === wish?.booking?.userId || myUser?.id === wish?.userId;

    // у бажання немає кінцевої дати бронювання && бажання ще не виконане
    const showBookWish = myUser && !wish?.booking?.end && !wish?.executed;

    // бажання належить тому хто створював його
    // && бажання можна скасувати за 3 дні до початку
    // && термін виконання ще не минув
    const showCancelBookWish =
        myUser?.id === wish?.booking?.userId &&
        !dayjs().isAfter(dayjs(wish?.booking?.start).add(3, 'days')) &&
        !dayjs(wish?.booking?.end).isSameOrBefore(dayjs());

    // бажання належить користувачу
    // && бажання не виконане
    // && термін виконання ще не минув
    const showDoneWish =
        myUser?.id === wish?.userId &&
        !wish?.executed &&
        !isBookingExpired(wish, myUser?.id);

    // бажання належить користувачу і термін виконання минув
    const showBookingExpired =
        myUser?.id === wish?.userId && isBookingExpired(wish, myUser?.id);

    // бажання можна редагувати
    // && бажання належить користувачу
    // && бажання не заброньовано
    const showEditWish = myUser?.id === wish?.userId && !wish?.booking?.end;

    const handleShowEditWish = () => {
        setShowEditWishModal(true);
    };
    const handleHideEditWish = () => {
        setShowEditWishModal(false);
    };

    useEffect(() => {
        if (gotWish.current) return;
        gotWish.current = true;

        getWish(
            { wishId, userId: myUser?.id },
            alertsT('wishes-api.get-wish.error')
        ).finally();
    }, []);

    return (
        <main className="flex grow flex-col overflow-y-auto pt-3">
            <Breadcrumbs pages={breadcrumbsPages} />

            {wish ? (
                <div className="mt-8 flex grow flex-col px-4 pb-5 desktop-sm:px-0">
                    {myUser?.id === wish.userId ? (
                        <div className="flex items-center gap-4">
                            <button
                                className="p-2.5"
                                type="button"
                                onClick={() => router.back()}
                            >
                                <ArrowBackIcon />
                            </button>

                            <h1 className="text-xl font-bold text-zinc-700 dark:text-zinc-300 tablet-md:text-2xl">
                                {wishPageT('your_wish')}:
                            </h1>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-4">
                                <button
                                    className="p-2.5"
                                    type="button"
                                    onClick={() => router.back()}
                                >
                                    <ArrowBackIcon />
                                </button>

                                <h1 className="text-xl font-bold text-zinc-700 dark:text-zinc-300 tablet-md:text-2xl">
                                    {wishPageT('created_by')}:
                                </h1>
                            </div>

                            <Link
                                href={`/${activeLocale}/profile/${creator?.id}`}
                                className="flex items-center gap-3 tablet-sm:gap-4"
                            >
                                <UiAvatar
                                    avatar={creator?.avatar}
                                    alt={getFullName(creator)}
                                    priority
                                    size={64}
                                    sizeTailwind="w-16 min-w-16 h-16 min-h-16"
                                    sizeIcon="w-12 h-12"
                                />

                                <p
                                    className="truncate text-2xl font-bold text-zinc-700 dark:text-zinc-300"
                                    title={getFullName(creator)}
                                >
                                    {getFullName(creator)}
                                </p>
                            </Link>
                        </div>
                    )}

                    <Content wish={wish} myUser={myUser} />

                    {/* FOOT */}
                    <div className="mt-auto w-full pt-8">
                        {showDeliveryAddress && (
                            <p className="text-right text-zinc-600 dark:text-zinc-400">
                                {mainPageT('you_can_send')}
                                <span className="font-bold">
                                    {creator?.deliveryAddress}
                                </span>
                            </p>
                        )}

                        <div className="mt-5 flex flex-col items-end justify-between gap-5 mobile-sm:flex-row">
                            <div className="flex items-center justify-center gap-1">
                                <LikeAction wish={wish} type="likes" />

                                <LikeAction wish={wish} type="dislikes" />
                            </div>

                            <div className="flex flex-col gap-1 tablet-md:flex-row tablet-md:items-center tablet-md:gap-5">
                                {wish.booking?.end && (
                                    <p
                                        className={`${isBookingExpired(wish, myUser?.id) ? 'text-rose-500' : 'text-zinc-500 dark:text-zinc-400'} flex flex-wrap items-center justify-end gap-1`}
                                    >
                                        {myUserBookedOrCreatedWish ? (
                                            <>
                                                <span>
                                                    {myUser?.id ===
                                                    wish.booking?.userId
                                                        ? mainPageT('you-must')
                                                        : mainPageT(
                                                              'wish-must'
                                                          )}
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
                                {showBookWish && <BookWish wish={wish} />}

                                {/* Cancel Book */}
                                {showCancelBookWish && (
                                    <CancelBookWish
                                        wish={wish}
                                        userId={myUser?.id}
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
                                    />
                                )}

                                {/* Edit Wish */}
                                {showEditWish && (
                                    <div className="ml-auto mt-3 w-fit tablet-md:mt-0">
                                        <UiButton
                                            onBtnClick={handleShowEditWish}
                                        >
                                            {mainPageT('edit-wish')}
                                        </UiButton>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="flex w-full grow items-center justify-center p-4 text-center text-base text-zinc-700 dark:text-zinc-300 tablet-md:text-lg desktop-sm:text-xl">
                    {wishPageT('empty')}
                </p>
            )}

            <EditWish
                showModal={showEditWishModal}
                wish={wish}
                hide={handleHideEditWish}
            />
        </main>
    );
};

export default Body;
