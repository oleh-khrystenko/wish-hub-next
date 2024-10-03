import { FC, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useInView } from 'react-intersection-observer';
import { ECollectionSort } from '@/models/Collection';
import { useMyUserStore } from '@/stores/my-user';
import { useUsersStore } from '@/stores/users';
import { useCollectionsStore } from '@/stores/collection';
import { useSettingsStore } from '@/stores/settings';
import { COLLECTION_PAGINATION_LIMIT } from '@/helpers/utils/constants';
import UiButton from '@/components/ui/UiButton';
import UiPopup from '@/components/ui/UiPopup';
import UiSearch from '@/components/ui/UiSearch';
import CollectionIcon from '@/components/icons/CollectionIcon';
import EditIcon from '@/components/icons/EditIcon';
import BasketIcon from '@/components/icons/BasketIcon';
import SortIcon from '@/components/icons/SortIcon';

const Collections: FC = () => {
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const collectionListRef = useRef<HTMLUListElement>(null);

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
    const setCollectionsSort = useCollectionsStore(
        (state) => state.setCollectionsSort
    );
    const setCollectionsSearch = useCollectionsStore(
        (state) => state.setCollectionsSearch
    );
    const getCollections = useCollectionsStore((state) => state.getCollections);

    const setShowSlidePanel = useSettingsStore(
        (state) => state.setShowSlidePanel
    );

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

    const handleSortBy = async (value: ECollectionSort) => {
        if (!selectedUserId) return;

        setCollectionsSort(value);

        await getCollections(
            {
                userId: selectedUserId,
                page: 1,
                limit: COLLECTION_PAGINATION_LIMIT,
                search,
                sort: value,
            },
            allPagesT('my-user-api.get-collections.error')
        );

        collectionListRef.current?.scrollTo({
            behavior: 'smooth',
            top: 0,
        });

        setShowPopup(false);
    };

    const handleChangeSearchBar = async (value: string) => {
        if (!selectedUserId) return;

        setCollectionsSearch(value);

        await getCollections(
            {
                userId: selectedUserId,
                page: 1,
                limit: COLLECTION_PAGINATION_LIMIT,
                search: value,
                sort: ECollectionSort.CREATED_DESC,
            },
            allPagesT('my-user-api.get-collections.error')
        );

        collectionListRef.current?.scrollTo({
            behavior: 'smooth',
            top: 0,
        });
    };

    const handleDeleteCollection = () => {
        console.log('handleDeleteCollection');
    };

    return (
        <div className="mb-2 flex flex-col gap-1 mobile-sm:mb-6">
            <div className="flex items-center justify-between gap-2">
                {/* Title */}
                <p className="mr-auto flex items-center gap-2 pl-2 text-sm font-bold text-zinc-500 dark:text-zinc-400 mobile-lg:text-base">
                    <CollectionIcon classes="w-4 h-4 mobile-lg:w-5 mobile-lg:h-5 fill-cyan-400 dark:fill-cyan-300" />
                    {mainPageT('collections')}:
                </p>

                {/* Sort */}
                <div className="relative ml-auto">
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
                        classes="pt-10 pr-4"
                        show={showPopup}
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
                <ul
                    className="flex max-h-[calc(100svh_-_428px)] flex-col gap-1 overflow-y-auto overflow-x-hidden pl-3 pr-1 mobile-xs:max-h-[calc(100svh_-_600px)] mobile-md:max-h-[calc(100svh_-_650px)] tablet-lg:max-h-[calc(100svh_-_568px)]"
                    ref={collectionListRef}
                >
                    {collections.map((collection) => (
                        <li
                            key={collection.id}
                            className={`${collection.id === collectionId ? 'border-cyan-400 dark:border-cyan-300' : 'border-transparent'} flex items-center rounded-md border border-dashed`}
                        >
                            <Link
                                href={`${pathname}?collectionId=${collection.id}`}
                                className="w-full rounded-md px-3 py-1.5 text-left text-sm font-bold text-zinc-600 transition-all duration-300 ease-in-out hover:bg-zinc-200 dark:text-zinc-300 hover:dark:bg-zinc-600 mobile-lg:py-2 mobile-lg:text-base"
                                onClick={() => setShowSlidePanel(false)}
                            >
                                {collection.name}
                            </Link>

                            {(collection.id !== collectionId ||
                                pathname !==
                                    `/${activeLocale}/user/${selectedUserId}/collection/editor`) && (
                                <UiButton
                                    variant="text-only"
                                    href={`user/${myUser?.id}/collection/editor?collectionId=${collection.id}`}
                                    onLinkClick={() => setShowSlidePanel(false)}
                                >
                                    <span className="rounded-md p-2.5 transition-all duration-300 ease-in-out hover:bg-zinc-200 hover:dark:bg-zinc-600 mobile-xs:p-3">
                                        <EditIcon classes="w-4 h-4 fill-zinc-800 dark:fill-zinc-300" />
                                    </span>
                                </UiButton>
                            )}

                            <button
                                className="rounded-md p-2 transition-all duration-300 ease-in-out hover:bg-zinc-200 hover:dark:bg-zinc-600 mobile-xs:p-2.5"
                                type="button"
                                onClick={handleDeleteCollection}
                            >
                                <BasketIcon />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Collections;
