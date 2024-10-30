import { FC, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';
import { toast } from 'react-toastify';
import { EWishPrivacy, EWishStatus } from '@/models/Wish';
import { ICollection } from '@/models/Collection';
import { useMyUserStore } from '@/stores/my-user';
import { useWishesStore } from '@/stores/wishes';
import { useSettingsStore } from '@/stores/settings';
import { useCollectionsStore } from '@/stores/collection';
import collectionApi from '@/stores/collection/api';
import UseInitialWishes from '@/helpers/hooks/UseInitialWishes';
import UseValidations from '@/helpers/hooks/UseValidations';
import { WISHES_PAGINATION_LIMIT } from '@/helpers/utils/constants';
import WishItem from '@/app/[locale]/user/[userId]/collection/editor/WishItem';
import SlidePanel from '@/components/layouts/slide-panel/SlidePanel';
import WishesSearch from '@/components/layouts/WishesSearch';
import CreateWishAndCollection from '@/components/layouts/CreateWishAndCollection';
import ConfirmModal from '@/components/layouts/ConfirmModal';
import UiLoading from '@/components/ui/UiLoading';
import UiInput from '@/components/ui/UiInput';
import UiButton from '@/components/ui/UiButton';
import SliderIcon from '@/components/icons/SliderIcon';
import LogoIcon from '@/components/icons/LogoIcon';
import BasketIcon from '@/components/icons/BasketIcon';

type TInputs = {
    collectionName: ICollection['name'];
};

interface IProps {
    userId: string;
}

const WishList: FC<IProps> = ({ userId }) => {
    const [currentCollection, setCurrentCollection] = useState<
        ICollection | undefined
    >(undefined);
    const [showConfirmDeleteCollection, setShowConfirmDeleteCollection] =
        useState<boolean>(false);
    const [firstLoad, setFirstLoad] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadingAdd, setIsLoadingAdd] = useState<boolean>(false);

    const wishListRef = useRef<HTMLDivElement>(null);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const activeLocale = useLocale();

    const collectionPageT = useTranslations('collection-page');
    const mainPageT = useTranslations('main-page');
    const allPagesT = useTranslations('all-pages');

    const { ref, inView } = useInView({
        threshold: 0,
    });

    const myUser = useMyUserStore((state) => state.myUser);

    const wishes = useWishesStore((state) => state.list);
    const wishesStatus = useWishesStore((state) => state.status);
    const wishesPrivacy = useWishesStore((state) => state.privacy);
    const page = useWishesStore((state) => state.page);
    const wishesSearch = useWishesStore((state) => state.search);
    const sort = useWishesStore((state) => state.sort);
    const stopRequests = useWishesStore((state) => state.stopRequests);
    const selectedWishIdList = useWishesStore(
        (state) => state.selectedWishIdList
    );
    const addWishList = useWishesStore((state) => state.addWishList);

    const collections = useCollectionsStore((state) => state.list);
    const collectionsSearch = useCollectionsStore((state) => state.search);
    const createCollection = useCollectionsStore(
        (state) => state.createCollection
    );
    const updateCollection = useCollectionsStore(
        (state) => state.updateCollection
    );
    const deleteCollection = useCollectionsStore(
        (state) => state.deleteCollection
    );

    const setShowSlidePanel = useSettingsStore(
        (state) => state.setShowSlidePanel
    );

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<TInputs>();

    const { collectionNameValidation } = UseValidations();

    const { getInitialWishList } = UseInitialWishes();

    const collectionId = searchParams.get('collectionId');

    const showWishes =
        wishes.length > 5 ||
        wishesStatus !== EWishStatus.ALL ||
        wishesPrivacy !== EWishPrivacy.ALL ||
        wishesSearch.length > 0;

    const showCollections =
        collections.length > 0 || collectionsSearch.length > 0;

    const showFilters = showWishes || showCollections;

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

    const onSubmit: SubmitHandler<TInputs> = async (data) => {
        if (!myUser) return;

        setIsLoading(true);

        const collection = collectionId
            ? await updateCollection(
                  {
                      collectionId,
                      userId,
                      wishIdList: selectedWishIdList,
                      name: data.collectionName.trim(),
                  },
                  allPagesT('collections.update-collection.success', {
                      name: data.collectionName.trim(),
                  }),
                  allPagesT('collections.update-collection.error')
              )
            : await createCollection(
                  {
                      userId,
                      wishIdList: selectedWishIdList,
                      name: data.collectionName.trim(),
                  },
                  allPagesT('collections.create-collection.success', {
                      name: data.collectionName.trim(),
                  }),
                  allPagesT('collections.create-collection.error')
              );

        if (!collection) {
            toast(
                allPagesT(
                    `collections.${collectionId ? 'update' : 'create'}-collection.error`
                ),
                {
                    type: 'error',
                }
            );

            setIsLoading(false);
            return;
        }

        router.push(
            `/${activeLocale}/user/${myUser.id}/collection?collectionId=${collection.id}`
        );
    };

    const confirmDeleteCollection = async () => {
        if (!myUser?.id || !currentCollection) return;

        await deleteCollection(
            {
                userId: myUser.id,
                collectionId: currentCollection.id,
            },
            allPagesT('collections.delete-collection.error', {
                name: currentCollection.name,
            })
        );

        const collectionId = searchParams.get('collectionId');
        if (collectionId === currentCollection.id) {
            const updatedPath = pathname.split('?')[0];
            router.replace(updatedPath);
        }

        setShowConfirmDeleteCollection(false);
    };

    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false);
            return;
        }

        if (!inView || stopRequests || wishes.length === 0) return;

        const fetchWishList = async () => {
            setIsLoadingAdd(true);

            await addWishList(
                {
                    myId: myUser?.id,
                    userId,
                    status: wishesStatus,
                    privacy: wishesPrivacy,
                    page,
                    limit: WISHES_PAGINATION_LIMIT,
                    search: wishesSearch,
                    sort,
                },
                allPagesT('wishes-api.get-wish-list.error'),
                currentCollection?.wishIdList
            );

            setIsLoadingAdd(false);
        };
        fetchWishList().finally();
    }, [inView, wishes.length]);

    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false);
            return;
        }

        const initialFetchWishes = async () => {
            let response;
            if (collectionId) {
                response = await collectionApi.getCollection({
                    collectionId,
                });

                if (response.data) {
                    setValue('collectionName', response.data.name);
                    setCurrentCollection(response.data);
                } else {
                    setValue('collectionName', '');
                }
            }

            await getInitialWishList(
                myUser?.id,
                userId,
                collectionId
                    ? `collectionId:${collectionId}`
                    : 'sortByLikes:desc',
                response?.data.wishIdList
            );
        };
        initialFetchWishes().finally();
    }, [firstLoad, searchParams, userId, collectionId]);

    return (
        <>
            <div className="flex items-center justify-between gap-3">
                {showFilters && (
                    <UiButton
                        variant="text"
                        onBtnClick={() => setShowSlidePanel(true)}
                    >
                        <SliderIcon classes="w-6 h-6 stroke-cyan-400 dark:stroke-cyan-300" />

                        <span className="py-3 text-sm text-zinc-500 dark:text-zinc-400 tablet-md:text-base">
                            {allPagesT('filters')}
                        </span>
                    </UiButton>
                )}

                {collectionId && currentCollection && (
                    <>
                        <UiButton
                            variant="clear-styles"
                            classesWrap="rounded-md p-2.5 -mr-2.5 flex items-center text-sm text-rose-500 tablet-md:text-base font-bold transition-all duration-300 ease-in-out hover:bg-zinc-200 hover:dark:bg-zinc-600"
                            onBtnClick={() =>
                                setShowConfirmDeleteCollection(true)
                            }
                        >
                            {allPagesT('delete')}
                            <span className="ml-1.5">
                                {allPagesT('action_collection')}
                            </span>

                            <div className="ml-2">
                                <BasketIcon />
                            </div>
                        </UiButton>

                        <ConfirmModal
                            show={showConfirmDeleteCollection}
                            confirm={confirmDeleteCollection}
                            hide={() => setShowConfirmDeleteCollection(false)}
                            confirmModalT={allPagesT('delete')}
                            closeModalT={allPagesT('leave_with_changes.close')}
                        >
                            <span className="text-zinc-700 dark:text-zinc-300">
                                {allPagesT('sure_collection', {
                                    name: currentCollection?.name,
                                })}
                            </span>
                        </ConfirmModal>
                    </>
                )}
            </div>

            {showWishes && (
                <div className="mt-5">
                    <WishesSearch wishListRefCurrent={wishListRef.current} />
                </div>
            )}

            <form
                className="sticky top-[66px] z-20 my-6 flex items-start gap-8 rounded-md bg-zinc-300 px-2 pb-2 pt-6 dark:bg-zinc-800 tablet-md:top-[74px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <UiInput
                    {...register('collectionName', collectionNameValidation)}
                    id="collectionName"
                    name="collectionName"
                    type="text"
                    label={allPagesT('collection_name')}
                    error={errors?.collectionName?.message}
                />

                <UiButton type="submit">
                    {collectionPageT(collectionId ? 'update' : 'create')}
                </UiButton>
            </form>

            <div ref={wishListRef}>
                <ul className="grid grid-cols-2 gap-1.5 tablet-md:grid-cols-3 tablet-lg:grid-cols-4 tablet-xl:grid-cols-5 tablet-xl:gap-4 desktop-sm:grid-cols-6">
                    <CreateWishAndCollection currentPage="collection" />

                    {wishes.length > 0 &&
                        wishes.map((wish, idx) => (
                            <WishItem
                                key={wish.id + idx}
                                wish={wish}
                                idx={idx}
                            />
                        ))}

                    {wishesExample.map((wish, idx) => {
                        if (wishes.length > idx) return null;

                        let opacity = 'opacity-0';
                        if (myUser?.id === userId) {
                            idx === 0 && (opacity = 'opacity-50');
                            idx === 1 && (opacity = 'opacity-40');
                            idx === 2 && (opacity = 'opacity-30');
                            idx === 3 && (opacity = 'opacity-20');
                        }

                        return (
                            <li
                                key={idx}
                                className={`${opacity} flex w-full flex-col items-center justify-center gap-6 rounded-md border-2 border-dashed border-zinc-300 p-8 dark:border-zinc-700`}
                                onClick={() =>
                                    myUser?.id === userId &&
                                    router.push(
                                        `/${activeLocale}/user/${myUser?.id}/wish/editor`
                                    )
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
                        <UiLoading isLocal bg="bg-transparent" />
                    </div>
                )}
            </div>

            <SlidePanel wishListRefCurrent={wishListRef.current} />

            {isLoading && <UiLoading />}
        </>
    );
};

export default WishList;
