import { create } from 'zustand';
import { toast } from 'react-toastify';
import { IUser } from '@/models/User';
import usersApi from '@/stores/users/api';
import {
    ISendAllUsersParams,
    ISendUserParams,
    ISendUsersParams,
} from '@/stores/users/types';
import { useSettingsStore } from '@/stores/settings';
import { USERS_PAGINATION_LIMIT } from '@/helpers/utils/constants';

const { setShowGlobalLoading } = useSettingsStore.getState();

interface IUsersStore {
    list: IUser[];
    user: IUser | null;
    page: number;
    search: string;
    followFromCount: number;
    stopRequests: boolean;
    selectedUserId: IUser['id'] | null;
    setSearch: (value: string) => void;
    setSelectedUserId: (id: IUser['id'] | null) => void;
    getUser: (params: ISendUserParams, errorT: string) => Promise<void>;
    getUsers: (params: ISendUsersParams, errorT: string) => Promise<void>;
    addUsers: (params: ISendUsersParams, errorT: string) => Promise<void>;
    getAllUsers: (params: ISendAllUsersParams, errorT: string) => Promise<void>;
    addAllUsers: (params: ISendAllUsersParams, errorT: string) => Promise<void>;
}

export const useUsersStore = create<IUsersStore>((set) => ({
    list: [],
    user: null,
    page: 1,
    search: '',
    followFromCount: 0,
    stopRequests: false,
    selectedUserId: null,
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
    getUser: async (params, errorT) => {
        setShowGlobalLoading(true);

        try {
            const response = await usersApi.getUser(params);

            set((state) => ({
                ...state,
                user: response.data,
            }));
        } catch (error: any) {
            toast(error.response?.data?.message || errorT, { type: 'error' });
        } finally {
            setShowGlobalLoading(false);
        }
    },
    getUsers: async (params, errorT) => {
        setShowGlobalLoading(true);

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
                // віднімаємо одного користувача,
                // бо на першій сторінці в нас завжди буде приходити на одного більше.
                // це рекламний користувач
                stopRequests:
                    response.data.users.length - 1 !== USERS_PAGINATION_LIMIT,
            }));
        } catch (error: any) {
            set((state) => ({
                ...state,
                stopRequests: false,
            }));

            toast(error.response?.data?.message || errorT, { type: 'error' });
        } finally {
            setShowGlobalLoading(false);
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
                stopRequests: true,
            }));

            toast(error.response?.data?.message || errorT, { type: 'error' });
        }
    },
    getAllUsers: async (params, errorT) => {
        setShowGlobalLoading(true);

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
                    // віднімаємо одного користувача,
                    // бо на першій сторінці в нас завжди буде приходити на одного більше.
                    // це рекламний користувач
                    stopRequests:
                        response.data.length - 1 !== USERS_PAGINATION_LIMIT,
                };
            });
        } catch (error: any) {
            set((state) => ({
                ...state,
                stopRequests: false,
            }));

            toast(error.response?.data?.message || errorT, { type: 'error' });
        } finally {
            setShowGlobalLoading(false);
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
                stopRequests: true,
            }));

            toast(error.response?.data?.message || errorT, { type: 'error' });
        }
    },
}));
