import { AxiosResponse } from 'axios';
import api from '@/helpers/utils/api';
import {
    IGetUsers,
    ISendAllUsersParams,
    ISendUserParams,
    ISendUsersParams,
} from '@/stores/users/types';
import { IUser } from '@/models/User';

const getUser = async (
    params: ISendUserParams
): Promise<AxiosResponse<IUser>> => {
    return await api.get('/user', { params });
};

const getUsers = async (
    params: ISendUsersParams
): Promise<AxiosResponse<IGetUsers>> => {
    return await api.get('/users', { params });
};

const getAllUsers = async (
    params: ISendAllUsersParams
): Promise<AxiosResponse<IUser[]>> => {
    return await api.get('/all-users', { params });
};

const usersApi = {
    getUser,
    getUsers,
    getAllUsers,
};

export default usersApi;
