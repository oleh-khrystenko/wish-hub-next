import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import dayjs from 'dayjs';
import { EPrivacy } from '@/models/Settings';
import { EWhoseWish } from '@/stores/wishes/types';
import { useMyUserStore } from '@/stores/my-user';
import { useWishesStore } from '@/stores/wishes';
import UseFullName from '@/helpers/hooks/UseFullName';
import UseLocaleFormats from '@/helpers/hooks/UseLocaleFormats';
import { isBookingExpired } from '@/helpers/utils/date-validators';
import WishContent from '@/app/[locale]/user/[userId]/wish/WishContent';
import BookWish from '@/app/[locale]/user/[userId]/wish/BookWish';
import CancelBookWish from '@/app/[locale]/user/[userId]/wish/CancelBookWish';
import DoneWish from '@/app/[locale]/user/[userId]/wish/DoneWish';
import BookingExpired from '@/app/[locale]/user/[userId]/wish/BookingExpired';
import LikeAction from '@/components/layouts/LikeAction';
import WishMark from '@/components/layouts/WishMark';
import UiButton from '@/components/ui/UiButton';
import UiAvatar from '@/components/ui/UiAvatar';
import ArrowBackIcon from '@/components/icons/ArrowBackIcon';

const SavedWish: FC = () => {
    const router = useRouter();

    const activeLocale = useLocale();
    const wishPageT = useTranslations('wish-page');

    const myUser = useMyUserStore((state) => state.myUser);

    const wish = useWishesStore((state) => state.wish);
    const creator = useWishesStore((state) => state.creator);

    const { getFullName } = UseFullName();
    const { getFullDate } = UseLocaleFormats();

    let showDeliveryAddress =
        creator?.deliveryAddress && creator?.deliveryAddress.length > 0;
    if (showDeliveryAddress) {
        if (creator?.showDeliveryAddress === EPrivacy.NOBODY) {
            showDeliveryAddress = false;
        }

        if (
            creator?.showDeliveryAddress === EPrivacy.FRIENDS &&
            !myUser?.friends.includes(creator.id)
        ) {
            showDeliveryAddress = false;
        }

        if (wish?.executed) {
            showDeliveryAddress = false;
        }

        if (wish?.booking && wish?.booking?.userId !== myUser?.id) {
            showDeliveryAddress = false;
        }
    }

    // я забронював або створив бажання
    const myUserBookedOrCreatedWish =
        myUser?.id === wish?.booking?.userId || myUser?.id === wish?.userId;

    // у бажання немає кінцевої дати бронювання && бажання ще не виконане
    const showBookWish = myUser && wish && !wish.booking?.end && !wish.executed;

    // бажання належить тому хто створював його
    // && бажання можна скасувати за 3 дні до початку
    // && термін виконання ще не минув
    const showCancelBookWish =
        wish &&
        myUser?.id === wish.booking?.userId &&
        !dayjs().isAfter(dayjs(wish.booking?.start).add(3, 'days')) &&
        !dayjs(wish.booking?.end).isSameOrBefore(dayjs());

    // бажання належить користувачу
    // && бажання не виконане
    // && термін виконання ще не минув
    const showDoneWish =
        wish &&
        myUser?.id === wish.userId &&
        !wish.executed &&
        !isBookingExpired(wish, myUser?.id);

    // бажання належить користувачу і термін виконання минув
    const showBookingExpired =
        wish &&
        myUser?.id === wish.userId &&
        isBookingExpired(wish, myUser?.id);

    // бажання належить користувачу
    // && бажання не заброньовано
    // && бажання не виконане
    const showEditWish =
        wish &&
        myUser?.id === wish.userId &&
        !wish.booking?.end &&
        !wish.executed;

    return (
        <div className="mt-8 flex grow flex-col px-4 pb-5 desktop-sm:px-0">
            <div className="flex flex-col gap-6">
                <div className="relative -ml-4 flex items-center gap-4 tablet-md:ml-0">
                    <UiButton
                        classesWrap="p-2.5"
                        variant="clear-styles"
                        onBtnClick={() => router.back()}
                    >
                        <ArrowBackIcon />
                    </UiButton>

                    <h1 className="text-xl font-bold text-zinc-700 dark:text-zinc-300 tablet-md:text-2xl">
                        {wishPageT(
                            myUser?.id === wish?.userId
                                ? 'your_wish'
                                : 'created_by'
                        )}
                        :
                    </h1>

                    {wish && (
                        <WishMark
                            wish={wish}
                            myUserId={myUser?.id}
                            classes="absolute right-0 top-3/4 mobile-sm:top-1/2 mobile-lg:-translate-y-1/2 -rotate-12 tablet-md:right-1 desctop-sm:right-2 tablet-md:-rotate-6"
                        />
                    )}
                </div>

                {myUser?.id !== wish?.userId && (
                    <UiButton
                        href={myUser ? `/user/${creator?.id}/profile` : `/auth`}
                        variant="clear-styles"
                        classesWrap="flex items-center gap-3 tablet-sm:gap-4"
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
                    </UiButton>
                )}
            </div>

            {wish && <WishContent wish={wish} myUser={myUser} />}

            {/* FOOT */}
            <div className="mt-auto w-full pt-8">
                {showDeliveryAddress && (
                    <p className="text-right text-zinc-600 dark:text-zinc-400">
                        {wishPageT('you_can_send')}
                        <span className="font-bold">
                            {creator?.deliveryAddress}
                        </span>
                    </p>
                )}

                <div className="mt-5 flex flex-col items-end justify-between gap-5 mobile-sm:flex-row">
                    {wish && (
                        <div className="flex items-center justify-center gap-1">
                            <LikeAction wish={wish} type="likes" />

                            <LikeAction wish={wish} type="dislikes" />
                        </div>
                    )}

                    <div className="flex flex-col gap-1 tablet-md:flex-row tablet-md:items-center tablet-md:gap-5">
                        {wish?.booking?.end && (
                            <p
                                className={`${isBookingExpired(wish, myUser?.id) ? 'text-rose-500' : 'text-zinc-500 dark:text-zinc-400'} flex flex-wrap items-center justify-end gap-1`}
                            >
                                {myUserBookedOrCreatedWish ? (
                                    <>
                                        <span>
                                            {myUser?.id === wish.booking?.userId
                                                ? wishPageT('you_must')
                                                : wishPageT('wish_must')}
                                        </span>
                                        <span className="font-bold">
                                            {dayjs(wish.booking?.end)
                                                .locale(activeLocale)
                                                .format(getFullDate())}
                                        </span>
                                    </>
                                ) : (
                                    <>{wishPageT('coming_true')}</>
                                )}
                            </p>
                        )}

                        {/* Book */}
                        {showBookWish && <BookWish wish={wish} />}

                        {/* Cancel Book */}
                        {showCancelBookWish && (
                            <CancelBookWish wish={wish} userId={myUser?.id} />
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
                                    href={`user/${myUser?.id}/wish/editor?wishId=${wish.id}`}
                                >
                                    {wishPageT('edit_wish')}
                                </UiButton>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SavedWish;
