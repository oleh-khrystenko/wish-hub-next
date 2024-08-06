import { create } from 'zustand';
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
    checkAuth: () => Promise<void>;
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
            console.log('response: ', response);

            set((state) => ({
                ...state,
                myUser: response.data.user,
                error: null,
                isLoading: false,
            }));
        } catch (error) {
            console.log('error: ', error);
            set((state) => ({
                ...state,
                myUser: null,
                error: error instanceof Error ? error.message : 'error',
                isLoading: false,
            }));
        }
    },
    checkAuth: async () => {
        set((state) => ({
            ...state,
            myUser: null,
            error: null,
            isLoading: true,
        }));

        try {
            const response = await usersApi.refresh();
            console.log('checkAuth response: ', response);

            set((state) => ({
                ...state,
                myUser: response.data.user,
                error: null,
                isLoading: false,
            }));
        } catch (error) {
            console.log('checkAuth error: ', error);
            set((state) => ({
                ...state,
                myUser: null,
                error: error instanceof Error ? error.message : 'error',
                isLoading: false,
            }));
        }
    },
}));
