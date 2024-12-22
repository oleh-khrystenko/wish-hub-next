import { create } from 'zustand';
import { toast } from 'react-toastify';
import {
    TWishSort,
    EWishStatus,
    IWish,
    IWishCandidate,
    EWishPrivacy,
} from '@/models/wish';
import { IUser } from '@/models/user';
import { IQuote } from '@/models/quote';
import {
    IActionWish,
    IBookWish,
    ICreateWish,
    IDoneWish,
    IGetAnyWish,
    ISendAllWishes,
    ISendCollectionWishes,
    ISendWishList,
    IUpdateWish,
    IWishWithQuote,
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
    wishCandidate: IWishCandidate | null;
    creator: IUser | null;
    status: EWishStatus;
    privacy: EWishPrivacy;
    search: string;
    sort: TWishSort;
    page: number;
    stopRequests: boolean;
    selectedWishIdList: IWish['id'][];
    setWishesStatus: (value: EWishStatus) => void;
    setWishesPrivacy: (value: EWishPrivacy) => void;
    setWishesSearch: (value: string) => void;
    setWishesSort: (value: TWishSort) => void;
    setSelectedWish: (id: IWish['id']) => void;
    resetWishCandidate: () => void;
    resetWishList: () => void;
    fetchWishDataFromLink: (
        params: { url: string },
        errorT: string
    ) => Promise<void>;
    createWish: (
        data: ICreateWish,
        errorT: string
    ) => Promise<IWishWithQuote | void>;
    updateWish: (
        data: IUpdateWish,
        successT: string,
        errorT: string
    ) => Promise<IWish | void>;
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
    getWishList: (
        data: ISendWishList,
        errorT: string,
        wishIdListForCollection?: IWish['id'][]
    ) => Promise<IWish[] | void>;
    addWishList: (
        data: ISendWishList,
        errorT: string,
        wishIdListForCollection?: IWish['id'][]
    ) => Promise<IWish[] | void>;
    getAllWishes: (data: ISendAllWishes, errorT: string) => Promise<void>;
    addAllWishes: (data: ISendAllWishes, errorT: string) => Promise<void>;
    getCollectionWishes: (
        data: ISendCollectionWishes,
        errorT: string
    ) => Promise<void>;
    addCollectionWishes: (
        data: ISendCollectionWishes,
        errorT: string
    ) => Promise<void>;
}

export const useWishesStore = create<IWishesStore>((set) => ({
    list: [],
    wish: null,
    wishCandidate: null,
    creator: null,
    status: EWishStatus.ALL,
    privacy: EWishPrivacy.ALL,
    search: '',
    sort: 'sortByLikes:desc',
    page: 1,
    stopRequests: false,
    selectedWishIdList: [],
    setWishesStatus: (value) => {
        set((state) => ({
            ...state,
            status: value,
        }));
    },
    setWishesPrivacy: (value) => {
        set((state) => ({
            ...state,
            privacy: value,
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
    setSelectedWish: (id) => {
        set((state) => ({
            ...state,
            list: state.list.map((wish) => {
                if (wish.id === id) {
                    return {
                        ...wish,
                        selected: !wish.selected,
                    };
                }

                return wish;
            }),
            selectedWishIdList: state.selectedWishIdList.includes(id)
                ? state.selectedWishIdList.filter((wishId) => wishId !== id)
                : [...state.selectedWishIdList, id],
        }));
    },
    resetWishCandidate: () => {
        set((state) => ({
            ...state,
            wishCandidate: null,
        }));
    },
    resetWishList: () => {
        set((state) => ({
            ...state,
            list: [],
            page: 1,
            stopRequests: false,
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
                wishCandidate: null,
            }));

            return response.data;
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

            return response.data;
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
    getWishList: async (data, errorT, wishIdListForCollection) => {
        setShowGlobalLoading(true);

        set((state) => ({
            ...state,
            stopRequests: true,
        }));

        try {
            const response = await wishesApi.getWishList(data);

            const selectedWises = wishIdListForCollection
                ? response.data.wishes.map((wish) => {
                      if (wishIdListForCollection.includes(wish.id)) {
                          return {
                              ...wish,
                              selected: true,
                          };
                      }

                      return wish;
                  })
                : response.data.wishes;

            set((state) => ({
                ...state,
                list: selectedWises,
                selectedWishIdList: wishIdListForCollection || [],
                creator: response.data.creator,
                page: 2,
                stopRequests:
                    response.data.wishes.length !== WISHES_PAGINATION_LIMIT,
            }));

            return selectedWises;
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
    addWishList: async (data, errorT, wishIdListForCollection) => {
        set((state) => ({
            ...state,
            stopRequests: true,
        }));

        try {
            const response = await wishesApi.getWishList(data);

            const selectedWises = wishIdListForCollection
                ? response.data.wishes.map((wish) => {
                      if (wishIdListForCollection.includes(wish.id)) {
                          return {
                              ...wish,
                              selected: true,
                          };
                      }

                      return wish;
                  })
                : response.data.wishes;

            set((state) => ({
                ...state,
                list: [...state.list, ...selectedWises],
                page: state.page + 1,
                stopRequests:
                    response.data.wishes.length !== WISHES_PAGINATION_LIMIT,
            }));

            return selectedWises;
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
    getCollectionWishes: async (data, errorT) => {
        setShowGlobalLoading(true);
        set((state) => ({
            ...state,
            stopRequests: true,
        }));

        try {
            const response = await wishesApi.getCollectionWishes(data);

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
    addCollectionWishes: async (data, errorT) => {
        set((state) => ({
            ...state,
            stopRequests: true,
        }));

        try {
            const response = await wishesApi.getCollectionWishes(data);

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
}));
