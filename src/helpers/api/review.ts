import { AxiosResponse } from 'axios';
import { IReview, IReviews, ISendReview, ISendReviews } from '@/models/Review';
import api from '@/helpers/api/settings';

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
): Promise<AxiosResponse<IReviews>> => {
    return await api.get('/reviews', { params });
};

const reviewApi = { createReview, updateReview, getReviews };

export default reviewApi;
