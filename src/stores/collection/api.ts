import { AxiosResponse } from 'axios';
import { ICollection } from '@/models/Collection';
import {
    IDeleteCollection,
    IGetCollections,
    ISendCreateCollection,
    ISendDeleteCollection,
    ISendGetCollections,
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

const getCollections = async (
    params: ISendGetCollections
): Promise<AxiosResponse<IGetCollections>> => {
    return await api.get('/collections', { params });
};

const deleteCollection = async (
    params: ISendDeleteCollection
): Promise<AxiosResponse<IDeleteCollection>> => {
    return await api.delete('/collection', { params });
};

const myUserApi = {
    createCollection,
    updateCollection,
    getCollections,
    deleteCollection,
};

export default myUserApi;
