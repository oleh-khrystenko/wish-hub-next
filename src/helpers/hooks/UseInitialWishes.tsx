import { useTranslations } from 'next-intl';
import { EWishSort, EWishStatus } from '@/models/Wish';
import { IUser } from '@/models/User';
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

    const getInitialAllWishes = async () => {
        await getAllWishes(
            {
                page: 1,
                limit: WISHES_PAGINATION_LIMIT,
                status: EWishStatus.ALL,
                search: '',
                sort: EWishSort.POPULAR,
            },
            allPagesT('wishes-api.get-all-wishes.error')
        );
        setWishesStatus(EWishStatus.ALL);
        setWishesSearch('');
        setWishesSort(EWishSort.POPULAR);
        setSelectedUserId(null);
        localStorage.removeItem('selectedUserId');
    };

    const getInitialWishList = async (
        myId: IUser['id'] | undefined,
        userId: IUser['id'],
        sort: EWishSort = EWishSort.POPULAR
    ) => {
        await getWishList(
            {
                myId,
                userId,
                status: EWishStatus.ALL,
                page: 1,
                limit: WISHES_PAGINATION_LIMIT,
                search: '',
                sort,
            },
            allPagesT('wishes-api.get-wish-list.error')
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
    };
};

export default UseInitialWishes;
