import { FC } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useMyUserStore } from '@/stores/my-user';
import { useWishesStore } from '@/stores/wishes';
import { useUsersStore } from '@/stores/users';
import { WISHES_PAGINATION_LIMIT } from '@/helpers/utils/constants';
import UseInitialCollection from '@/helpers/hooks/UseInitialCollection';
import UiSearch from '@/components/ui/UiSearch';

interface IProps {
    wishListRefCurrent: HTMLDivElement | null;
}

const WishesSearch: FC<IProps> = ({ wishListRefCurrent }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const activeLocale = useLocale();
    const mainPageT = useTranslations('main-page');
    const allPagesT = useTranslations('all-pages');

    const myUser = useMyUserStore((state) => state.myUser);

    const selectedUserId = useUsersStore((state) => state.selectedUserId);

    const status = useWishesStore((state) => state.status);
    const search = useWishesStore((state) => state.search);
    const sort = useWishesStore((state) => state.sort);
    const setWishesSearch = useWishesStore((state) => state.setWishesSearch);
    const getWishList = useWishesStore((state) => state.getWishList);
    const getAllWishes = useWishesStore((state) => state.getAllWishes);
    const getCollectionWishes = useWishesStore(
        (state) => state.getCollectionWishes
    );

    const collectionId = searchParams.get('collectionId');

    const { setSelectedWishesInEditCollection } = UseInitialCollection();

    const handleChangeSearchBar = async (value: string) => {
        setWishesSearch(value);

        if (selectedUserId) {
            if (
                collectionId &&
                pathname !==
                    `/${activeLocale}/user/${selectedUserId}/collection/editor`
            ) {
                await getCollectionWishes(
                    {
                        collectionId,
                        myId: myUser?.id,
                        userId: selectedUserId,
                        status,
                        page: 1,
                        limit: WISHES_PAGINATION_LIMIT,
                        search: value,
                        sort,
                    },
                    allPagesT('wishes-api.get-collection-wishes.error')
                );
            } else {
                const wishes = await getWishList(
                    {
                        myId: myUser?.id,
                        userId: selectedUserId,
                        page: 1,
                        limit: WISHES_PAGINATION_LIMIT,
                        status,
                        search: value,
                        sort,
                    },
                    allPagesT('wishes-api.get-wish-list.error')
                );

                if (!wishes) return;
                setSelectedWishesInEditCollection(wishes);
            }
        } else {
            await getAllWishes(
                {
                    page: 1,
                    limit: WISHES_PAGINATION_LIMIT,
                    status,
                    search: value,
                    sort,
                },
                allPagesT('wishes-api.get-all-wishes.error')
            );
        }

        if (!wishListRefCurrent) return;

        wishListRefCurrent.scrollTo({
            behavior: 'smooth',
            top: 0,
        });
    };

    return (
        <UiSearch
            id="wishes-search"
            label={mainPageT('wishes-search')}
            value={search}
            changeSearchBar={handleChangeSearchBar}
        />
    );
};

export default WishesSearch;
