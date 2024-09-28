import { AxiosResponse } from 'axios';
import { ICollection } from '@/models/Collection';
import { ICreateCollection, IGetCollection } from '@/stores/collection/types';
import { IUserId } from '@/stores/my-user/types';
import api from '@/helpers/utils/api';

const createCollection = async (
    data: ICreateCollection
): Promise<AxiosResponse<ICollection>> => {
    return await api.post('/collection', data);
};

// const getCollection = async (
//     params: IGetCollection
// ): Promise<AxiosResponse<ICollection>> => {
//     return await api.get('/collection', { params });
// };

const getCollections = async (
    params: IUserId
): Promise<AxiosResponse<ICollection[]>> => {
    return await api.get('/collections', { params });
};

const myUserApi = {
    createCollection,
    // getCollection,
    getCollections,
};

export default myUserApi;
