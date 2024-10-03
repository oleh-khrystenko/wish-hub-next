import { AxiosResponse } from 'axios';
import { ICollection } from '@/models/Collection';
import {
    IGetCollections,
    ISendCreateCollection,
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

const myUserApi = {
    createCollection,
    getCollections,
};

export default myUserApi;
