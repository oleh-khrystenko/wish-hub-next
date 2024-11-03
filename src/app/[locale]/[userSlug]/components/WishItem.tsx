'use client';

import { FC, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { ECurrency, IWish } from '@/models/Wish';
import { useMyUserStore } from '@/stores/my-user';
import { useSettingsStore } from '@/stores/settings';
import { unencryptedData } from '@/helpers/utils/encryption-data';
import { addingWhiteSpaces } from '@/helpers/utils/formating-number';
import { isBookingExpired } from '@/helpers/utils/date-validators';
import WishMark from '@/components/layouts/WishMark';
import LikeAction from '@/components/layouts/LikeAction';
import UiImage from '@/components/ui/UiImage';
import UiButton from '@/components/ui/UiButton';
import LogoIcon from '@/components/icons/LogoIcon';

interface IProps {
    wish: IWish;
    idx: number;
    userSlug: string;
}

const WishItem: FC<IProps> = ({ wish, idx, userSlug }) => {
    const mainPageT = useTranslations('main-page');

    const myUser = useMyUserStore((state) => state.myUser);

    const setShowGlobalLoading = useSettingsStore(
        (state) => state.setShowGlobalLoading
    );

    const name = useMemo(
        () => unencryptedData(wish.name, wish.show),
        [wish.name, wish.show]
    );

    const price = useMemo(() => {
        if (!wish.price) return '';
        return unencryptedData(wish.price, wish.show);
    }, [wish.price, wish.show]);

    const currency = useMemo(
        () => unencryptedData(wish.currency, wish.show),
        [wish.currency, wish.show]
    );

    return (
        <li
            className={`${isBookingExpired(wish, myUser?.id) ? 'border-rose-400' : 'border-zinc-300 dark:border-zinc-700'} relative flex w-full cursor-pointer rounded-md border-2 border-dashed`}
        >
            <UiButton
                href={`/${userSlug}/collection/${wish.slug}`}
                variant="clear-styles"
                classesWrap={`${wish.executed ? '-rotate-3 border-cyan-500 bg-wish-bg dark:border-cyan-300' : 'border-transparent'} flex h-full w-full flex-col items-center rounded-md border-2 border-dashed bg-cover bg-center bg-no-repeat px-4 pb-3 pt-4`}
                onLinkClick={() => setShowGlobalLoading(true)}
            >
                <div className="relative w-full pt-[100%]">
                    {wish.images?.length > 0 ? (
                        <UiImage
                            src={unencryptedData(
                                wish.images[0].path,
                                wish.show
                            )}
                            alt={`${mainPageT('picture')}-${wish.images[0].position}`}
                            priority={true}
                        />
                    ) : (
                        <LogoIcon
                            classes="absolute inset-0 h-full w-full grayscale opacity-50 dark:opacity-20"
                            id={idx.toString()}
                        />
                    )}

                    <WishMark wish={wish} myUserId={myUser?.id} />
                </div>

                <div className="mt-1 flex w-full flex-col items-center justify-evenly">
                    <div
                        className="w-full truncate text-center text-base font-bold text-zinc-800 dark:text-zinc-300 tablet-md:text-lg"
                        title={name}
                    >
                        {name}
                    </div>

                    {wish.price && (
                        <div className="text-center text-sm text-zinc-700 dark:text-zinc-400 tablet-md:text-base">
                            {addingWhiteSpaces(price)}{' '}
                            {currency || ECurrency.UAH}
                        </div>
                    )}
                </div>

                <div className="mt-auto flex items-center gap-2 tablet-md:gap-3">
                    <LikeAction wish={wish} type="likes" />

                    <LikeAction wish={wish} type="dislikes" />
                </div>
            </UiButton>
        </li>
    );
};

export default WishItem;
