import { create } from 'zustand';
import { toast } from 'react-toastify';
import { EWishSort, EWishStatus, IWish, IWishCandidate } from '@/models/Wish';
import { IUser } from '@/models/User';
import { IQuote } from '@/models/Quote';
import {
    IActionWish,
    IBookWish,
    ICreateWish,
    IDoneWish,
    IGetAnyWish,
    ISendAllWishes,
    ISendWishList,
    IUpdateWish,
} from '@/stores/wishes/types';
import wishesApi from '@/stores/wishes/api';
import { useSettingsStore } from '@/stores/settings';
import { WISHES_PAGINATION_LIMIT } from '@/helpers/utils/constants';

const replaceWish = (
    state: {
        list: IWish[];
        wish: IWish | null;
    },
    newWish: IWish
) => {
    // Знаходимо індекс бажання в списку за його ідентифікатором
    const index = state.list.findIndex(
        (currentWish) => currentWish.id === newWish.id
    );

    const updatedList = [...state.list];

    // Перевіряємо, чи було знайдено бажання
    if (index !== -1) {
        updatedList[index] = newWish;
    }

    // Оновлюємо стан з новим масивом та оновлюємо бажання
    return { list: updatedList, wish: { ...newWish } };
};

const { setShowGlobalLoading } = useSettingsStore.getState();

interface IWishesStore {
    list: IWish[];
    wish: IWish | null;
    wishId: IWish['id'] | null;
    wishCandidate: IWishCandidate | null;
    creator: IUser | null;
    status: EWishStatus;
    search: string;
    sort: EWishSort;
    page: number;
    stopRequests: boolean;
    setWishId: (value: IWish['id']) => void;
    setWishesStatus: (value: EWishStatus) => void;
    setWishesSearch: (value: string) => void;
    setWishesSort: (value: EWishSort) => void;
    resetWishCandidate: () => void;
    fetchWishDataFromLink: (
        params: { url: string },
        errorT: string
    ) => Promise<void>;
    createWish: (data: ICreateWish, errorT: string) => Promise<IQuote | void>;
    updateWish: (
        data: IUpdateWish,
        successT: string,
        errorT: string
    ) => Promise<void>;
    getWish: (
        params: IGetAnyWish | IActionWish,
        showAnyWish: boolean,
        errorT: string
    ) => Promise<void>;
    bookWish: (data: IBookWish, errorT: string) => Promise<IQuote | void>;
    cancelBookWish: (
        data: IActionWish,
        successT: string,
        errorT: string
    ) => Promise<void>;
    doneWish: (
        data: IDoneWish,
        successT: string,
        errorT: string
    ) => Promise<void>;
    undoneWish: (
        data: IActionWish,
        successT: string,
        errorT: string
    ) => Promise<void>;
    likeWish: (data: IActionWish, errorT: string) => Promise<void>;
    dislikeWish: (data: IActionWish, errorT: string) => Promise<void>;
    deleteWish: (
        params: IActionWish,
        successT: string,
        errorT: string
    ) => Promise<void>;
    getWishList: (data: ISendWishList, errorT: string) => Promise<void>;
    addWishList: (data: ISendWishList, errorT: string) => Promise<void>;
    getAllWishes: (data: ISendAllWishes, errorT: string) => Promise<void>;
    addAllWishes: (data: ISendAllWishes, errorT: string) => Promise<void>;
}

