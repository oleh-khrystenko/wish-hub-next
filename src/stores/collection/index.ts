import { create } from 'zustand';
import { toast } from 'react-toastify';
import { IWish } from '@/models/Wish';
import { ECollectionSort, ICollection } from '@/models/Collection';
import { EAddToCollection } from '@/models/Settings';
import {
    ISendCreateCollection,
    ISendDeleteCollection,
    ISendGetCollections,
    ISendGetWishCollections,
    ISendUpdateCollection,
} from '@/stores/collection/types';
import collectionApi from '@/stores/collection/api';
import { useSettingsStore } from '@/stores/settings';
import {
    COLLECTION_PAGINATION_LIMIT,
    WISH_COLLECTION_PAGINATION_LIMIT,
} from '@/helpers/utils/constants';

const { setShowGlobalLoading } = useSettingsStore.getState();

interface ICollectionsStore {
    list: ICollection[];
    search: string;
    sort: ECollectionSort;
    page: number;
    stopRequests: boolean;
    wishCollections: ICollection[];
    pageWishCollections: number;
    stopRequestsWishCollections: boolean;
    showAddToCollection: EAddToCollection;
    addToCollectionError: string;
    setAddToCollectionError: (value: string) => void;
    setCollectionsSearch: (value: string) => void;
    setCollectionsSort: (value: ECollectionSort) => void;
    setSelectedCollection: (id: ICollection['id']) => void;
    setShowAddToCollection: (value: EAddToCollection) => void;
    setResetCollections: () => void;
    createCollection: (
        data: ISendCreateCollection,
        successT: string,
        errorT: string
    ) => Promise<ICollection | void>;
    updateCollection: (
        data: ISendUpdateCollection,
        successT: string,
        errorT: string
    ) => Promise<ICollection | void>;
    getCollections: (
        params: ISendGetCollections,
        errorT: string,
        wishId?: IWish['id']
    ) => Promise<ICollection[] | void>;
    addCollections: (
        params: ISendGetCollections,
        errorT: string,
        wishId?: IWish['id']
    ) => Promise<ICollection[] | void>;
    getWishCollections: (
        params: ISendGetWishCollections,
        errorT: string
    ) => Promise<void>;
    addWishCollections: (
        params: ISendGetWishCollections,
        errorT: string
    ) => Promise<void>;
    deleteCollection: (
        params: ISendDeleteCollection,
        errorT: string
    ) => Promise<void>;
}

