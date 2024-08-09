import { create } from 'zustand';
import { toast } from 'react-toastify';
import { ICandidate, IUser } from '@/models/User';
import { IGoogleAuth, ILogin, IRegistration } from '@/stores/users/types';
import usersApi from '@/stores/users/api';

interface IUsersStore {
    list: IUser[];
    myUser: IUser | null;
    candidate: ICandidate | null;
    isLoading: boolean;
    error: string | null;
    registration: (data: IRegistration) => void;
    googleAuthorization: (data: IGoogleAuth) => void;
    login: (data: ILogin) => void;
    refresh: () => Promise<void>;
}

export const useUsersStore = create<IUsersStore>((set) => ({
    list: [],
    myUser: null,
    candidate: null,
    error: null,
    isLoading: false,
    registration: async (data) => {
        set((state) => ({
            ...state,
            myUser: null,
            error: null,
            isLoading: true,
        }));

        try {
            const response = await usersApi.registration(data);

            set((state) => ({
                ...state,
                myUser: response.data.user,
                error: null,
                isLoading: false,
            }));
        } catch (error) {
            set((state) => ({
                ...state,
                myUser: null,
                error: error instanceof Error ? error.message : 'error',
                isLoading: false,
            }));
        }
    },
    googleAuthorization: async (data) => {
        set((state) => ({
            ...state,
            myUser: null,
            error: null,
            isLoading: true,
        }));

        try {
            const response = await usersApi.googleAuthorization(data);

            set((state) => ({
                ...state,
                myUser: response.data.user,
                error: null,
                isLoading: false,
            }));
        } catch (error) {
            set((state) => ({
                ...state,
                myUser: null,
                error: error instanceof Error ? error.message : 'error',
                isLoading: false,
            }));
        }
    },
    login: async (data) => {
        set((state) => ({
            ...state,
            myUser: null,
            error: null,
            isLoading: true,
        }));

        try {
            const response = await usersApi.login(data);

            set((state) => ({
                ...state,
                myUser: response.data.user,
                error: null,
                isLoading: false,
            }));
        } catch (error) {
            toast('googleErrorT', { type: 'error' });
            set((state) => ({
                ...state,
                myUser: null,
                error: error instanceof Error ? error.message : 'error',
                isLoading: false,
            }));
        }
    },
    refresh: async () => {
        set((state) => ({
            ...state,
            myUser: null,
            error: null,
            isLoading: true,
        }));

        try {
            const response = await usersApi.refresh();

            set((state) => ({
                ...state,
                myUser: response.data.user,
                error: null,
                isLoading: false,
            }));
        } catch (error) {
            set((state) => ({
                ...state,
                myUser: null,
                error: error instanceof Error ? error.message : 'error',
                isLoading: false,
            }));
        }
    },
}));
