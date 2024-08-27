import { create } from 'zustand';
import { toast } from 'react-toastify';
import { EWishSort, EWishStatus, IWish, IWishCandidate } from '@/models/Wish';
import { IUser } from '@/models/User';
import { IQuote } from '@/models/Quote';
import {
    IActionWish,
    IBookWish,
    ICreateWish,
    IDeleteWish,
    IDoneWish,
    ISendAllWishes,
    ISendWishList,
    IUpdateWish,
} from '@/stores/wishes/types';
import wishesApi from '@/stores/wishes/api';
import { WISHES_PAGINATION_LIMIT } from '@/helpers/utils/constants';

const replaceWish = (
    state: {
        list: IWish[];
    },
    newWish: IWish
) => {
    // Змінити бажання та покласти його там де було
    // Знаходимо індекс бажання в списку за його ідентифікатором
    const index = state.list.findIndex(
        (currentWish) => currentWish.id === newWish.id
    );
    // Перевіряємо, чи було знайдено бажання
    if (index !== -1) {
        // Оновлюємо дані бажання
        state.list[index] = newWish;
    }
};

interface IWishesStore {
    list: IWish[];
    wishCandidate: IWishCandidate | null;
    creator: IUser | null;
    status: EWishStatus;
    search: string;
    sort: EWishSort;
    page: number;
    stopRequests: boolean;
    isLoading: boolean;
    setWishesStatus: (value: EWishStatus) => void;
    setWishesSearch: (value: string) => void;
    setWishesSort: (value: EWishSort) => void;
    resetWishCandidate: (value: IWishCandidate | null) => void;
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
        params: IDeleteWish,
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
    wishCandidate: null,
    creator: null,
    status: EWishStatus.ALL,
    search: '',
    sort: EWishSort.POPULAR,
    page: 1,
    stopRequests: false,
    isLoading: false,
    setWishesStatus: (value) => set({ status: value }),
    setWishesSearch: (value) => set({ search: value }),
    setWishesSort: (value) => set({ sort: value }),
    resetWishCandidate: (value) => set({ wishCandidate: value }),
    fetchWishDataFromLink: async (params, errorT) => {
        set((state) => ({
            ...state,
            isLoading: true,
        }));

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
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    createWish: async (data, errorT) => {
        set((state) => ({
            ...state,
            isLoading: true,
        }));

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
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    updateWish: async (data, successT, errorT) => {
        set((state) => ({
            ...state,
            isLoading: true,
        }));

        try {
            const response = await wishesApi.updateWish(data);

            set((state) => {
                replaceWish(state, response.data);

                return {
                    ...state,
                };
            });

            toast(successT, { type: 'success' });
        } catch (error: any) {
            toast(error.response?.data?.message || errorT, { type: 'error' });
        } finally {
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    bookWish: async (data, errorT) => {
        set((state) => ({
            ...state,
            isLoading: true,
        }));

        try {
            const response = await wishesApi.bookWish(data);

            set((state) => {
                replaceWish(state, response.data.wish);

                return {
                    ...state,
                };
            });

            return response.data.quote;
        } catch (error: any) {
            toast(error.response?.data?.message || errorT, { type: 'error' });
        } finally {
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    cancelBookWish: async (data, successT, errorT) => {
        set((state) => ({
            ...state,
            isLoading: true,
        }));

        try {
            const response = await wishesApi.cancelBookWish(data);

            set((state) => {
                replaceWish(state, response.data);

                return {
                    ...state,
                };
            });

            toast(successT, { type: 'success' });
        } catch (error: any) {
            toast(error.response?.data?.message || errorT, { type: 'error' });
        } finally {
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    doneWish: async (data, successT, errorT) => {
        set((state) => ({
            ...state,
            isLoading: true,
        }));

        try {
            const response = await wishesApi.doneWish(data);

            set((state) => {
                replaceWish(state, response.data.bookedWish);

                return {
                    ...state,
                };
            });

            toast(successT, { type: 'success' });
        } catch (error: any) {
            toast(error.response?.data?.message || errorT, { type: 'error' });
        } finally {
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    undoneWish: async (data, successT, errorT) => {
        set((state) => ({
            ...state,
            isLoading: true,
        }));

        try {
            const response = await wishesApi.undoneWish(data);

            set((state) => {
                replaceWish(state, response.data.bookedWish);

                return {
                    ...state,
                };
            });

            toast(successT, { type: 'success' });
        } catch (error: any) {
            toast(error.response?.data?.message || errorT, { type: 'error' });
        } finally {
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    likeWish: async (data, errorT) => {
        try {
            const response = await wishesApi.likeWish(data);

            set((state) => {
                replaceWish(state, response.data);

                return {
                    ...state,
                };
            });
        } catch (error: any) {
            toast(error.response?.data?.message || errorT, { type: 'error' });
        }
    },
    dislikeWish: async (data, errorT) => {
        try {
            const response = await wishesApi.dislikeWish(data);

            set((state) => {
                replaceWish(state, response.data);

                return {
                    ...state,
                };
            });
        } catch (error: any) {
            toast(error.response?.data?.message || errorT, { type: 'error' });
        }
    },
    deleteWish: async (params, successT, errorT) => {
        set((state) => ({
            ...state,
            isLoading: true,
        }));

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
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    getWishList: async (data, errorT) => {
        set((state) => ({
            ...state,
            stopRequests: true,
            isLoading: true,
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
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    addWishList: async (data, errorT) => {
        set((state) => ({
            ...state,
            stopRequests: true,
            isLoading: true,
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
        } finally {
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    getAllWishes: async (data, errorT) => {
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
            set((state) => ({
                ...state,
                isLoading: false,
            }));
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
        } finally {
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
}));