export const useCollectionsStore = create<ICollectionsStore>((set) => ({
    list: [],
    search: '',
    sort: ECollectionSort.CREATED_DESC,
    page: 1,
    stopRequests: false,
    wishCollections: [],
    pageWishCollections: 1,
    stopRequestsWishCollections: false,
    showAddToCollection: EAddToCollection.NONE,
    addToCollectionError: '',
    setAddToCollectionError: (value) => {
        set((state) => ({
            ...state,
            addToCollectionError: value,
        }));
    },
    setCollectionsSearch: (value) => {
        set((state) => ({
            ...state,
            search: value,
        }));
    },
    setCollectionsSort: (value) => {
        set((state) => ({
            ...state,
            sort: value,
        }));
    },
    setSelectedCollection: (id) => {
        set((state) => ({
            ...state,
            list: state.list.map((collection) => {
                if (collection.id === id) {
                    return {
                        ...collection,
                        selected: !collection.selected,
                    };
                }

                return collection;
            }),
        }));
    },
    setShowAddToCollection: (value) => {
        set((state) => ({
            ...state,
            showAddToCollection: value,
        }));
    },
    setResetCollections: () => {
        set((state) => ({
            ...state,
            list: [],
            search: '',
            sort: ECollectionSort.CREATED_DESC,
            page: 1,
            stopRequests: false,
        }));
    },
    createCollection: async (data, successT, errorT) => {
        try {
            const response = await collectionApi.createCollection(data);

            set((state) => ({
                ...state,
                list: [response.data, ...state.list],
            }));

            toast(successT, { type: 'success' });

            return response.data;
        } catch (error: any) {
            toast(error.response?.data?.message || errorT, { type: 'error' });
        }
    },
    updateCollection: async (data, successT, errorT) => {
        try {
            const response = await collectionApi.updateCollection(data);

            set((state) => {
                // Знаходимо індекс бажання в списку за його ідентифікатором
                const index = state.list.findIndex(
                    (currentWish) => currentWish.id === response.data.id
                );

                const updatedList = [...state.list];

                // Перевіряємо, чи було знайдено бажання
                if (index !== -1) {
                    updatedList[index] = response.data;
                }

                return {
                    ...state,
                    list: updatedList,
                };
            });

            toast(successT, { type: 'success' });

            return response.data;
        } catch (error: any) {
            toast(error.response?.data?.message || errorT, { type: 'error' });
        }
    },
    getCollections: async (params, errorT, wishId) => {
        setShowGlobalLoading(true);

        set((state) => ({
            ...state,
            stopRequests: true,
        }));

        try {
            const response = await collectionApi.getCollections(
                wishId ? { ...params, wishId } : params
            );

            const selectedCollections = wishId
                ? response.data.collections.map((collection) => {
                      if (collection.wishIdList.includes(wishId)) {
                          return {
                              ...collection,
                              selected: true,
                          };
                      }

                      return collection;
                  })
                : response.data.collections;

            set((state) => ({
                ...state,
                list: selectedCollections,
                page: 2,
                stopRequests:
                    response.data.collections.length !==
                    COLLECTION_PAGINATION_LIMIT,
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
    addCollections: async (params, errorT, wishId) => {
        set((state) => ({
            ...state,
            stopRequests: true,
        }));

        try {
            const response = await collectionApi.getCollections(
                wishId ? { ...params, wishId } : params
            );

            const selectedCollections = wishId
                ? response.data.collections.map((collection) => {
                      if (collection.wishIdList.includes(wishId)) {
                          return {
                              ...collection,
                              selected: true,
                          };
                      }

                      return collection;
                  })
                : response.data.collections;

            set((state) => ({
                ...state,
                list: [...state.list, ...selectedCollections],
                page: state.page + 1,
                stopRequests:
                    response.data.collections.length !==
                    COLLECTION_PAGINATION_LIMIT,
            }));
        } catch (error: any) {
            set((state) => ({
                ...state,
                stopRequests: false,
            }));

            toast(error.response?.data?.message || errorT, { type: 'error' });
        }
    },
    getWishCollections: async (params, errorT) => {
        setShowGlobalLoading(true);

        set((state) => ({
            ...state,
            stopRequestsWishCollections: true,
        }));

        try {
            const response = await collectionApi.getWishCollections(params);

            set((state) => ({
                ...state,
                wishCollections: response.data.collections,
                pageWishCollections: 2,
                stopRequestsWishCollections:
                    response.data.collections.length !==
                    WISH_COLLECTION_PAGINATION_LIMIT,
            }));
        } catch (error: any) {
            set((state) => ({
                ...state,
                stopRequestsWishCollections: false,
            }));

            toast(error.response?.data?.message || errorT, { type: 'error' });
        } finally {
            setShowGlobalLoading(false);
        }
    },
    addWishCollections: async (params, errorT) => {
        set((state) => ({
            ...state,
            stopRequestsWishCollections: true,
        }));

        try {
            const response = await collectionApi.getWishCollections(params);

            set((state) => ({
                ...state,
                wishCollections: [
                    ...state.wishCollections,
                    ...response.data.collections,
                ],
                pageWishCollections: state.pageWishCollections + 1,
                stopRequestsWishCollections:
                    response.data.collections.length !==
                    WISH_COLLECTION_PAGINATION_LIMIT,
            }));
        } catch (error: any) {
            set((state) => ({
                ...state,
                stopRequestsWishCollections: false,
            }));

            toast(error.response?.data?.message || errorT, { type: 'error' });
        }
    },
    deleteCollection: async (params, errorT) => {
        setShowGlobalLoading(true);

        try {
            const response = await collectionApi.deleteCollection(params);

            set((state) => ({
                ...state,
                list: state.list.filter(
                    (collection) => collection.id !== response.data.collectionId
                ),
            }));

            toast(response.data.message, { type: 'success' });
        } catch (error: any) {
            toast(error.response?.data?.message || errorT, { type: 'error' });
        } finally {
            setShowGlobalLoading(false);
        }
    },
}));
