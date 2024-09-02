import axios, { AxiosResponse } from 'axios';
import api from '@/helpers/utils/api';
import {
    IRegistration,
    IGoogleAuth,
    ILogin,
    IForgotPassword,
    IChangeForgottenPassword,
    IChangePassword,
    IChangeLang,
    INotificationSubscribe,
    IUserId,
    IUpdateMyUser,
    IAddFriend,
    IRemoveFriend,
    IDeleteMyUser,
} from '@/stores/my-user/types';
import { IUser, IAuth } from '@/models/User';
import { encryptedData } from '@/helpers/utils/encryption-data';

const registration = async (
    data: IRegistration
): Promise<AxiosResponse<IAuth>> => {
    if (!process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET) {
        return Promise.reject('NEXT_PUBLIC_CRYPTO_JS_SECRET is not defined.');
    }

    const encryptedPassword = encryptedData(
        data.password,
        process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET
    );

    return await api.post('/registration', {
        ...data,
        password: encryptedPassword,
    });
};

const sendActivationLink = async (
    userId: IUser['id']
): Promise<AxiosResponse<IUser['email']>> => {
    return await api.get(`/get-activation-link/${userId}`);
};

const googleAuthorization = async (
    data: IGoogleAuth
): Promise<AxiosResponse<IAuth>> => {
    return await api.post('/google-auth', data);
};

const login = async (data: ILogin): Promise<AxiosResponse<IAuth>> => {
    if (!process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET) {
        return Promise.reject('NEXT_PUBLIC_CRYPTO_JS_SECRET is not defined.');
    }

    const encryptedPassword = encryptedData(
        data.password,
        process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET
    );

    return await api.post('/login', {
        ...data,
        password: encryptedPassword,
    });
};

const logout = async (): Promise<void> => {
    await api.post('/logout');
};

const refresh = async (): Promise<AxiosResponse<IAuth>> => {
    return await axios.get(
        `${
            process.env.NODE_ENV === 'development'
                ? process.env.NEXT_PUBLIC_DEV_API_URL
                : process.env.NEXT_PUBLIC_API_URL
        }/refresh`,
        { withCredentials: true }
    );
};

const forgotPassword = async (data: IForgotPassword): Promise<void> => {
    await api.put('/forgot-password', data);
};

const changeForgottenPassword = async (
    data: IChangeForgottenPassword
): Promise<void> => {
    if (!process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET) {
        return Promise.reject('NEXT_PUBLIC_CRYPTO_JS_SECRET is not defined.');
    }

    const encryptedNewPassword = encryptedData(
        data.newPassword,
        process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET
    );
    await api.put('/change-forgotten-password', {
        ...data,
        newPassword: encryptedNewPassword,
    });
};

const changePassword = async (data: IChangePassword): Promise<void> => {
    if (!process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET) {
        return Promise.reject('NEXT_PUBLIC_CRYPTO_JS_SECRET is not defined.');
    }

    const encryptedOldPassword = encryptedData(
        data.oldPassword,
        process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET
    );
    const encryptedNewPassword = encryptedData(
        data.newPassword,
        process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET
    );
    await api.put('/change-password', {
        ...data,
        oldPassword: encryptedOldPassword,
        newPassword: encryptedNewPassword,
    });
};

const changeLang = async (data: IChangeLang): Promise<AxiosResponse<IUser>> => {
    return await api.put('/lang', data);
};

const notificationSubscribe = async (
    data: INotificationSubscribe
): Promise<AxiosResponse<IUser>> => {
    try {
        return await api.put('/notification-subscribe', data);
    } catch (error: any) {
        // toast(
        //     error.response?.data?.message || t('alerts.my-user-api.notification-subscribe.error'),
        //     { type: 'error' },
        // );
        throw error;
    }
};

const notificationUnsubscribe = async (
    data: IUserId
): Promise<AxiosResponse<IUser>> => {
    try {
        return await api.put('/notification-unsubscribe', data);
    } catch (error: any) {
        // toast(
        //     error.response?.data?.message || t('alerts.my-user-api.notification-unsubscribe.error'),
        //     { type: 'error' },
        // );
        throw error;
    }
};

const changeShowedInfo = async (
    data: IUserId
): Promise<AxiosResponse<IUser>> => {
    return await api.put('/showed-info', data);
};

const changeFirsLoaded = async (
    data: IUserId
): Promise<AxiosResponse<IUser>> => {
    return await api.put('/first-loaded', data);
};

const updateMyUser = async ({
    userId,
    firstName,
    lastName,
    avatar,
    showEmail,
    deliveryAddress,
    showDeliveryAddress,
    birthday,
    showBirthday,
}: IUpdateMyUser): Promise<AxiosResponse<IUser>> => {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('firstName', firstName);
    lastName && formData.append('lastName', lastName);
    formData.append('avatar', avatar);
    formData.append('showEmail', showEmail);
    deliveryAddress && formData.append('deliveryAddress', deliveryAddress);
    showDeliveryAddress &&
        formData.append('showDeliveryAddress', showDeliveryAddress);
    birthday && formData.append('birthday', birthday);
    showBirthday && formData.append('showBirthday', showBirthday);

    return await api.put('/user', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

const addFriend = async (data: IAddFriend): Promise<AxiosResponse<IUser>> => {
    return await api.post('/friend', data);
};

const removeFriend = async (
    data: IRemoveFriend
): Promise<AxiosResponse<IUser>> => {
    return await api.delete('/friend', { data });
};

const deleteMyUser = async (
    data: IDeleteMyUser
): Promise<AxiosResponse<IUser['id']>> => {
    if (!process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET) {
        return Promise.reject('NEXT_PUBLIC_CRYPTO_JS_SECRET is not defined.');
    }

    const encryptedPassword = encryptedData(
        data.password,
        process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET
    );

    return await api.post('/user/delete', {
        ...data,
        password: encryptedPassword,
    });
};

const myUserApi = {
    registration,
    sendActivationLink,
    googleAuthorization,
    login,
    logout,
    refresh,
    forgotPassword,
    changeForgottenPassword,
    changePassword,
    changeLang,
    notificationSubscribe,
    notificationUnsubscribe,
    changeShowedInfo,
    changeFirsLoaded,
    updateMyUser,
    addFriend,
    removeFriend,
    deleteMyUser,
};

export default myUserApi;
