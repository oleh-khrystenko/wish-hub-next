import { create } from 'zustand';
import { toast } from 'react-toastify';
import { IUser } from '@/models/User';
import usersApi from '@/stores/users/api';
import { ISendAllUsersParams, ISendUsersParams } from '@/stores/users/types';
import { USERS_PAGINATION_LIMIT } from '@/helpers/utils/constants';

interface IUsersStore {
    list: IUser[];
    page: number;
    search: string;
    followFromCount: number;
    stopRequests: boolean;
    selectedUserId: IUser['id'] | null;
    profileId: IUser['id'] | null;
    setSearch: (value: string) => void;
    setSelectedUserId: (id: IUser['id'] | null) => void;
    setProfileId: (id: IUser['id'] | null) => void;
    getUsers: (params: ISendUsersParams, errorT: string) => Promise<void>;
    addUsers: (params: ISendUsersParams, errorT: string) => Promise<void>;
    getAllUsers: (params: ISendAllUsersParams, errorT: string) => Promise<void>;
    addAllUsers: (params: ISendAllUsersParams, errorT: string) => Promise<void>;
}

export const useUsersStore = create<IUsersStore>((set) => ({
    list: [],
    page: 1,
    search: '',
    followFromCount: 0,
    stopRequests: false,
    selectedUserId: null,
    profileId: null,
    setSearch: (value) => {
        set((state) => ({
            ...state,
            search: value,
        }));
    },
    setSelectedUserId: (id) => {
        set((state) => ({
            ...state,
            selectedUserId: id,
        }));
    },
    setProfileId: (id) => {
        set((state) => ({
            ...state,
            profileId: id,
        }));
    },
    getUsers: async (params, errorT) => {
        set((state) => ({
            ...state,
            stopRequests: true,
        }));

        try {
            const response = await usersApi.getUsers(params);

            set((state) => ({
                ...state,
                list: response.data.users,
                followFromCount: response.data.followFromCount,
                page: 2,
                stopRequests:
                    response.data.users.length !== USERS_PAGINATION_LIMIT,
            }));
        } catch (error: any) {
            set((state) => ({
                ...state,
                stopRequests: false,
            }));

            toast(error.response?.data?.message || errorT, { type: 'error' });
        }
    },
    addUsers: async (params, errorT) => {
        set((state) => ({
            ...state,
            stopRequests: true,
        }));

        try {
            const response = await usersApi.getUsers(params);

            set((state) => {
                const list = [...state.list, ...response.data.users];
                return {
                    ...state,
                    list,
                    followFromCount: response.data.followFromCount,
                    page: state.page + 1,
                    stopRequests:
                        response.data.users.length !== USERS_PAGINATION_LIMIT,
                };
            });
        } catch (error: any) {
            set((state) => ({
                ...state,
                stopRequests: false,
            }));

            toast(error.response?.data?.message || errorT, { type: 'error' });
        }
    },
    getAllUsers: async (params, errorT) => {
        set((state) => ({
            ...state,
            stopRequests: true,
        }));

        try {
            const response = await usersApi.getAllUsers(params);

            set((state) => {
                return {
                    ...state,
                    list: response.data,
                    page: 2,
                    stopRequests:
                        response.data.length !== USERS_PAGINATION_LIMIT,
                };
            });
        } catch (error: any) {
            set((state) => ({
                ...state,
                stopRequests: false,
            }));

            toast(error.response?.data?.message || errorT, { type: 'error' });
        }
    },
    addAllUsers: async (params, errorT) => {
        set((state) => ({
            ...state,
            stopRequests: true,
        }));

        try {
            const response = await usersApi.getAllUsers(params);

            set((state) => {
                const list = [...state.list, ...response.data];
                return {
                    ...state,
                    list,
                    page: state.page + 1,
                    stopRequests:
                        response.data.length !== USERS_PAGINATION_LIMIT,
                };
            });
        } catch (error: any) {
            set((state) => ({
                ...state,
                stopRequests: false,
            }));

            toast(error.response?.data?.message || errorT, { type: 'error' });
        }
    },
}));
