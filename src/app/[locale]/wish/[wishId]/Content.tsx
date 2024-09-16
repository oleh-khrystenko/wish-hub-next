'use client';

import { FC, useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { ECurrency, IWish } from '@/models/Wish';
import { IUser } from '@/models/User';
import { IZoomedImage } from '@/models/Settings';
import { useMyUserStore } from '@/stores/my-user';
import { IGetWish } from '@/stores/wishes/types';
import wishesApi from '@/stores/wishes/api';
import { unencryptedData } from '@/helpers/utils/encryption-data';
import { addingWhiteSpaces } from '@/helpers/utils/formating-number';
import UseScreenWidth from '@/helpers/hooks/UseScreenWidth';
import WishSwiper from '@/components/layouts/detail-wish/WishSwiper';
import BookWish from '@/components/layouts/detail-wish/BookWish';
import Breadcrumbs from '@/components/layouts/Breadcrumbs';
import ZoomedImageModal from '@/components/layouts/ZoomedImageModal';
import UiAvatar from '@/components/ui/UiAvatar';
import LogoIcon from '@/components/icons/LogoIcon';

const Content: FC = () => {
    const [wish, setWish] = useState<IWish | null>(null);
    const [userFullName, setUserFullName] = useState<string>('');
    const [userAvatar, setUserAvatar] = useState<IUser['avatar']>('');
    const [imageData, setImageData] = useState<IZoomedImage | null>(null);

    const gotWish = useRef(false);

    const { wishId } = useParams<{ wishId: string }>();

    const mainPageT = useTranslations('main-page');
    const wishPageT = useTranslations('wish-page');
    const alertsT = useTranslations('alerts');

    const myUser = useMyUserStore((state) => state.myUser);

    const pages = [
        {
            href: 'wish',
            icon: <LogoIcon classes="w-4 h-4" />,
            name: mainPageT('wish'),
        },
    ];

    // у бажання є кінцева дата бронювання && термін виконання ще не минув
    const showBookWish = !wish?.booking?.end && !wish?.executed;

    const isURL = (str: string) => {
        try {
            new URL(str);
            return true;
        } catch {
            return false;
        }
    };

    const handleShowImage = (src: string | undefined, alt: string) => {
        src ? setImageData({ src, alt }) : setImageData(null);
    };

    useEffect(() => {
        if (gotWish.current) return;
        gotWish.current = true;

        if (!myUser) return;

        wishesApi
            .getWish({ userId: myUser.id, wishId })
            .then(({ data }: AxiosResponse<IGetWish>) => {
                setWish(data.wish);
                setUserFullName(
                    data.userFirstName +
                        (data.userLastName ? ` ${data.userLastName}` : '')
                );
                setUserAvatar(data.userAvatar);
            })
            .catch((error: any) => {
                toast(
                    error.response?.data?.message ||
                        alertsT('wishes-api.get-wish.error'),
                    { type: 'error' }
                );
            });
    }, []);

    return (
        <main className="flex grow flex-col pt-3">
            <Breadcrumbs pages={pages} />

            {wish ? (
                <div className="mt-3 px-4 pb-5 desktop-sm:px-0">
                    {myUser?.id === wish.userId ? (
                        <h1 className="text-xl font-bold text-zinc-700 dark:text-zinc-300 mobile-xs:text-2xl">
                            {wishPageT('your_wish')}:
                        </h1>
                    ) : (
                        <div className="flex flex-col gap-6">
                            <h1 className="text-xl font-bold text-zinc-700 dark:text-zinc-300 mobile-xl:text-2xl">
                                {wishPageT('created_by')}:
                            </h1>

                            <div className="flex items-center gap-3 tablet-sm:gap-4">
                                <UiAvatar
                                    avatar={userAvatar}
                                    alt={userFullName}
                                    priority
                                    size={64}
                                    sizeTailwind="w-16 min-w-16 h-16 min-h-16"
                                    sizeIcon="w-12 h-12"
                                    handleClick={() =>
                                        handleShowImage(
                                            userAvatar,
                                            userFullName
                                        )
                                    }
                                />

                                <p
                                    className="truncate text-2xl font-bold text-zinc-700 dark:text-zinc-300"
                                    title={userFullName}
                                >
                                    {userFullName}
                                </p>
                            </div>
                        </div>
                    )}

                    <p className="mt-6 text-4xl font-bold text-zinc-700 dark:text-zinc-300">
                        {unencryptedData(wish.name, wish.show)}
                    </p>

                    <div
                        className={`${wish.images.length > 1 ? 'desktop-xs:min-h-[482px]' : ''} mt-6 grid w-full grid-cols-1 desktop-xs:grid-cols-8`}
                    >
                        {wish.images.length > 0 && <WishSwiper wish={wish} />}

                        <div
                            className={`${wish.images.length > 1 ? 'mt-[100px] tablet-md:mt-[120px] desktop-xs:mt-0' : ''} ${wish.images.length === 0 ? 'mt-8 tablet-md:mt-0 desktop-xs:col-span-8' : 'desktop-xs:col-span-5'} flex w-full flex-col gap-4 px-4 tablet-md:px-5 tablet-lg:px-8 desktop-xs:gap-6`}
                        >
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

                            {wish.addresses && wish.addresses.length > 0 && (
                                <p className="flex w-full flex-col">
                                    <span className="text-sm leading-6 text-zinc-600 dark:text-zinc-400 tablet-md:text-base tablet-md:leading-7">
                                        {wishPageT('address')}
                                    </span>
                                    {wish.addresses.map((address, idx) => {
                                        const unencryptedAddress =
                                            unencryptedData(
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
                                        {unencryptedData(
                                            wish.description,
                                            wish.show
                                        )}
                                    </span>
                                </p>
                            )}
                        </div>
                    </div>

                    {showBookWish && (
                        <div className="ml-auto mt-6 w-fit">
                            <BookWish wish={wish} />
                        </div>
                    )}

                    {!!imageData && (
                        <ZoomedImageModal
                            src={imageData.src}
                            alt={imageData.alt}
                            hide={() => setImageData(null)}
                        />
                    )}
                </div>
            ) : (
                <p className="flex w-full grow items-center justify-center p-4 text-center text-base text-zinc-700 dark:text-zinc-300 tablet-md:text-lg desktop-sm:text-xl">
                    {wishPageT('empty')}
                </p>
            )}
        </main>
    );
};

export default Content;
