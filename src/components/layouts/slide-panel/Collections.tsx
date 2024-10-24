import { FC, RefObject, useEffect, useRef, useState } from 'react';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useInView } from 'react-intersection-observer';
import { ECollectionSort, ICollection } from '@/models/Collection';
import { useMyUserStore } from '@/stores/my-user';
import { useUsersStore } from '@/stores/users';
import { useCollectionsStore } from '@/stores/collection';
import { useSettingsStore } from '@/stores/settings';
import UseScreenWidth from '@/helpers/hooks/UseScreenWidth';
import { COLLECTION_PAGINATION_LIMIT } from '@/helpers/utils/constants';
import UiButton from '@/components/ui/UiButton';
import UiPopup from '@/components/ui/UiPopup';
import UiSearch from '@/components/ui/UiSearch';
import UiLoading from '@/components/ui/UiLoading';
import CollectionIcon from '@/components/icons/CollectionIcon';
import EditIcon from '@/components/icons/EditIcon';
import BasketIcon from '@/components/icons/BasketIcon';
import SortIcon from '@/components/icons/SortIcon';

interface IProps {
    slidePanelRef: RefObject<HTMLDivElement>;
    filtersRef: RefObject<HTMLDivElement>;
    handleDeleteCollection: (currentCollection: ICollection) => void;
}

