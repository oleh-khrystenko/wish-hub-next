import { AxiosResponse } from 'axios';
import {
    IReview,
    IReviews,
    ICreateReview,
    ISendReviews,
    IReviewId,
} from '@/models/Review';
import api from '@/helpers/api/settings';

const createReview = async (
    data: ICreateReview
): Promise<AxiosResponse<IReview>> => {
    return await api.post('/review', data);
};

const updateReview = async (
    data: IReviewId & ICreateReview
): Promise<AxiosResponse<IReview>> => {
    return await api.put('/review', data);
};

const deleteReview = async (
    params: IReviewId
): Promise<AxiosResponse<IReview['averageRating']>> => {
    return await api.delete('/review', { params });
};

const getReviews = async (
    params: ISendReviews
): Promise<AxiosResponse<IReviews>> => {
    return await api.get('/reviews', { params });
};

const reviewApi = { createReview, updateReview, deleteReview, getReviews };

export default reviewApi;