export const useWishesStore = create<IWishesStore>((set) => ({
    list: [],
    wish: null,
    wishId: null,
    wishCandidate: null,
    creator: null,
    status: EWishStatus.ALL,
    search: '',
    sort: EWishSort.POPULAR,
    page: 1,
    stopRequests: false,
    setWishId: (value) => {
        set((state) => ({
            ...state,
            wishId: value,
        }));
    },
    setWishesStatus: (value) => {
        set((state) => ({
            ...state,
            status: value,
        }));
    },
    setWishesSearch: (value) => {
        set((state) => ({
            ...state,
            search: value,
        }));
    },
    setWishesSort: (value) => {
        set((state) => ({
            ...state,
            sort: value,
        }));
    },
    resetWishCandidate: () => {
        set((state) => ({
            ...state,
            wishCandidate: null,
        }));
    },
    fetchWishDataFromLink: async (params, errorT) => {
        setShowGlobalLoading(true);

        try {
            const response = await wishesApi.fetchWishDataFromLink(params);

            set((state) => ({
                ...state,
                wishCandidate: response.data,
            }));
        } catch (error: any) {
            set((state) => ({
                ...state,
                wishCandidate: null,
            }));

            toast(error.response?.data?.message || errorT, { type: 'error' });
        } finally {
            setShowGlobalLoading(false);
        }
    },
    createWish: async (data, errorT) => {
        setShowGlobalLoading(true);

        try {
            const response = await wishesApi.createWish(data);

            set((state) => ({
                ...state,
                list: [response.data.wish, ...state.list],
            }));

            return response.data.quote;
        } catch (error: any) {
            toast(error.response?.data?.message || errorT, { type: 'error' });
        } finally {
            setShowGlobalLoading(false);
        }
    },
    updateWish: async (data, successT, errorT) => {
        setShowGlobalLoading(true);

        try {
            const response = await wishesApi.updateWish(data);

            set((state) => ({
                ...state,
                ...replaceWish(state, response.data),
            }));

            toast(successT, { type: 'success' });
        } catch (error: any) {
            toast(error.response?.data?.message || errorT, { type: 'error' });
        } finally {
            setShowGlobalLoading(false);
        }
    },
    getWish: async (params, showAnyWish, errorT) => {
        setShowGlobalLoading(true);

        set((state) => ({
            ...state,
            wish: null,
            creator: null,
        }));

        try {
            const response = showAnyWish
                ? await wishesApi.getAnyWish(params)
                : await wishesApi.getWish(params as IActionWish);

            set((state) => ({
                ...state,
                wish: response.data.wish,
                creator: response.data.creator,
            }));
        } catch (error: any) {
            set((state) => ({
                ...state,
                wish: null,
                creator: null,
            }));

            toast(error.response?.data?.message || errorT, { type: 'error' });
        } finally {
            setShowGlobalLoading(false);
        }
    },
    bookWish: async (data, errorT) => {
        setShowGlobalLoading(true);

        try {
            const response = await wishesApi.bookWish(data);

            set((state) => ({
                ...state,
                ...replaceWish(state, response.data.wish),
            }));

            return response.data.quote;
        } catch (error: any) {
            toast(error.response?.data?.message || errorT, { type: 'error' });
        } finally {
            setShowGlobalLoading(false);
        }
    },
    cancelBookWish: async (data, successT, errorT) => {
        setShowGlobalLoading(true);

        try {
            const response = await wishesApi.cancelBookWish(data);

            set((state) => ({
                ...state,
                ...replaceWish(state, response.data),
            }));

            toast(successT, { type: 'success' });
        } catch (error: any) {
            toast(error.response?.data?.message || errorT, { type: 'error' });
        } finally {
            setShowGlobalLoading(false);
        }
    },
    doneWish: async (data, successT, errorT) => {
        setShowGlobalLoading(true);

        try {
            const response = await wishesApi.doneWish(data);

            set((state) => ({
                ...state,
                ...replaceWish(state, response.data.bookedWish),
            }));

            toast(successT, { type: 'success' });
        } catch (error: any) {
            toast(error.response?.data?.message || errorT, { type: 'error' });
        } finally {
            setShowGlobalLoading(false);
        }
    },
    undoneWish: async (data, successT, errorT) => {
        setShowGlobalLoading(true);

        try {
            const response = await wishesApi.undoneWish(data);

            set((state) => ({
                ...state,
                ...replaceWish(state, response.data.bookedWish),
            }));

            toast(successT, { type: 'success' });
        } catch (error: any) {
            toast(error.response?.data?.message || errorT, { type: 'error' });
        } finally {
            setShowGlobalLoading(false);
        }
    },
    likeWish: async (data, errorT) => {
        setShowGlobalLoading(true);

        try {
            const response = await wishesApi.likeWish(data);

            set((state) => ({
                ...state,
                ...replaceWish(state, response.data),
            }));
        } catch (error: any) {
            toast(error.response?.data?.message || errorT, { type: 'error' });
        } finally {
            setShowGlobalLoading(false);
        }
    },
    dislikeWish: async (data, errorT) => {
        setShowGlobalLoading(true);

        try {
            const response = await wishesApi.dislikeWish(data);

            set((state) => ({
                ...state,
                ...replaceWish(state, response.data),
            }));
        } catch (error: any) {
            toast(error.response?.data?.message || errorT, { type: 'error' });
        } finally {
            setShowGlobalLoading(false);
        }
    },
    deleteWish: async (params, successT, errorT) => {
        setShowGlobalLoading(true);

        try {
            const response = await wishesApi.deleteWish(params);

            set((state) => ({
                ...state,
                list: state.list.filter((wish) => wish.id !== response.data),
            }));

            toast(successT, { type: 'success' });
        } catch (error: any) {
            toast(error.response?.data?.message || errorT, { type: 'error' });
        } finally {
            setShowGlobalLoading(false);
        }
    },
    getWishList: async (data, errorT) => {
        setShowGlobalLoading(true);

        set((state) => ({
            ...state,
            stopRequests: true,
        }));

        try {
            const response = await wishesApi.getWishList(data);

            set((state) => ({
                ...state,
                list: response.data.wishes,
                creator: response.data.creator,
                page: 2,
                stopRequests:
                    response.data.wishes.length !== WISHES_PAGINATION_LIMIT,
            }));
        } catch (error: any) {
            set((state) => ({
                ...state,
                stopRequests: false,
            }));

            toast(error.response?.data?.message || errorT, { type: 'error' });
        } finally {
            setShowGlobalLoading(false);
        }
    },
    addWishList: async (data, errorT) => {
        set((state) => ({
            ...state,
            stopRequests: true,
        }));

        try {
            const response = await wishesApi.getWishList(data);

            set((state) => ({
                ...state,
                list: [...state.list, ...response.data.wishes],
                page: state.page + 1,
                stopRequests:
                    response.data.wishes.length !== WISHES_PAGINATION_LIMIT,
            }));
        } catch (error: any) {
            set((state) => ({
                ...state,
                stopRequests: false,
            }));

            toast(error.response?.data?.message || errorT, { type: 'error' });
        }
    },
    getAllWishes: async (data, errorT) => {
        setShowGlobalLoading(true);
        set((state) => ({
            ...state,
            stopRequests: true,
        }));

        try {
            const response = await wishesApi.getAllWishes(data);

            set((state) => ({
                ...state,
                list: response.data,
                page: 2,
                stopRequests: response.data.length !== WISHES_PAGINATION_LIMIT,
            }));
        } catch (error: any) {
            set((state) => ({
                ...state,
                stopRequests: false,
            }));

            toast(error.response?.data?.message || errorT, { type: 'error' });
        } finally {
            setShowGlobalLoading(false);
        }
    },
    addAllWishes: async (data, errorT) => {
        set((state) => ({
            ...state,
            stopRequests: true,
        }));

        try {
            const response = await wishesApi.getAllWishes(data);

            set((state) => ({
                ...state,
                list: [...state.list, ...response.data],
                page: state.page + 1,
                stopRequests: response.data.length !== WISHES_PAGINATION_LIMIT,
            }));
        } catch (error: any) {
            set((state) => ({
                ...state,
                stopRequests: false,
            }));

            toast(error.response?.data?.message || errorT, { type: 'error' });
        }
    },
}));
