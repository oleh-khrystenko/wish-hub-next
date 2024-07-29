import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/store/wishes/api';
import {
    ICreateWish,
    IWishWithQuote,
    IUpdateWish,
    IGetWish,
    ISendWish,
    IBookWish,
    IDoneWish,
    IActionWish,
    ISendWishList,
    ISendAllWishes,
    IGetWishList,
} from '@/store/wishes/types';
import { IWish, IWishCandidate } from '@/models/Wish';
import { IUser } from '@/models/User';

export const fetchWishDataFromLink = createAsyncThunk<IWishCandidate, { url: string }>(
    'wishes/fetchWishDataFromLink',
    async (params) => {
        const result = await api.fetchWishDataFromLink(params);

        return result.data;
    },
);

export const createWish = createAsyncThunk<IWishWithQuote, ICreateWish>(
    'wishes/createWish',
    async (data) => {
        const result = await api.createWish(data);

        return result.data;
    },
);

export const updateWish = createAsyncThunk<IWish, IUpdateWish>(
    'wishes/updateWish',
    async (data) => {
        const result = await api.updateWish(data);

        return result.data;
    },
);

export const getWish = createAsyncThunk<IGetWish, ISendWish>(
    'wishes/getWish',
    async (params) => {
        const result = await api.getWish(params);

        return result.data;
    },
);

export const bookWish = createAsyncThunk<IWishWithQuote, IBookWish>(
    'wishes/bookWish',
    async (data) => {
        const result = await api.bookWish(data);

        return result.data;
    },
);

export const cancelBookWish = createAsyncThunk<IWish, IActionWish>(
    'wishes/cancelBookWish',
    async (data) => {
        const result = await api.cancelBookWish(data);

        return result.data;
    },
);

export const doneWish = createAsyncThunk<{ executorUser: IUser, bookedWish: IWish }, IDoneWish>(
    'wishes/doneWish',
    async (data) => {
        const result = await api.doneWish(data);

        return result.data;
    },
);

export const undoneWish = createAsyncThunk<{ executorUser: IUser, bookedWish: IWish }, IActionWish>(
    'wishes/undoneWish',
    async (data) => {
        const result = await api.undoneWish(data);

        return result.data;
    },
);

export const likeWish = createAsyncThunk<IWish, IActionWish>(
    'wishes/likeWish',
    async (data) => {
        const result = await api.likeWish(data);

        return result.data;
    },
);

export const dislikeWish = createAsyncThunk<IWish, IActionWish>(
    'wishes/dislikeWish',
    async (data) => {
        const result = await api.dislikeWish(data);

        return result.data;
    },
);

export const deleteWish = createAsyncThunk<IWish['id'], [ IUser['id'], IWish['id'] ]>(
    'wishes/deleteWish',
    async ([ userId, wishId ]) => {
        const result = await api.deleteWish(userId, wishId);

        return result.data;
    },
);

export const getWishList = createAsyncThunk<IGetWishList, ISendWishList>(
    'wishes/getWishList',
    async (params) => {
        const result = await api.getWishList(params);

        return result.data;
    },
);

// Додавання нових бажань під час infinity scroll
export const addWishList = createAsyncThunk<IGetWishList, ISendWishList>(
    'wishes/addWishList',
    async (params) => {
        const result = await api.getWishList(params);

        return result.data;
    },
);

export const getAllWishes = createAsyncThunk<IWish[], ISendAllWishes>(
    'wishes/getAllWishes',
    async (params) => {
        const result = await api.getAllWishes(params);

        return result.data;
    },
);

// Додавання нових бажань під час infinity scroll
export const addAllWishes = createAsyncThunk<IWish[], ISendAllWishes>(
    'wishes/addAllWishes',
    async (params) => {
        const result = await api.getAllWishes(params);

        return result.data;
    },
);
