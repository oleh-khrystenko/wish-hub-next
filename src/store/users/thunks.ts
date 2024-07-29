import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/store/users/api';
import {
    ISendUsersParams,
    IGetUsers,
    ISendAllUsersParams,
    IRegistration,
    IGoogleAuth,
    ILogin,
    IForgotPassword,
    IChangeForgottenPassword,
    IChangePassword,
    IChangeLang,
    IUserId,
    IUpdateMyUser,
    IAddFriend,
    IRemoveFriend,
    IDeleteMyUser,
} from '@/store/users/types';
import { IAuth, IUser } from "@/models/User";

export const getUsers = createAsyncThunk<IGetUsers, ISendUsersParams>(
    'users/getUsers',
    async (params) => {
        const result = await api.getUsers(params);

        return result.data;
    },
);

// Додавання нових користувачів під час infinity scroll
export const addUsers = createAsyncThunk<IGetUsers, ISendUsersParams>(
    'users/addUsers',
    async (params) => {
        const result = await api.getUsers(params);

        return result.data;
    },
);

export const getAllUsers = createAsyncThunk<IUser[], ISendAllUsersParams>(
    'users/getAllUsers',
    async (params) => {
        const result = await api.getAllUsers(params);

        return result.data;
    },
);

// Додавання нових користувачів під час infinity scroll
export const addAllUsers = createAsyncThunk<IUser[], ISendAllUsersParams>(
    'users/addAllUsers',
    async (params) => {
        const result = await api.getAllUsers(params);

        return result.data;
    },
);

export const registration = createAsyncThunk<IAuth, IRegistration>(
    'myUser/registration',
    async (data) => {
        const result = await api.registration(data);

        return result.data;
    },
);

export const sendActivationLink = createAsyncThunk<IUser['email'], IUser['id']>(
    'myUser/sendActivationLink',
    async (data: IUser['id']) => {
        const result = await api.sendActivationLink(data);

        return result.data;
    },
);

export const googleAuthorization = createAsyncThunk<IAuth, IGoogleAuth>(
    'myUser/googleAuthorization',
    async (data) => {
        const result = await api.googleAuthorization(data);

        return result.data;
    },
);

export const login = createAsyncThunk<IAuth, ILogin>(
    'myUser/login',
    async (data) => {
        const result = await api.login(data);

        return result.data;
    },
);

export const logout = createAsyncThunk<any, void>(
    'myUser/logout',
    async () => {
        return await api.logout();
    },
);

export const checkAuth = createAsyncThunk<IAuth, void>(
    'myUser/checkAuth',
    async () => {
        const result = await api.refresh();

        return result.data;
    },
);

export const forgotPassword = createAsyncThunk<any, IForgotPassword>(
    'myUser/forgotPassword',
    async (data: IForgotPassword) => {
        return await api.forgotPassword(data);
    },
);

export const changeForgottenPassword = createAsyncThunk<any, IChangeForgottenPassword>(
    'myUser/changeForgottenPassword',
    async (data: IChangeForgottenPassword) => {
        return await api.changeForgottenPassword(data);
    },
);

export const changePassword = createAsyncThunk<any, IChangePassword>(
    'myUser/changePassword',
    async (data: IChangePassword) => {
        return await api.changePassword(data);
    },
);

export const changeLang = createAsyncThunk<IUser, IChangeLang>(
    'myUser/changeLang',
    async (data: IChangeLang) => {
        const result = await api.changeLang(data);

        return result.data;
    },
);

export const changeShowedInfo = createAsyncThunk<IUser, IUserId>(
    'myUser/changeShowedInfo',
    async (data: IUserId) => {
        const result = await api.changeShowedInfo(data);

        return result.data;
    },
);

export const changeFirsLoaded = createAsyncThunk<IUser, IUserId>(
    'myUser/changeFirsLoaded',
    async (data: IUserId) => {
        const result = await api.changeFirsLoaded(data);

        return result.data;
    },
);

export const updateMyUser = createAsyncThunk<IUser, IUpdateMyUser>(
    'myUser/updateMyUser',
    async (data: IUpdateMyUser) => {
        const result = await api.updateMyUser(data);

        return result.data;
    },
);

export const addFriend = createAsyncThunk<IUser, IAddFriend>(
    'myUser/addFriend',
    async (data: IAddFriend) => {
        const result = await api.addFriend(data);

        return result.data;
    },
);

export const removeFriend = createAsyncThunk<IUser, IRemoveFriend>(
    'myUser/removeFriend',
    async (data: IRemoveFriend) => {
        const result = await api.removeFriend(data);

        return result.data;
    },
);

export const deleteMyUser = createAsyncThunk<IUser['id'], IDeleteMyUser>(
    'myUser/deleteMyUser',
    async (data: IDeleteMyUser) => {
        const result = await api.deleteMyUser(data);

        return result.data;
    },
);
