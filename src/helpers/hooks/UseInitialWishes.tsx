import { useTranslations } from 'next-intl';
import { EWishPrivacy, EWishStatus, IWish, TWishSort } from '@/models/Wish';
import { IUser } from '@/models/User';
import { ICollection } from '@/models/Collection';
import { useWishesStore } from '@/stores/wishes';
import { useUsersStore } from '@/stores/users';
import { WISHES_PAGINATION_LIMIT } from '@/helpers/utils/constants';

const UseInitialWishes = () => {
    const allPagesT = useTranslations('all-pages');

    const setSelectedUserId = useUsersStore((state) => state.setSelectedUserId);

    const setWishesStatus = useWishesStore((state) => state.setWishesStatus);
    const setWishesSearch = useWishesStore((state) => state.setWishesSearch);
    const setWishesSort = useWishesStore((state) => state.setWishesSort);
    const getAllWishes = useWishesStore((state) => state.getAllWishes);
    const getWishList = useWishesStore((state) => state.getWishList);
    const getCollectionWishes = useWishesStore(
        (state) => state.getCollectionWishes
    );

    const getInitialAllWishes = async () => {
        await getAllWishes(
            {
                page: 1,
                limit: WISHES_PAGINATION_LIMIT,
                status: EWishStatus.ALL,
                search: '',
                sort: 'sortByLikes:desc',
            },
            allPagesT('wishes-api.get-all-wishes.error')
        );
        setWishesStatus(EWishStatus.ALL);
        setWishesSearch('');
        setWishesSort('sortByLikes:desc');
        setSelectedUserId(null);
        localStorage.removeItem('selectedUserId');
    };

    const getInitialWishList = async (
        myId: IUser['id'] | undefined,
        userId: IUser['id'],
        sort: TWishSort = 'sortByLikes:desc',
        wishIdListForCollection: IWish['id'][] = []
    ) => {
        await getWishList(
            {
                myId,
                userId,
                status: EWishStatus.ALL,
                privacy: EWishPrivacy.ALL,
                page: 1,
                limit: WISHES_PAGINATION_LIMIT,
                search: '',
                sort,
            },
            allPagesT('wishes-api.get-wish-list.error'),
            wishIdListForCollection
        );
        setWishesStatus(EWishStatus.ALL);
        setWishesSearch('');
        setWishesSort(sort);
        setSelectedUserId(userId);
        localStorage.setItem('selectedUserId', userId);
    };

    const getInitialCollectionWishes = async (
        collectionId: ICollection['id'],
        myId: IUser['id'] | undefined,
        userId: IUser['id'],
        sort: TWishSort = 'sortByLikes:desc'
    ) => {
        await getCollectionWishes(
            {
                collectionId,
                myId,
                userId,
                status: EWishStatus.ALL,
                privacy: EWishPrivacy.ALL,
                page: 1,
                limit: WISHES_PAGINATION_LIMIT,
                search: '',
                sort,
            },
            allPagesT('wishes-api.get-collection-wishes.error')
        );
        setWishesStatus(EWishStatus.ALL);
        setWishesSearch('');
        setWishesSort(sort);
        setSelectedUserId(userId);
        localStorage.setItem('selectedUserId', userId);
    };

    return {
        getInitialAllWishes,
        getInitialWishList,
        getInitialCollectionWishes,
    };
};

export default UseInitialWishes;
