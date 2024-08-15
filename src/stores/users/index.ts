import { create } from 'zustand';
import { toast } from 'react-toastify';
import { IUser } from '@/models/User';
import usersApi from '@/stores/users/api';
import { ISendAllUsersParams, ISendUsersParams } from '@/stores/users/types';
import { USERS_PAGINATION_LIMIT } from '@/helpers/utils/constants';

interface IUsersStore {
    list: IUser[];
    selectUserId: IUser['id'] | null;
    search: string;
    followFromCount: number;
    page: number;
    stopRequests: boolean;
    isLoading: boolean;
    setSelectUserId: (id: IUser['id']) => void;
    setSearch: (value: string) => void;
    getUsers: (params: ISendUsersParams, errorT: string) => Promise<void>;
    addUsers: (params: ISendUsersParams, errorT: string) => Promise<void>;
    getAllUsers: (params: ISendAllUsersParams, errorT: string) => Promise<void>;
    addAllUsers: (params: ISendAllUsersParams, errorT: string) => Promise<void>;
}

export const useUsersStore = create<IUsersStore>((set) => ({
    list: [],
    selectUserId: null,
    search: '',
    followFromCount: 0,
    page: 1,
    stopRequests: false,
    isLoading: false,
    setSelectUserId: (id) => set({ selectUserId: id }),
    setSearch: (value) => set({ search: value }),
    getUsers: async (params, errorT) => {
        set((state) => ({
            ...state,
            stopRequests: true,
            isLoading: true,
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
        } finally {
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    addUsers: async (params, errorT) => {
        set((state) => ({
            ...state,
            stopRequests: true,
            isLoading: true,
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
        } finally {
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    getAllUsers: async (params, errorT) => {
        set((state) => ({
            ...state,
            stopRequests: true,
            isLoading: true,
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
        } finally {
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    addAllUsers: async (params, errorT) => {
        set((state) => ({
            ...state,
            stopRequests: true,
            isLoading: true,
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
        } finally {
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
}));
