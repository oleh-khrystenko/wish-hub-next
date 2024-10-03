import { create } from 'zustand';
import { toast } from 'react-toastify';
import { ECollectionSort, ICollection } from '@/models/Collection';
import {
    ISendCreateCollection,
    ISendGetCollections,
} from '@/stores/collection/types';
import collectionApi from '@/stores/collection/api';
import { useSettingsStore } from '@/stores/settings';
import { COLLECTION_PAGINATION_LIMIT } from '@/helpers/utils/constants';

const { setShowGlobalLoading } = useSettingsStore.getState();

interface ICollectionsStore {
    list: ICollection[];
    search: string;
    sort: ECollectionSort;
    page: number;
    stopRequests: boolean;
    setCollectionsSearch: (value: string) => void;
    setCollectionsSort: (value: ECollectionSort) => void;
    createCollection: (
        data: ISendCreateCollection,
        errorT: string
    ) => Promise<ICollection | void>;
    getCollections: (
        params: ISendGetCollections,
        errorT: string
    ) => Promise<void>;
    addCollections: (
        params: ISendGetCollections,
        errorT: string
    ) => Promise<void>;
}

export const useCollectionsStore = create<ICollectionsStore>((set) => ({
    list: [],
    search: '',
    sort: ECollectionSort.CREATED_DESC,
    page: 1,
    stopRequests: false,
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
    createCollection: async (data, errorT) => {
        try {
            const response = await collectionApi.createCollection(data);

            set((state) => ({
                ...state,
                list: [response.data, ...state.list],
            }));

            return response.data;
        } catch (error: any) {
            toast(error.response?.data?.message || errorT, { type: 'error' });
        }
    },
    getCollections: async (params, errorT) => {
        setShowGlobalLoading(true);

        set((state) => ({
            ...state,
            stopRequests: true,
        }));

        try {
            const response = await collectionApi.getCollections(params);

            set((state) => ({
                ...state,
                list: response.data.collections,
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
    addCollections: async (params, errorT) => {
        set((state) => ({
            ...state,
            stopRequests: true,
        }));

        try {
            const response = await collectionApi.getCollections(params);

            set((state) => ({
                ...state,
                list: [...state.list, ...response.data.collections],
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
}));
