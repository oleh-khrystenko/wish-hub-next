import { usePathname, useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { TWishSort, EWishStatus, EWishPrivacy } from '@/models/Wish';
import { useMyUserStore } from '@/stores/my-user';
import { useWishesStore } from '@/stores/wishes';
import { useUsersStore } from '@/stores/users';
import UseInitialCollection from '@/helpers/hooks/UseInitialCollection';
import { WISHES_PAGINATION_LIMIT } from '@/helpers/utils/constants';

const UseChangeWishes = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const activeLocale = useLocale();
    const allPagesT = useTranslations('all-pages');

    const myUser = useMyUserStore((state) => state.myUser);

    const selectedUserId = useUsersStore((state) => state.selectedUserId);

    const getAllWishes = useWishesStore((state) => state.getAllWishes);
    const getWishList = useWishesStore((state) => state.getWishList);
    const getCollectionWishes = useWishesStore(
        (state) => state.getCollectionWishes
    );

    const collectionId = searchParams.get('collectionId');

    const { setSelectedWishesInEditCollection } = UseInitialCollection();

    const handleChangeWishes = async (
        status: EWishStatus,
        privacy: EWishPrivacy,
        search: string,
        sort: TWishSort,
        wishListRefCurrent: HTMLDivElement | null
    ) => {
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
                        privacy,
                        page: 1,
                        limit: WISHES_PAGINATION_LIMIT,
                        search,
                        sort,
                    },
                    allPagesT('wishes-api.get-collection-wishes.error')
                );
            } else {
                const wishes = await getWishList(
                    {
                        myId: myUser?.id,
                        userId: selectedUserId,
                        status,
                        privacy,
                        page: 1,
                        limit: WISHES_PAGINATION_LIMIT,
                        search,
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
                    search,
                    sort,
                },
                allPagesT('wishes-api.get-all-wishes.error')
            );
        }

        if (wishListRefCurrent) {
            wishListRefCurrent.scrollTo({
                behavior: 'smooth',
                top: 0,
            });
        }
    };

    return {
        handleChangeWishes,
    };
};

export default UseChangeWishes;