const Collections: FC<IProps> = ({
    slidePanelRef,
    filtersRef,
    handleDeleteCollection,
}) => {
    const [collectionListMaxHeight, setCollectionListMaxHeight] =
        useState<number>(300);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [firstLoad, setFirstLoad] = useState<boolean>(true);
    const [isLoadingAdd, setIsLoadingAdd] = useState<boolean>(false);

    const collectionListRef = useRef<HTMLUListElement>(null);

    const { userId } = useParams<{ userId: string }>();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const activeLocale = useLocale();
    const mainPageT = useTranslations('main-page');
    const allPagesT = useTranslations('all-pages');

    const { ref, inView } = useInView({
        threshold: 0,
    });

    const myUser = useMyUserStore((state) => state.myUser);

    const selectedUserId = useUsersStore((state) => state.selectedUserId);

    const collections = useCollectionsStore((state) => state.list);
    const sort = useCollectionsStore((state) => state.sort);
    const search = useCollectionsStore((state) => state.search);
    const page = useCollectionsStore((state) => state.page);
    const stopRequests = useCollectionsStore((state) => state.stopRequests);
    const setCollectionsSort = useCollectionsStore(
        (state) => state.setCollectionsSort
    );
    const setCollectionsSearch = useCollectionsStore(
        (state) => state.setCollectionsSearch
    );
    const getCollections = useCollectionsStore((state) => state.getCollections);
    const addCollections = useCollectionsStore((state) => state.addCollections);

    const setShowSlidePanel = useSettingsStore(
        (state) => state.setShowSlidePanel
    );

    const { screenWidth, screenHeight } = UseScreenWidth();

    const collectionId = searchParams.get('collectionId');

    let wishesSortText = allPagesT('sort.title');
    sort === ECollectionSort.CREATED_DESC &&
        (wishesSortText = allPagesT('sort.by-created-up'));
    sort === ECollectionSort.CREATED_ASC &&
        (wishesSortText = allPagesT('sort.by-created-down'));
    sort === ECollectionSort.TITLE_DESC &&
        (wishesSortText = allPagesT('sort.by-title-desc'));
    sort === ECollectionSort.TITLE_ASC &&
        (wishesSortText = allPagesT('sort.by-title-asc'));

    const currentUserId = selectedUserId || userId;

    const handleSortBy = async (value: ECollectionSort) => {
        if (!currentUserId) return;

        setCollectionsSort(value);

        await getCollections(
            {
                myId: myUser?.id,
                userId: currentUserId,
                page: 1,
                limit: COLLECTION_PAGINATION_LIMIT,
                search,
                sort: value,
            },
            allPagesT('collections.get-collections.error')
        );

        collectionListRef.current?.scrollTo({
            behavior: 'smooth',
            top: 0,
        });

        setShowPopup(false);
    };

    const handleChangeSearchBar = async (value: string) => {
        if (!currentUserId) return;

        setCollectionsSearch(value);

        await getCollections(
            {
                myId: myUser?.id,
                userId: currentUserId,
                page: 1,
                limit: COLLECTION_PAGINATION_LIMIT,
                search: value,
                sort: ECollectionSort.CREATED_DESC,
            },
            allPagesT('collections.get-collections.error')
        );

        collectionListRef.current?.scrollTo({
            behavior: 'smooth',
            top: 0,
        });
    };

    useEffect(() => {
        const fetchWishes = async () => {
            if (firstLoad) {
                setFirstLoad(false);
                return;
            }

            if (!inView || stopRequests || !currentUserId) return;

            setIsLoadingAdd(true);

            await addCollections(
                {
                    myId: myUser?.id,
                    userId: currentUserId,
                    page,
                    limit: COLLECTION_PAGINATION_LIMIT,
                    search,
                    sort,
                },
                allPagesT('collections.get-collections.error')
            );

            setIsLoadingAdd(false);
        };

        fetchWishes().finally();
    }, [inView]);

    useEffect(() => {
        if (!slidePanelRef.current || !filtersRef.current) return;

        const slidePanelHeight = slidePanelRef.current.clientHeight;

        const topPaddingOfHeader = 4;
        const heightOfHeader = 72;
        const topSpaceOfSlidePanel = 4;
        const bottomSpaceOfSlidePanel = 4;
        const topPaddingOfSlidePanel = 24;
        const bottomPaddingOfSlidePanel = 40;
        const gapOfSlidePanel = 24;
        const heightOfSlidePanelTitle = 28;
        const topPaddingOfWishWrapper = 12;
        const bottomPaddingOfWishWrapper = 4;
        const heightOfWishHead = 40;
        const filtersHeight = filtersRef.current.clientHeight;
        const topMarginOfCollectionWrapper = 16;
        const topBorderOfCollectionWrapper = 1;
        const topPaddingOfCollectionWrapper = 12;
        const gapOfCollectionWrapper = 4;
        const heightOfCollectionHead = 40;
        const topPaddingOfCollectionInnerWrapper = 24;
        const bottomPaddingOfCollectionInnerWrapper = 8;
        const heightOfCollectionSearch = 48;

        const totalHeight =
            topPaddingOfSlidePanel +
            bottomPaddingOfSlidePanel +
            gapOfSlidePanel +
            heightOfSlidePanelTitle +
            topPaddingOfWishWrapper +
            bottomPaddingOfWishWrapper +
            heightOfWishHead +
            filtersHeight +
            topMarginOfCollectionWrapper +
            topBorderOfCollectionWrapper +
            topPaddingOfCollectionWrapper +
            gapOfCollectionWrapper +
            heightOfCollectionHead +
            topPaddingOfCollectionInnerWrapper +
            bottomPaddingOfCollectionInnerWrapper +
            heightOfCollectionSearch;

        const coefficient = screenWidth < 360 ? 0.85 : 0.7;

        const outerHeight =
            topPaddingOfHeader +
            heightOfHeader +
            topSpaceOfSlidePanel +
            bottomSpaceOfSlidePanel;

        const maxFreeSpace = screenHeight - outerHeight;

        if (screenWidth < 1024) {
            setCollectionListMaxHeight(
                screenHeight - screenHeight * coefficient
            );
        } else {
            if (slidePanelHeight < maxFreeSpace) {
                setCollectionListMaxHeight(slidePanelHeight - totalHeight);
            } else {
                setCollectionListMaxHeight(
                    screenHeight - totalHeight - outerHeight
                );
            }
        }
    }, [
        screenHeight,
        slidePanelRef.current?.clientHeight,
        filtersRef.current?.clientHeight,
    ]);

    return (
        <div className="mt-4 flex flex-col gap-1 border-t border-zinc-400 pt-3 dark:border-zinc-700">
            <div className="flex items-center justify-between gap-2">
                {/* Title */}
                <p className="mr-auto flex items-center gap-2 pl-2 text-sm font-bold text-zinc-500 dark:text-zinc-400 mobile-lg:text-base">
                    <CollectionIcon classes="w-4 h-4 mobile-lg:w-5 mobile-lg:h-5 fill-cyan-400 dark:fill-cyan-300" />
                    {mainPageT('collections')}:
                </p>

                {/* Sort */}
                <div className="relative -mr-3 ml-auto">
                    <UiButton
                        variant="text-btn"
                        onBtnClick={() => setShowPopup(true)}
                    >
                        <span className="whitespace-nowrap text-xs text-zinc-500 dark:text-zinc-400 mobile-xl:text-base">
                            {wishesSortText}
                        </span>

                        <SortIcon />
                    </UiButton>

                    <UiPopup
                        classes={`${collections.length < 2 ? 'pb-10' : 'pt-10'} pr-4`}
                        show={showPopup}
                        showPopupUp={collections.length < 2}
                        hide={() => setShowPopup(false)}
                    >
                        <div className="flex flex-col p-2">
                            <button
                                className="whitespace-nowrap rounded-md px-3 py-2.5 text-left text-sm font-bold text-zinc-500 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800 tablet-md:text-base"
                                type="button"
                                onClick={() =>
                                    handleSortBy(ECollectionSort.CREATED_ASC)
                                }
                            >
                                {allPagesT('sort.by-created-down')}
                            </button>

                            <button
                                className="whitespace-nowrap rounded-md px-3 py-2.5 text-left text-sm font-bold text-zinc-500 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800 tablet-md:text-base"
                                type="button"
                                onClick={() =>
                                    handleSortBy(ECollectionSort.CREATED_DESC)
                                }
                            >
                                {allPagesT('sort.by-created-up')}
                            </button>

                            <button
                                className="whitespace-nowrap rounded-md px-3 py-2.5 text-left text-sm font-bold text-zinc-500 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800 tablet-md:text-base"
                                type="button"
                                onClick={() =>
                                    handleSortBy(ECollectionSort.TITLE_ASC)
                                }
                            >
                                {allPagesT('sort.by-title-asc')}
                            </button>

                            <button
                                className="whitespace-nowrap rounded-md px-3 py-2.5 text-left text-sm font-bold text-zinc-500 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800 tablet-md:text-base"
                                type="button"
                                onClick={() =>
                                    handleSortBy(ECollectionSort.TITLE_DESC)
                                }
                            >
                                {allPagesT('sort.by-title-desc')}
                            </button>
                        </div>
                    </UiPopup>
                </div>
            </div>

            <div className="rounded-xl bg-zinc-300 pb-2 pr-2 pt-6 dark:bg-zinc-800">
                {/* Search */}
                <div className="pb-2 pl-3 pr-2">
                    <UiSearch
                        id="collections-search"
                        label={allPagesT('collections_search')}
                        value={search}
                        changeSearchBar={handleChangeSearchBar}
                    />
                </div>

                {/* List */}
                {collections.length > 0 ? (
                    <ul
                        style={{ maxHeight: `${collectionListMaxHeight}px` }}
                        className={`flex flex-col gap-1 overflow-y-auto overflow-x-hidden pl-3 pr-1`}
                        ref={collectionListRef}
                    >
                        {collectionId && (
                            <li className="flex">
                                <UiButton
                                    href={pathname.replace(
                                        `/${activeLocale}/`,
                                        ''
                                    )}
                                    variant="clear-styles"
                                    classesWrap="w-full truncate rounded-md px-3 py-1.5 text-left text-sm font-bold text-zinc-600 transition-all duration-300 ease-in-out hover:bg-zinc-200 dark:text-zinc-300 hover:dark:bg-zinc-600 mobile-lg:py-2 mobile-lg:text-base"
                                    onLinkClick={() => setShowSlidePanel(false)}
                                >
                                    {allPagesT('all_wishes')}
                                </UiButton>
                            </li>
                        )}

                        {collections.map((collection) => (
                            <li
                                key={collection.id}
                                className={`${collection.id === collectionId ? 'border-cyan-400 dark:border-cyan-300' : 'border-transparent'} flex items-center rounded-md border border-dashed`}
                            >
                                <UiButton
                                    href={`${pathname.replace(`/${activeLocale}/`, '').replace('/editor', '')}?collectionId=${collection.id}`}
                                    variant="clear-styles"
                                    classesWrap="w-full truncate rounded-md px-3 py-1.5 text-left text-sm font-bold text-zinc-600 transition-all duration-300 ease-in-out hover:bg-zinc-200 dark:text-zinc-300 hover:dark:bg-zinc-600 mobile-lg:py-2 mobile-lg:text-base"
                                    onLinkClick={() => setShowSlidePanel(false)}
                                >
                                    {collection.name}
                                </UiButton>

                                {collection.userId === myUser?.id && (
                                    <>
                                        <UiButton
                                            href={`user/${myUser?.id}/collection/editor?collectionId=${collection.id}`}
                                            variant="text-only"
                                            onLinkClick={() =>
                                                setShowSlidePanel(false)
                                            }
                                        >
                                            <span className="rounded-md p-2.5 transition-all duration-300 ease-in-out hover:bg-zinc-200 hover:dark:bg-zinc-600 mobile-xs:p-3">
                                                <EditIcon classes="w-4 h-4 fill-zinc-800 dark:fill-zinc-300" />
                                            </span>
                                        </UiButton>

                                        <UiButton
                                            variant="text-only"
                                            classesWrap="rounded-md p-2 transition-all duration-300 ease-in-out hover:bg-zinc-200 hover:dark:bg-zinc-600 mobile-xs:p-2.5"
                                            onBtnClick={() =>
                                                handleDeleteCollection(
                                                    collection
                                                )
                                            }
                                        >
                                            <BasketIcon />
                                        </UiButton>
                                    </>
                                )}
                            </li>
                        ))}

                        <li
                            className="h-px w-full"
                            style={{
                                display: stopRequests ? 'none' : 'block',
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
                ) : (
                    <p className="text-center text-sm text-zinc-800 dark:text-zinc-300">
                        {allPagesT('no_collections_found')}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Collections;
