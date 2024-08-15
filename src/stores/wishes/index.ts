import { create } from 'zustand';
import wishesApi from '@/stores/wishes/api';
import { EWishSort, EWishStatus, IWish, IWishCandidate } from '@/models/Wish';
import { IUser } from '@/models/User';
import {
    IActionWish,
    IBookWish,
    ICreateWish,
    IDoneWish,
    ISendAllWishes,
    ISendWishList,
    IUpdateWish,
} from '@/stores/wishes/types';
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
    setWishStatus: (value: EWishStatus) => void;
    setWishesSearch: (value: string) => void;
    setWishesSort: (value: EWishSort) => void;
    resetWishCandidate: (value: IWishCandidate | null) => void;
    fetchWishDataFromLink: (params: { url: string }) => Promise<void>;
    createWish: (data: ICreateWish) => Promise<void>;
    updateWish: (data: IUpdateWish) => Promise<void>;
    bookWish: (data: IBookWish) => Promise<void>;
    cancelBookWish: (data: IActionWish) => Promise<void>;
    doneWish: (data: IDoneWish) => Promise<void>;
    undoneWish: (data: IActionWish) => Promise<void>;
    likeWish: (data: IActionWish) => Promise<void>;
    dislikeWish: (data: IActionWish) => Promise<void>;
    deleteWish: (params: {
        userId: IUser['id'];
        wishId: IWish['id'];
    }) => Promise<void>;
    getWishList: (data: ISendWishList) => Promise<void>;
    addWishList: (data: ISendWishList) => Promise<void>;
    getAllWishes: (data: ISendAllWishes) => Promise<void>;
    addAllWishes: (data: ISendAllWishes) => Promise<void>;
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
    setWishStatus: (value) => set({ status: value }),
    setWishesSearch: (value) => set({ search: value }),
    setWishesSort: (value) => set({ sort: value }),
    resetWishCandidate: (value) => set({ wishCandidate: value }),
    fetchWishDataFromLink: async (params) => {
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
            // toast(
            //     error.response?.data?.message ||
            //         t('alerts.wishes-api.fetch-wish-data.error'),
            //     { type: 'error' }
            // );
            set((state) => ({
                ...state,
                wishCandidate: null,
            }));
        } finally {
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    createWish: async (data) => {
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
        } catch (error: any) {
            // toast(
            //     error.response?.data?.message ||
            //         t('alerts.wishes-api.create-wish.error'),
            //     { type: 'error' }
            // );
        } finally {
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    updateWish: async (data) => {
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

            // toast(t('alerts.wishes-api.update-wish.success'), { type: 'success' });
        } catch (error: any) {
            // toast(
            //     error.response?.data?.message ||
            //         t('alerts.wishes-api.update-wish.error'),
            //     { type: 'error' }
            // );
        } finally {
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    bookWish: async (data) => {
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
        } catch (error: any) {
            // toast(
            //     error.response?.data?.message ||
            //         t('alerts.wishes-api.book-wish.error'),
            //     { type: 'error' }
            // );
        } finally {
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    cancelBookWish: async (data) => {
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

            // toast(t('alerts.wishes-api.cancel-book-wish.success'), {
            //     type: 'success',
            // });
        } catch (error: any) {
            // toast(
            //     error.response?.data?.message ||
            //         t('alerts.wishes-api.cancel-book-wish.error'),
            //     { type: 'error' }
            // );
        } finally {
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    doneWish: async (data) => {
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

            // toast(t('alerts.wishes-api.done-wish.success'), { type: 'success' });
        } catch (error: any) {
            // toast(
            //     error.response?.data?.message ||
            //         t('alerts.wishes-api.done-wish.error'),
            //     { type: 'error' }
            // );
        } finally {
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    undoneWish: async (data) => {
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

            // toast(t('alerts.wishes-api.undone-wish.success'), { type: 'success' });
        } catch (error: any) {
            // toast(
            //     error.response?.data?.message ||
            //         t('alerts.wishes-api.undone-wish.error'),
            //     { type: 'error' }
            // );
        } finally {
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    likeWish: async (data) => {
        set((state) => ({
            ...state,
            isLoading: true,
        }));

        try {
            const response = await wishesApi.likeWish(data);

            set((state) => {
                replaceWish(state, response.data);

                return {
                    ...state,
                };
            });
        } catch (error: any) {
            // toast(
            //     error.response?.data?.message ||
            //         t('alerts.wishes-api.like-wish.error'),
            //     { type: 'error' }
            // );
        } finally {
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    dislikeWish: async (data) => {
        set((state) => ({
            ...state,
            isLoading: true,
        }));

        try {
            const response = await wishesApi.dislikeWish(data);

            set((state) => {
                replaceWish(state, response.data);

                return {
                    ...state,
                };
            });
        } catch (error: any) {
            // toast(
            //     error.response?.data?.message ||
            //         t('alerts.wishes-api.dislike-wish.error'),
            //     { type: 'error' }
            // );
        } finally {
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    deleteWish: async (params) => {
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

            // toast(t('alerts.wishes-api.delete-wish.success'), { type: 'success' });
        } catch (error: any) {
            // toast(
            //     error.response?.data?.message ||
            //         t('alerts.wishes-api.delete-wish.error'),
            //     { type: 'error' }
            // );
        } finally {
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    getWishList: async (data) => {
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

            // toast(
            //     error.response?.data?.message ||
            //         t('alerts.wishes-api.get-wish-list.error'),
            //     { type: 'error' }
            // );
        } finally {
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    addWishList: async (data) => {
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

            // toast(
            //     error.response?.data?.message ||
            //         t('alerts.wishes-api.get-wish-list.error'),
            //     { type: 'error' }
            // );
        } finally {
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    getAllWishes: async (data) => {
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

            // toast(
            //     error.response?.data?.message ||
            //         t('alerts.wishes-api.get-all-wishes.error'),
            //     { type: 'error' }
            // );
        } finally {
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    addAllWishes: async (data) => {
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

            // toast(
            //     error.response?.data?.message ||
            //         t('alerts.wishes-api.get-all-wishes.error'),
            //     { type: 'error' }
            // );
        } finally {
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
}));
