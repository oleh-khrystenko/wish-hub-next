import { EWishSort, EWishStatus } from '@/models/Wish';
import { IUser } from '@/models/User';
import { useWishesStore } from '@/stores/wishes';
import { useUsersStore } from '@/stores/users';
import { WISHES_PAGINATION_LIMIT } from '@/helpers/utils/constants';

const UseInitialWishes = () => {
    const getAllWishes = useWishesStore((state) => state.getAllWishes);
    const setWishStatus = useWishesStore((state) => state.setWishStatus);
    const setWishesSearch = useWishesStore((state) => state.setWishesSearch);
    const setWishesSort = useWishesStore((state) => state.setWishesSort);
    const setSelectUserId = useUsersStore((state) => state.setSelectUserId);
    const getWishList = useWishesStore((state) => state.getWishList);

    const getInitialAllWishes = async () => {
        await getAllWishes({
            page: 1,
            limit: WISHES_PAGINATION_LIMIT,
            search: '',
            sort: EWishSort.POPULAR,
        });
        setWishStatus(EWishStatus.ALL);
        setWishesSearch('');
        setWishesSort(EWishSort.POPULAR);
        setSelectUserId(null);
        localStorage.removeItem('selectedUserId');
    };

    const getInitialWishList = async (
        myId: IUser['id'] | undefined,
        userId: IUser['id'],
        sort: EWishSort = EWishSort.POPULAR
    ) => {
        await getWishList({
            myId,
            userId,
            status: EWishStatus.ALL,
            page: 1,
            limit: WISHES_PAGINATION_LIMIT,
            search: '',
            sort,
        });
        setWishStatus(EWishStatus.ALL);
        setWishesSearch('');
        setWishesSort(sort);
        setSelectUserId(userId);
        localStorage.setItem('selectedUserId', userId);
    };
    return {
        getInitialAllWishes,
        getInitialWishList,
    };
};

export default UseInitialWishes;
