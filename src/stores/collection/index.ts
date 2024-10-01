import { create } from 'zustand';
import { toast } from 'react-toastify';
import { ICollection } from '@/models/Collection';
import { IUserId } from '@/stores/my-user/types';
import { ICreateCollection } from '@/stores/collection/types';
import collectionApi from '@/stores/collection/api';
import { useSettingsStore } from '@/stores/settings';

const { setShowGlobalLoading } = useSettingsStore.getState();

interface ICollectionStore {
    collections: ICollection[];
    createCollection: (
        data: ICreateCollection,
        errorT: string
    ) => Promise<ICollection | void>;
    getCollections: (params: IUserId, errorT: string) => Promise<void>;
}

export const useCollectionStore = create<ICollectionStore>((set) => ({
    collections: [],
    createCollection: async (data, errorT) => {
        try {
            const response = await collectionApi.createCollection(data);

            set((state) => ({
                ...state,
                collections: [response.data, ...state.collections],
            }));

            return response.data;
        } catch (error: any) {
            toast(error.response?.data?.message || errorT, { type: 'error' });
        }
    },
    getCollections: async (params, errorT) => {
        setShowGlobalLoading(true);

        try {
            const response = await collectionApi.getCollections(params);

            set((state) => ({
                ...state,
                collections: response.data,
            }));
        } catch (error: any) {
            toast(error.response?.data?.message || errorT, { type: 'error' });
        } finally {
            setShowGlobalLoading(false);
        }
    },
}));
