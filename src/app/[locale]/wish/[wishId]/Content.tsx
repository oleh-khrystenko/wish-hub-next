import { FC } from 'react';
import { unencryptedData } from '@/helpers/utils/encryption-data';
import ShareButton from '@/components/layouts/ShareButton';
import WishSwiper from '@/app/[locale]/wish/[wishId]/WishSwiper';
import { addingWhiteSpaces } from '@/helpers/utils/formating-number';
import { ECurrency, IWish } from '@/models/Wish';
import { IUser } from '@/models/User';
import { EPrivacy } from '@/models/Settings';
import { useTranslations } from 'next-intl';

interface IProps {
    wish: IWish;
    myUser: IUser | null;
}

const Content: FC<IProps> = ({ wish, myUser }) => {
    const mainPageT = useTranslations('main-page');
    const wishPageT = useTranslations('wish-page');

    let show = (
        <>
            {mainPageT('show-all-1')}{' '}
            <span className="text-zinc-700 dark:text-zinc-300">
                {mainPageT('show-all-2')}
            </span>{' '}
            {mainPageT('show-all-3')}
        </>
    );
    wish?.show === EPrivacy.FRIENDS &&
        (show = (
            <>
                {mainPageT('show-friends-1')}{' '}
                <span className="text-zinc-700 dark:text-zinc-300">
                    {mainPageT('show-friends-2')}
                </span>{' '}
                {mainPageT('show-friends-3')}
            </>
        ));
    wish?.show === EPrivacy.NOBODY &&
        (show = (
            <>
                {mainPageT('show-nobody-1')}{' '}
                <span className="text-zinc-700 dark:text-zinc-300">
                    {mainPageT('show-nobody-2')}
                </span>{' '}
                {mainPageT('show-nobody-3')}
            </>
        ));

    const isURL = (str: string) => {
        try {
            new URL(str);
            return true;
        } catch {
            return false;
        }
    };

    return (
        <>
            <div className="flex items-center justify-between gap-5">
                <p className="mt-6 text-2xl font-bold text-zinc-700 dark:text-zinc-300 tablet-md:text-4xl">
                    {unencryptedData(wish.name, wish.show)}
                </p>

                {myUser?.id === wish.userId && (
                    <ShareButton
                        link={`wish/${wish.id}`}
                        wishShow={wish.show}
                    />
                )}
            </div>

            <div
                className={`${wish.images.length > 1 ? 'desktop-xs:min-h-[482px]' : ''} mt-6 grid w-full grid-cols-1 desktop-xs:grid-cols-8`}
            >
                {wish.images.length > 0 && <WishSwiper wish={wish} />}

                <div
                    className={`${wish.images.length > 1 ? 'mt-[100px] tablet-md:mt-[120px] desktop-xs:mt-0' : ''} ${wish.images.length === 0 ? 'mt-8 tablet-md:mt-0 desktop-xs:col-span-8' : 'desktop-xs:col-span-5'} flex w-full flex-col gap-4 px-4 tablet-md:px-5 tablet-lg:px-8 desktop-xs:gap-6`}
                >
                    {(myUser?.id === wish.userId || wish.price) && (
                        <div className="flex flex-col gap-4">
                            {myUser?.id === wish.userId && (
                                <p className="text-zinc-600 dark:text-zinc-400">
                                    {show}
                                </p>
                            )}

                            {wish.price && (
                                <div className="flex items-center gap-2 whitespace-nowrap">
                                    <span className="text-zinc-600 dark:text-zinc-400">
                                        {wishPageT('price')}
                                    </span>
                                    <span className="text-base text-zinc-700 dark:text-zinc-300 tablet-md:text-xl">
                                        {addingWhiteSpaces(
                                            unencryptedData(
                                                wish.price,
                                                wish.show
                                            )
                                        )}{' '}
                                        {unencryptedData(
                                            wish.currency,
                                            wish.show
                                        ) || ECurrency.UAH}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}

                    {wish.addresses && wish.addresses.length > 0 && (
                        <p className="flex w-full flex-col">
                            <span className="text-sm leading-6 text-zinc-600 dark:text-zinc-400 tablet-md:text-base tablet-md:leading-7">
                                {wishPageT('address')}
                            </span>
                            {wish.addresses.map((address, idx) => {
                                const unencryptedAddress = unencryptedData(
                                    address.value,
                                    wish.show
                                );

                                if (isURL(unencryptedAddress)) {
                                    return (
                                        <a
                                            className="truncate py-1.5 text-base text-cyan-500 dark:text-cyan-300 tablet-md:text-xl"
                                            href={unencryptedAddress}
                                            key={address.id}
                                            title={unencryptedAddress}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {unencryptedAddress}
                                        </a>
                                    );
                                }

                                return (
                                    <span
                                        key={address.id}
                                        className="truncate py-1.5 text-base text-zinc-700 dark:text-zinc-300 tablet-md:text-xl"
                                    >
                                        {unencryptedAddress}
                                    </span>
                                );
                            })}
                        </p>
                    )}

                    {wish.description && (
                        <p className="w-full">
                            <span className="float-left mr-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400 tablet-md:text-base tablet-md:leading-7">
                                {wishPageT('description')}
                            </span>
                            <span className="whitespace-pre-wrap text-base text-zinc-700 dark:text-zinc-300 tablet-md:text-lg">
                                {unencryptedData(wish.description, wish.show)}
                            </span>
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Content;
