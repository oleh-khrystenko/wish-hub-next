import { create } from 'zustand';
import { toast } from 'react-toastify';
import { IUser } from '@/models/User';
import usersApi from '@/stores/users/api';
import { ISendUsersParams } from '@/stores/users/types';
import { USERS_PAGINATION_LIMIT } from '@/helpers/utils/constants';

interface IUsersStore {
    list: IUser[];
    search: string;
    followFromCount: number;
    page: number;
    stopRequests: boolean;
    isLoading: boolean;
    error: string | null;
    getUsers: (params: ISendUsersParams) => Promise<void>;
}

export const useUsersStore = create<IUsersStore>((set) => ({
    list: [],
    search: '',
    followFromCount: 0,
    page: 1,
    stopRequests: false,
    isLoading: false,
    error: null,
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
}));
