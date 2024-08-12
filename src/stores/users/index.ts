import { create } from 'zustand';
import { toast } from 'react-toastify';
import { IUser } from '@/models/User';
import usersApi from '@/stores/users/api';
import { ISendAllUsersParams, ISendUsersParams } from '@/stores/users/types';
import { USERS_PAGINATION_LIMIT } from '@/helpers/utils/constants';

interface IUsersStore {
    list: IUser[];
    search: string;
    followFromCount: number;
    page: number;
    stopRequests: boolean;
    isLoading: boolean;
    error: string | null;
    setSearch: (value: string) => void;
    getUsers: (params: ISendUsersParams) => Promise<void>;
    addUsers: (params: ISendUsersParams) => Promise<void>;
    getAllUsers: (params: ISendAllUsersParams) => Promise<void>;
    addAllUsers: (params: ISendAllUsersParams) => Promise<void>;
}

export const useUsersStore = create<IUsersStore>((set) => ({
    list: [],
    search: '',
    followFromCount: 0,
    page: 1,
    stopRequests: false,
    isLoading: false,
    error: null,
    setSearch: (value) => set({ search: value }),
    getUsers: async (params) => {
        set({ isLoading: true, stopRequests: true, error: null });

        try {
            const response = await usersApi.getUsers(params);

            set((state) => ({
                ...state,
                list: response.data.users,
                followFromCount: response.data.followFromCount,
                page: 2,
                stopRequests:
                    response.data.users.length !== USERS_PAGINATION_LIMIT,
                isLoading: false,
                error: null,
            }));
        } catch (error: any) {
            set({
                isLoading: false,
                stopRequests: false,
                error:
                    error.response?.data?.message ||
                    toast.error('An error occurred'),
            });
        }
    },
    addUsers: async (params) => {
        set({ isLoading: true, stopRequests: true, error: null });

        try {
            const response = await usersApi.getUsers(params);

            set((state) => {
                const list = [...state.list, ...response.data.users];
                // const list = state.list.push(...response.data.users);
                return {
                    ...state,
                    list,
                    followFromCount: response.data.followFromCount,
                    page: state.page + 1,
                    stopRequests:
                        response.data.users.length !== USERS_PAGINATION_LIMIT,
                    isLoading: false,
                    error: null,
                };
            });
        } catch (error: any) {
            set({
                isLoading: false,
                stopRequests: false,
                error:
                    error.response?.data?.message ||
                    toast.error('An error occurred'),
            });
        }
    },
    getAllUsers: async (params) => {
        set({ isLoading: true, stopRequests: true, error: null });

        try {
            const response = await usersApi.getAllUsers(params);

            set((state) => {
                return {
                    ...state,
                    list: response.data,
                    page: 2,
                    stopRequests:
                        response.data.length !== USERS_PAGINATION_LIMIT,
                    isLoading: false,
                    error: null,
                };
            });
        } catch (error: any) {
            set({
                isLoading: false,
                stopRequests: false,
                error:
                    error.response?.data?.message ||
                    toast.error('An error occurred'),
            });
        }
    },
    addAllUsers: async (params) => {
        set({ isLoading: true, stopRequests: true, error: null });

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
                    isLoading: false,
                    error: null,
                };
            });
        } catch (error: any) {
            set({
                isLoading: false,
                stopRequests: false,
                error:
                    error.response?.data?.message ||
                    toast.error('An error occurred'),
            });
        }
    },
}));
