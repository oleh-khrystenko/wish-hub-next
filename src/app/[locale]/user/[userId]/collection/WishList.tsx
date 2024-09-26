import { FC, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useInView } from 'react-intersection-observer';
import { IWish } from '@/models/Wish';
import { useMyUserStore } from '@/stores/my-user';
import { useUsersStore } from '@/stores/users';
import { useWishesStore } from '@/stores/wishes';
import UseInitialWishes from '@/helpers/hooks/UseInitialWishes';
import { WISHES_PAGINATION_LIMIT } from '@/helpers/utils/constants';
import CreateWish from '@/app/[locale]/main/wish-editor/CreateWish';
import EditWish from '@/app/[locale]/main/wish-editor/EditWish';
import WishListFilter from '@/components/layouts/wish-list/WishListFilter';
import WishListActions from '@/components/layouts/wish-list/WishListActions';
import WishItem from '@/components/layouts/wish-list/WishItem';
import UiLoading from '@/components/ui/UiLoading';
import CrossIcon from '@/components/icons/CrossIcon';
import LogoIcon from '@/components/icons/LogoIcon';

interface IProps {
    userId: string;
}

const WishList: FC<IProps> = ({ userId }) => {
    const [firstLoad, setFirstLoad] = useState<boolean>(true);
    const [showCreateWish, setShowCreateWish] = useState<boolean>(false);
    const [showEditWish, setShowEditWish] = useState<boolean>(false);
    const [idOfSelectedWish, setIdOfSelectedWish] = useState<
        IWish['id'] | null
    >(null);
    const [isLoadingAdd, setIsLoadingAdd] = useState<boolean>(false);

    const wishListRef = useRef<HTMLDivElement>(null);

    const profilePageT = useTranslations('profile-page');
    const mainPageT = useTranslations('main-page');
    const allPagesT = useTranslations('all-pages');

    const { ref, inView } = useInView({
        threshold: 0,
    });

    const myUser = useMyUserStore((state) => state.myUser);

    const selectedUserId = useUsersStore((state) => state.selectedUserId);

    const wishes = useWishesStore((state) => state.list);
    const wishesCreator = useWishesStore((state) => state.creator);
    const status = useWishesStore((state) => state.status);
    const page = useWishesStore((state) => state.page);
    const search = useWishesStore((state) => state.search);
    const sort = useWishesStore((state) => state.sort);
    const stopRequests = useWishesStore((state) => state.stopRequests);
    const addWishList = useWishesStore((state) => state.addWishList);
    const resetWishCandidate = useWishesStore(
        (state) => state.resetWishCandidate
    );

    const { getInitialWishList } = UseInitialWishes();

    const wishesExample = [
        {
            name: mainPageT('wish-example.first'),
        },
        {
            name: mainPageT('wish-example.second'),
        },
        {
            name: mainPageT('wish-example.third'),
        },
        {
            name: mainPageT('wish-example.fourth'),
        },
    ];

    const handleShowCreateWish = () => {
        setShowCreateWish(true);
    };
    const handleHideCreateWish = () => {
        setShowCreateWish(false);
        resetWishCandidate();
    };

    const handleShowEditWish = (id: IWish['id'] | null) => {
        setIdOfSelectedWish(id);
        setShowEditWish(true);
    };
    const handleHideEditWish = () => {
        setIdOfSelectedWish(null);
        setShowEditWish(false);
    };

    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false);
            return;
        }

        if (!inView || stopRequests) return;

        const fetchWishList = async () => {
            setIsLoadingAdd(true);

            await addWishList(
                {
                    myId: myUser?.id,
                    userId,
                    status,
                    page,
                    limit: WISHES_PAGINATION_LIMIT,
                    search,
                    sort,
                },
                allPagesT('wishes-api.get-wish-list.error')
            );

            setIsLoadingAdd(false);
        };
        fetchWishList().finally();
    }, [inView]);

    useEffect(() => {
        getInitialWishList(myUser?.id, userId).finally();
    }, [userId]);

    return (
        <>
            {wishesCreator && wishesCreator.wishList.length > 4 && (
                <div className="mt-2 flex flex-col gap-3 mobile-xs:gap-6">
                    <WishListFilter wishListRefCurrent={wishListRef.current} />

                    <WishListActions wishListRefCurrent={wishListRef.current} />
                </div>
            )}

            {myUser?.id === selectedUserId || wishes.length > 0 ? (
                <div className="mt-4" ref={wishListRef}>
                    <ul className="grid grid-cols-2 gap-1.5 tablet-xl:grid-cols-3 tablet-xl:gap-4 desktop-sm:grid-cols-4">
                        {myUser?.id === selectedUserId && (
                            <li className="relative flex items-center justify-center rounded-md border-2 border-dashed border-zinc-300 dark:border-zinc-700">
                                <button
                                    className="group absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-4 rounded-md border-2 border-dashed border-transparent transition-all duration-300 ease-in-out hover:-rotate-3 hover:border-cyan-500 hover:dark:border-cyan-300"
                                    type="button"
                                    onClick={handleShowCreateWish}
                                >
                                    <CrossIcon classes="w-28 h-28 -rotate-45 group-hover:stroke-cyan-500 group-hover:dark:stroke-cyan-300 stroke-zinc-700 dark:stroke-zinc-400" />

                                    <span className="text-xl font-bold text-zinc-700 group-hover:text-cyan-500 dark:text-zinc-400 group-hover:dark:text-cyan-300">
                                        {mainPageT('create-wish')}
                                    </span>
                                </button>
                            </li>
                        )}

                        {wishes.length > 0 &&
                            wishes.map((wish, idx) => (
                                <WishItem
                                    key={wish.id + idx}
                                    wish={wish}
                                    idx={idx}
                                    currentPage="collection"
                                    editWish={() => handleShowEditWish(wish.id)}
                                />
                            ))}

                        {wishesExample.map((wish, idx) => {
                            if (wishes.length > idx) return null;

                            let opacity = 'opacity-0';
                            if (myUser?.id === selectedUserId) {
                                idx === 0 && (opacity = 'opacity-50');
                                idx === 1 && (opacity = 'opacity-40');
                                idx === 2 && (opacity = 'opacity-30');
                                idx === 3 && (opacity = 'opacity-20');
                            }

                            return (
                                <li
                                    key={idx}
                                    className={`${opacity} flex min-h-96 w-full flex-col items-center justify-center gap-6 rounded-md border-2 border-dashed border-zinc-300 p-8 dark:border-zinc-700`}
                                    onClick={() =>
                                        myUser?.id === selectedUserId &&
                                        handleShowCreateWish()
                                    }
                                >
                                    <div className="relative w-full pt-[100%]">
                                        <LogoIcon
                                            classes="absolute inset-0 h-full w-full"
                                            id={`wish-example-${idx}`}
                                        />
                                    </div>

                                    <div className="w-full text-center text-lg font-bold text-zinc-800 dark:text-zinc-300">
                                        {wish.name}
                                    </div>
                                </li>
                            );
                        })}

                        <li
                            className="h-px w-full"
                            style={{
                                display: stopRequests ? 'none' : 'block',
                            }}
                            ref={ref}
                        ></li>
                    </ul>

                    {isLoadingAdd && (
                        <div className="relative mt-5 h-20 w-full">
                            <UiLoading isLocal />
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex grow items-center justify-center">
                    <p className="text-center text-zinc-600 dark:text-zinc-300 tablet-md:text-lg">
                        {profilePageT('wishes-empty')}
                    </p>
                </div>
            )}

            <CreateWish
                showModal={showCreateWish}
                hide={handleHideCreateWish}
            />

            {showEditWish && (
                <EditWish
                    idOfSelectedWish={idOfSelectedWish}
                    hide={handleHideEditWish}
                />
            )}
        </>
    );
};

export default WishList;
