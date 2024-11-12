import axios, { AxiosResponse } from 'axios';
import { IArticle, ISendArticle, ISendArticles } from '@/models/Article';
import { baseApi } from '@/helpers/api/settings';

const getArticle = async (
    params: ISendArticle
): Promise<AxiosResponse<IArticle> | null> => {
    try {
        return await baseApi.get('/article', { params });
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

const getArticles = async (
    params: ISendArticles
): Promise<AxiosResponse<IArticle[]> | null> => {
    try {
        return await baseApi.get('/articles', { params });
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

const articleApi = { getArticle, getArticles };

export default articleApi;
