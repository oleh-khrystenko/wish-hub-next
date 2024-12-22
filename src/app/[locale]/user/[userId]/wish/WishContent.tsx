import { FC, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useInView } from 'react-intersection-observer';
import { ECurrency, IWish } from '@/models/wish';
import { IUser } from '@/models/user';
import { EPrivacy } from '@/models/settings';
import { useCollectionsStore } from '@/stores/collection';
import { unencryptedData } from '@/helpers/utils/encryption-data';
import { addingWhiteSpaces } from '@/helpers/utils/formating-number';
import UseScreenSize from '@/helpers/hooks/UseScreenSize';
import { WISH_COLLECTION_PAGINATION_LIMIT } from '@/helpers/utils/constants';
import WishSwiper from '@/app/[locale]/user/[userId]/wish/WishSwiper';
import ShareButton from '@/components/layouts/ShareButton';
import UiButton from '@/components/ui/UiButton';
import UiPopup from '@/components/ui/UiPopup';
import UiLoading from '@/components/ui/UiLoading';
import EditIcon from '@/components/icons/EditIcon';

interface IProps {
    wish: IWish;
    myUser: IUser | null;
}

const WishContent: FC<IProps> = ({ wish, myUser }) => {
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [firstLoad, setFirstLoad] = useState<boolean>(true);
    const [isLoadingAdd, setIsLoadingAdd] = useState<boolean>(false);

    const wishPageT = useTranslations('wish-page');
    const allPagesT = useTranslations('all-pages');

    const { ref, inView } = useInView({
        threshold: 0,
    });

    const wishCollections = useCollectionsStore(
        (state) => state.wishCollections
    );
    const pageWishCollections = useCollectionsStore(
        (state) => state.pageWishCollections
    );
    const stopRequestsWishCollections = useCollectionsStore(
        (state) => state.stopRequestsWishCollections
    );
    const getWishCollections = useCollectionsStore(
        (state) => state.getWishCollections
    );
    const addWishCollections = useCollectionsStore(
        (state) => state.addWishCollections
    );

    const { screenWidth } = UseScreenSize();

    let show = (
        <>
            {wishPageT('show_all_1')}{' '}
            <span className="text-zinc-700 dark:text-zinc-300">
                {wishPageT('show_all_2')}
            </span>{' '}
            {wishPageT('show_all_3')}
        </>
    );
    wish?.show === EPrivacy.FRIENDS &&
        (show = (
            <>
                {wishPageT('show_friends_1')}{' '}
                <span className="text-zinc-700 dark:text-zinc-300">
                    {wishPageT('show_friends_2')}
                </span>{' '}
                {wishPageT('show_friends_3')}
            </>
        ));
    wish?.show === EPrivacy.NOBODY &&
        (show = (
            <>
                {wishPageT('show_nobody_1')}{' '}
                <span className="text-zinc-700 dark:text-zinc-300">
                    {wishPageT('show_nobody_2')}
                </span>{' '}
                {wishPageT('show_nobody_3')}
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

    const handleShowPopup = () => {
        setShowPopup(true);
    };

    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false);
            return;
        }

        const fetchWishCollections = async () => {
            if (!inView || stopRequestsWishCollections) return;

            setIsLoadingAdd(true);

            await addWishCollections(
                {
                    wishId: wish.id,
                    page: pageWishCollections,
                    limit: WISH_COLLECTION_PAGINATION_LIMIT,
                },
                allPagesT('collections.get-collections.error')
            );

            setIsLoadingAdd(false);
        };

        fetchWishCollections().finally();
    }, [inView]);

    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false);
            return;
        }

        const fetchWishCollections = async () => {
            await getWishCollections(
                {
                    wishId: wish.id,
                    page: 1,
                    limit: WISH_COLLECTION_PAGINATION_LIMIT,
                },
                allPagesT('collections.get-collections.error')
            );
        };

        fetchWishCollections().finally();
    }, [firstLoad]);

    return (
        <>
            <h1 className="mt-6 text-2xl font-bold text-zinc-700 dark:text-zinc-300 tablet-md:text-4xl">
                {unencryptedData(wish.name, wish.show)}
            </h1>

            <div className="mt-3 flex flex-col items-end gap-1 tablet-md:flex-row tablet-md:items-center tablet-md:justify-between tablet-md:gap-3">
                {wishCollections.length > 0 && (
                    <div className="relative">
                        <UiButton
                            variant="text-btn"
                            classesWrap="-mr-4 tablet-md:mr-0 tablet-md:-ml-4"
                            onBtnClick={handleShowPopup}
                        >
                            {wishPageT('this_wish_collections')}
                        </UiButton>

                        <UiPopup
                            classes="pt-10"
                            show={showPopup}
                            showPopupRight={screenWidth >= 768}
                            hide={() => setShowPopup(false)}
                        >
                            <div className="py-2 pr-1">
                                <ul className="flex max-h-60 flex-col overflow-y-auto px-2">
                                    {wishCollections.map((collection) => (
                                        <li
                                            key={collection.id}
                                            className="flex items-center justify-between"
                                        >
                                            <UiButton
                                                variant="clear-styles"
                                                classesWrap="flex w-full items-center gap-2 whitespace-nowrap rounded-md px-2 py-2.5 text-left text-sm font-bold text-zinc-500 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800"
                                            >
                                                {collection.name}
                                            </UiButton>

                                            {wish.userId === myUser?.id && (
                                                <UiButton
                                                    href={`user/${myUser?.id}/collection/editor?collectionId=${collection.id}`}
                                                    variant="text-only"
                                                >
                                                    <span className="rounded-md p-2.5 transition-all duration-300 ease-in-out hover:bg-zinc-200 hover:dark:bg-zinc-600 mobile-xs:p-3">
                                                        <EditIcon classes="w-4 h-4 fill-zinc-800 dark:fill-zinc-300" />
                                                    </span>
                                                </UiButton>
                                            )}
                                        </li>
                                    ))}

                                    <li
                                        className="h-px w-full"
                                        style={{
                                            display: stopRequestsWishCollections
                                                ? 'none'
                                                : 'block',
                                        }}
                                        ref={ref}
                                    ></li>

                                    {isLoadingAdd && (
                                        <li className="relative h-10 w-full">
                                            <UiLoading
                                                isLocal
                                                size="h-10 min-h-10 w-10 min-w-10"
                                                bg="bg-transparent"
                                            />
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </UiPopup>
                    </div>
                )}
                {myUser?.id === wish.userId && (
                    <ShareButton
                        link={`/user/${wish.userId}/wish?anyWishId=${wish.id}${myUser ? `&utm_source=user&utm_medium=share&utm_campaign=user_${myUser.id}` : ''}`}
                        wishShow={wish.show}
                        actionClasses="flex items-center flex-row-reverse gap-1.5"
                    >
                        <span className="whitespace-nowrap py-2.5 text-sm text-zinc-700 dark:text-zinc-400">
                            {wishPageT('share')}
                        </span>
                    </ShareButton>
                )}
            </div>

            <div
                className={`${wish.images.length > 1 ? 'desktop-xs:min-h-[482px]' : ''} mt-6 grid w-full grid-cols-1 desktop-xs:grid-cols-8`}
            >
                {wish.images.length > 0 && <WishSwiper wish={wish} />}

                <div
                    className={`${wish.images.length > 1 ? 'mt-[100px] tablet-md:mt-[120px] desktop-xs:mt-0' : ''} ${wish.images.length === 0 ? 'mt-8 tablet-md:mt-0 desktop-xs:col-span-8' : 'desktop-xs:col-span-5'} flex w-full flex-col gap-4 desktop-xs:gap-6`}
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
                                            rel="noopener noreferrer external nofollow"
                                        >
                                            {unencryptedAddress}
                                        </a>
                                    );
                                }

                                return (
                                    <span
                                        key={address.id}
                                        className="truncate py-1.5 text-base text-zinc-700 dark:text-zinc-300 tablet-md:text-xl"
                                        title={unencryptedAddress}
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

export default WishContent;
