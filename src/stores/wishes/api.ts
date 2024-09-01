import { AxiosResponse } from 'axios';
import api from '@/helpers/utils/api';
import {
    ICreateWish,
    IWishWithQuote,
    IUpdateWish,
    ISendWish,
    IGetWish,
    IBookWish,
    IActionWish,
    IDoneWish,
    ISendWishList,
    ISendAllWishes,
    IGetWishList,
    IDeleteWish,
} from '@/stores/wishes/types';
import { IUser } from '@/models/User';
import { TCurrentImage, IWish, IWishCandidate } from '@/models/Wish';

const processCommonFields = (
    formData: FormData,
    commonFields: { [key: string]: string | boolean }
) => {
    for (const [key, value] of Object.entries(commonFields)) {
        formData.append(key, value.toString());
    }
};

const processImages = (formData: FormData, images: TCurrentImage[]) => {
    if (images && Array.isArray(images)) {
        images.forEach((image, idx) => {
            if (image instanceof File) {
                formData.append(`image-${idx}`, image);
            } else if (image) {
                formData.append(`image-${idx}`, JSON.stringify(image));
            }
        });
    }
};

const addDataToFormData = (
    formData: FormData,
    data: IUpdateWish | ICreateWish
): FormData => {
    const {
        userId,
        material,
        show,
        name,
        price,
        currency,
        addresses,
        description,
        images,
    } = data;
    processCommonFields(formData, { userId, material, show, name });
    price && processCommonFields(formData, { price });
    currency && processCommonFields(formData, { currency });
    addresses &&
        addresses.length > 0 &&
        addresses.forEach((address, idx) => {
            formData.append(`address-${idx}`, JSON.stringify(address));
        });
    description && processCommonFields(formData, { description });
    processImages(formData, images);

    return formData;
};

const fetchWishDataFromLink = async (params: {
    url: string;
}): Promise<AxiosResponse<IWishCandidate>> => {
    return await api.get('/link-wish', { params });
};

const createWish = async (
    data: ICreateWish
): Promise<AxiosResponse<IWishWithQuote>> => {
    const formData = new FormData();

    return await api.post('/wish', addDataToFormData(formData, data), {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

const updateWish = async (data: IUpdateWish): Promise<AxiosResponse<IWish>> => {
    const formData = new FormData();
    formData.append('id', data.id);

    return await api.put('/wish', addDataToFormData(formData, data), {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

const getWish = async (params: ISendWish): Promise<AxiosResponse<IGetWish>> => {
    return await api.get('/wish', { params });
};

const bookWish = async (
    data: IBookWish
): Promise<AxiosResponse<IWishWithQuote>> => {
    return await api.put('/wish/book', data);
};

const cancelBookWish = async (
    data: IActionWish
): Promise<AxiosResponse<IWish>> => {
    return await api.put('/wish/cancel-book', data);
};

const doneWish = async (
    data: IDoneWish
): Promise<AxiosResponse<{ executorUser: IUser; bookedWish: IWish }>> => {
    return await api.put('/wish/done', data);
};

const undoneWish = async (
    data: IActionWish
): Promise<AxiosResponse<{ executorUser: IUser; bookedWish: IWish }>> => {
    return await api.put('/wish/undone', data);
};

const likeWish = async (data: IActionWish): Promise<AxiosResponse<IWish>> => {
    return await api.put('/wish/like', data);
};

const dislikeWish = async (
    data: IActionWish
): Promise<AxiosResponse<IWish>> => {
    return await api.put('/wish/dislike', data);
};

const deleteWish = async (
    params: IDeleteWish
): Promise<AxiosResponse<IWish['id']>> => {
    return await api.delete('/wish', { params });
};

const getWishList = async (
    params: ISendWishList
): Promise<AxiosResponse<IGetWishList>> => {
    return await api.get('/wishes', { params });
};

const getAllWishes = async (
    params: ISendAllWishes
): Promise<AxiosResponse<IWish[]>> => {
    return await api.get('/all-wishes', { params });
};

const wishesApi = {
    fetchWishDataFromLink,
    createWish,
    updateWish,
    getWish,
    bookWish,
    cancelBookWish,
    doneWish,
    undoneWish,
    likeWish,
    dislikeWish,
    deleteWish,
    getWishList,
    getAllWishes,
};

export default wishesApi;
