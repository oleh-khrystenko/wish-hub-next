import axios, { AxiosResponse } from 'axios';
import { IReview, ISendReview, ISendReviews } from '@/models/Review';
import api, { baseApi } from '@/helpers/api/settings';

const createReview = async (
    data: ISendReview
): Promise<AxiosResponse<IReview>> => {
    return await api.post('/review', data);
};

const updateReview = async (
    data: ISendReview
): Promise<AxiosResponse<IReview>> => {
    return await api.put('/review', data);
};

const getReviews = async (
    params: ISendReviews
): Promise<AxiosResponse<IReview[]> | null> => {
    try {
        return await baseApi.get('/reviews', { params });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.status === 400) {
                console.error('400 Error: Bad Request', error.response.data);
                return null;
            }
        }

        throw error;
    }
};

const reviewApi = { createReview, getReviews };

export default reviewApi;
