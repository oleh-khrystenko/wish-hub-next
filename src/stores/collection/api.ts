import { AxiosResponse } from 'axios';
import { ICollection } from '@/models/Collection';
import {
    IDeleteCollection,
    IGetCollections,
    ISendCreateCollection,
    ISendDeleteCollection,
    ISendGetCollections,
} from '@/stores/collection/types';
import api from '@/helpers/utils/api';

const createCollection = async (
    data: ISendCreateCollection
): Promise<AxiosResponse<ICollection>> => {
    return await api.post('/collection', data);
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
    getCollections,
    deleteCollection,
};

export default myUserApi;
