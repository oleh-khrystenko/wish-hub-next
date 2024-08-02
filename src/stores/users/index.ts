import {create} from 'zustand';
import { ICandidate, IUser } from "@/models/User";
import { ILogin } from "@/stores/users/types";
import myUserApi from "@/stores/users/api";

interface IUsersStore {
    list: IUser[];
    myUser: IUser | null;
    candidate: ICandidate | null;
    isLoading: boolean;
    error: string | null;
    login: (data: ILogin) => void;
}

export const useUsersStore = create<IUsersStore>(set => ({
    list: [],
    myUser: null,
    candidate: null,
    isLoading: false,
    error: null,
    login: async (data) => {
        // set(state => {
        //     state.isLoading = true;
        //     state.error = null;
        // })

        const response = await myUserApi.login(data);
        console.log('response: ', response);
    },
}));
