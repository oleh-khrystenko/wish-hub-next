import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import dayjs from 'dayjs';
import { EPrivacy } from '@/models/Settings';
import { useMyUserStore } from '@/stores/my-user';
import { useWishesStore } from '@/stores/wishes';
import UseFullName from '@/helpers/hooks/UseFullName';
import UseLocaleFormats from '@/helpers/hooks/UseLocaleFormats';
import { isBookingExpired } from '@/helpers/utils/date-validators';
import WishContent from '@/app/[locale]/user/[userId]/wish/WishContent';
import LikeAction from '@/components/layouts/LikeAction';
import UiButton from '@/components/ui/UiButton';
import UiAvatar from '@/components/ui/UiAvatar';
import ArrowBackIcon from '@/components/icons/ArrowBackIcon';

const Wish: FC = () => {
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

                    <p className="text-xl font-bold text-zinc-700 dark:text-zinc-300 tablet-md:text-2xl">
                        {wishPageT(
                            myUser?.id === wish?.userId
                                ? 'your_wish'
                                : 'created_by'
                        )}
                        :
                    </p>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wish;
