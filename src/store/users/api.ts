import axios, { AxiosResponse } from 'axios';
import { t } from 'i18next';
// import { toast } from 'react-toastify';
import api from '@/helpers/utils/api';
import {
    IGetUsers,
    ISendAllUsersParams,
    ISendUsersParams,
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
} from '@/store/users/types';
import { IAuth, IUser } from "@/models/User";
import { encryptedData } from '@/helpers/utils/encryption-data';

const getUsers = async (params: ISendUsersParams): Promise<AxiosResponse<IGetUsers>> => {
    try {
        return await api.get('/users', { params });
    } catch (error: any) {
        // toast(error.response?.data?.message || t('alerts.users-api.get-users.error', { type: 'api.getUsers' }), { type: 'error' })
        throw error;
    }
}

const getAllUsers = async (params: ISendAllUsersParams): Promise<AxiosResponse<IUser[]>> => {
    try {
        return await api.get('/all-users', { params });
    } catch (error: any) {
        // toast(error.response?.data?.message || t('alerts.users-api.get-all-users.error', { type: 'api.getAllUsers' }), { type: 'error' })
        throw error;
    }
}

const registration = async (data: IRegistration): Promise<AxiosResponse<IAuth>> => {
    try {
        if (!process.env.REACT_APP_CRYPTO_JS_SECRET) {
            return Promise.reject('REACT_APP_CRYPTO_JS_SECRET is not defined.');
        }

        const encryptedPassword = encryptedData(data.password, process.env.REACT_APP_CRYPTO_JS_SECRET);
        const response = await api.post('/registration', { ...data, password: encryptedPassword });
        localStorage.setItem('token', response.data.accessToken);
        return response;
    } catch (error: any) {
        // toast(
        //     error.response?.data?.message || t('alerts.my-user-api.registration.error', { type: 'api' }),
        //     { type: 'error' },
        // );
        throw error;
    }
};

const sendActivationLink = async (userId: IUser['id']): Promise<AxiosResponse<IUser['email']>> => {
    try {
        return await api.get(`/get-activation-link/${ userId }`);
    } catch (error: any) {
        // toast(
        //     error.response?.data?.message || t('alerts.my-user-api.send-activation-link.error', { type: 'api' }),
        //     { type: 'error' },
        // )
        throw error;
    }
};

const googleAuthorization = async (data: IGoogleAuth): Promise<AxiosResponse<IAuth>> => {
    try {
        const response = await api.post('/google-auth', data);
        localStorage.setItem('token', response.data.accessToken);
        return response;
    } catch (error: any) {
        // toast(
        //     error.response?.data?.message || t('alerts.my-user-api.google-authorization.error', { type: 'api' }),
        //     { type: 'error' },
        // );
        throw error;
    }
};

const login = async (data: ILogin): Promise<AxiosResponse<IAuth>> => {
    try {
        if (!process.env.REACT_APP_CRYPTO_JS_SECRET) {
            return Promise.reject('REACT_APP_CRYPTO_JS_SECRET is not defined.');
        }

        const encryptedPassword = encryptedData(data.password, process.env.REACT_APP_CRYPTO_JS_SECRET);
        const response = await api.post('/login', { ...data, password: encryptedPassword });
        localStorage.setItem('token', response.data.accessToken);
        return response;
    } catch (error: any) {
        // toast(
        //     error.response?.data?.message || t('alerts.my-user-api.login.error', { type: 'api' }),
        //     { type: 'error' },
        // );
        throw error;
    }
};

const logout = async (): Promise<void> => {
    try {
        await api.post('/logout');
        localStorage.removeItem('token');
        localStorage.removeItem('selectedUserId');
    } catch (error: any) {
        // toast(
        //     error.response?.data?.message || t('alerts.my-user-api.logout.error', { type: 'api' }),
        //     { type: 'error' },
        // );
        throw error;
    }
};

const refresh = async (): Promise<AxiosResponse<IAuth>> => {
    try {
        const response = await axios.get(
            `${
                process.env.NODE_ENV === 'development'
                    ? process.env.REACT_APP_DEV_API_URL
                    : process.env.REACT_APP_API_URL
            }/refresh`,
            { withCredentials: true },
        );
        localStorage.setItem('token', response.data.accessToken);
        return response;
    } catch (error: any) {
        console.log('my-user refresh error: ', error.response?.data?.message || t('alerts.my-user-api.refresh.error', { type: 'api' }));
        localStorage.removeItem('token');
        localStorage.removeItem('selectedUserId');
        throw error;
    }
};

const forgotPassword = async (data: IForgotPassword): Promise<void> => {
    try {
        await api.put('/forgot-password', data);
        // toast(
        //     t('alerts.my-user-api.forgot-password.success', { type: 'api', email: data.email }),
        //     { type: 'success' },
        // );
    } catch (error: any) {
        // toast(
        //     error.response?.data?.message || t('alerts.my-user-api.forgot-password.error', {
        //         type: 'api',
        //         email: data.email
        //     }),
        //     { type: 'error' },
        // );
        throw error;
    }
};

