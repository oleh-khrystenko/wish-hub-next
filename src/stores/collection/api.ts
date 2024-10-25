import { AxiosResponse } from 'axios';
import { ICollection } from '@/models/Collection';
import {
    ICollectionId,
    IDeleteCollection,
    IGetCollections,
    ISendCreateCollection,
    ISendDeleteCollection,
    ISendGetCollections,
    ISendGetWishCollections,
    ISendUpdateCollection,
} from '@/stores/collection/types';
import api from '@/helpers/utils/api';

const createCollection = async (
    data: ISendCreateCollection
): Promise<AxiosResponse<ICollection>> => {
    return await api.post('/collection', data);
};

const updateCollection = async (
    data: ISendUpdateCollection
): Promise<AxiosResponse<ICollection>> => {
    return await api.put('/collection', data);
};

const getCollection = async (
    params: ICollectionId
): Promise<AxiosResponse<ICollection>> => {
    return await api.get('/collection', { params });
};

const getCollections = async (
    params: ISendGetCollections
): Promise<AxiosResponse<IGetCollections>> => {
    return await api.get('/collections', { params });
};

const getWishCollections = async (
    params: ISendGetWishCollections
): Promise<AxiosResponse<IGetCollections>> => {
    return await api.get('/wish-collections', { params });
};

const deleteCollection = async (
    params: ISendDeleteCollection
): Promise<AxiosResponse<IDeleteCollection>> => {
    return await api.delete('/collection', { params });
};

const collectionApi = {
    createCollection,
    updateCollection,
    getCollection,
    getCollections,
    getWishCollections,
    deleteCollection,
};

export default collectionApi;