const changeForgottenPassword = async (data: IChangeForgottenPassword): Promise<void> => {
    try {
        if (!process.env.REACT_APP_CRYPTO_JS_SECRET) {
            return Promise.reject('REACT_APP_CRYPTO_JS_SECRET is not defined.');
        }

        const encryptedNewPassword = encryptedData(data.newPassword, process.env.REACT_APP_CRYPTO_JS_SECRET);
        await api.put('/change-forgotten-password', { ...data, newPassword: encryptedNewPassword });
        // toast(
        //     t('alerts.my-user-api.change-forgotten-password.success', { type: 'api' }),
        //     { type: 'success' },
        // );
    } catch (error: any) {
        // toast(
        //     error.response?.data?.message || t('alerts.my-user-api.change-forgotten-password.error', { type: 'api' }),
        //     { type: 'error' },
        // );
        throw error;
    }
};

const changePassword = async (data: IChangePassword): Promise<void> => {
    try {
        if (!process.env.REACT_APP_CRYPTO_JS_SECRET) {
            return Promise.reject('REACT_APP_CRYPTO_JS_SECRET is not defined.');
        }

        const encryptedOldPassword = encryptedData(data.oldPassword, process.env.REACT_APP_CRYPTO_JS_SECRET);
        const encryptedNewPassword = encryptedData(data.newPassword, process.env.REACT_APP_CRYPTO_JS_SECRET);
        await api.put('/change-password', {
            ...data,
            oldPassword: encryptedOldPassword,
            newPassword: encryptedNewPassword,
        });
        localStorage.removeItem('token');
        // toast(
        //     t('alerts.my-user-api.change-password.success', { type: 'api' }),
        //     { type: 'success' },
        // );
    } catch (error: any) {
        // toast(
        //     error.response?.data?.message || t('alerts.my-user-api.change-password.error', { type: 'api' }),
        //     { type: 'error' },
        // );
        throw error;
    }
};

const changeLang = async (data: IChangeLang): Promise<AxiosResponse<IUser>> => {
    try {
        return await api.put('/lang', data);
    } catch (error: any) {
        // toast(
        //     error.response?.data?.message || t('alerts.my-user-api.change-lang.error', { type: 'api' }),
        //     { type: 'error' },
        // );
        throw error;
    }
};

const notificationSubscribe = async (data: INotificationSubscribe): Promise<AxiosResponse<IUser>> => {
    try {
        return await api.put('/notification-subscribe', data);
    } catch (error: any) {
        // toast(
        //     error.response?.data?.message || t('alerts.my-user-api.notification-subscribe.error', { type: 'api' }),
        //     { type: 'error' },
        // );
        throw error;
    }
};

const notificationUnsubscribe = async (data: IUserId): Promise<AxiosResponse<IUser>> => {
    try {
        return await api.put('/notification-unsubscribe', data);
    } catch (error: any) {
        // toast(
        //     error.response?.data?.message || t('alerts.my-user-api.notification-unsubscribe.error', { type: 'api' }),
        //     { type: 'error' },
        // );
        throw error;
    }
};

const changeShowedInfo = async (data: IUserId): Promise<AxiosResponse<IUser>> => {
    try {
        return await api.put('/showed-info', data);
    } catch (error: any) {
        console.log('my-user changeShowedInfo error: ', error.response?.data?.message || t('alerts.my-user-api.update-data.error', { type: 'api' }));
        throw error;
    }
};

const changeFirsLoaded = async (data: IUserId): Promise<AxiosResponse<IUser>> => {
    try {
        return await api.put('/first-loaded', data);
    } catch (error: any) {
        console.log('my-user changeFirsLoaded error: ', error.response?.data?.message || t('alerts.my-user-api.update-data.error', { type: 'api' }));
        throw error;
    }
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
    showDeliveryAddress && formData.append('showDeliveryAddress', showDeliveryAddress);
    birthday && formData.append('birthday', birthday);
    showBirthday && formData.append('showBirthday', showBirthday);

    try {
        return await api.put(
            '/user',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        );
    } catch (error: any) {
        // toast(
        //     error.response?.data?.message || t('alerts.my-user-api.update-my-user.error', { type: 'api' }),
        //     { type: 'error' },
        // );
        throw error;
    }
};

const addFriend = async (data: IAddFriend): Promise<AxiosResponse<IUser>> => {
    try {
        return await api.post('/friend', data);
    } catch (error: any) {
        // toast(
        //     error.response?.data?.message || t('alerts.my-user-api.add-friend.error', { type: 'api' }),
        //     { type: 'error' },
        // );
        throw error;
    }
};

const removeFriend = async (data: IRemoveFriend): Promise<AxiosResponse<IUser>> => {
    try {
        return await api.delete('/friend', { data });
    } catch (error: any) {
        // toast(
        //     error.response?.data?.message || t('alerts.my-user-api.remove-friend.error', { type: 'api' }),
        //     { type: 'error' },
        // );
        throw error;
    }
};

const deleteMyUser = async (data: IDeleteMyUser): Promise<AxiosResponse<IUser['id']>> => {
    try {
        if (!process.env.REACT_APP_CRYPTO_JS_SECRET) {
            return Promise.reject('REACT_APP_CRYPTO_JS_SECRET is not defined.');
        }

        const encryptedPassword = encryptedData(data.password, process.env.REACT_APP_CRYPTO_JS_SECRET);
        const response = await api.post('/user/delete', { ...data, password: encryptedPassword });
        localStorage.removeItem('token');
        localStorage.removeItem('selectedUserId');
        return response;
    } catch (error: any) {
        // toast(
        //     error.response?.data?.message || t('alerts.my-user-api.delete-my-user.error', { type: 'api' }),
        //     { type: 'error' },
        // );
        throw error;
    }
};

const usersApi = {
    getUsers,
    getAllUsers,
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

export default usersApi;
