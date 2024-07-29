import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { t } from 'i18next';
import { getUsers, addUsers, getAllUsers, addAllUsers } from '@/store/users/thunks';
import { doneWish, undoneWish } from '@/store/wishes/thunks';
import { IUser, ICandidate } from '@/models/User';
import { USERS_PAGINATION_LIMIT } from '@/helpers/utils/constants';
import {
    addFriend,
    changeFirsLoaded,
    changeLang,
    changePassword,
    changeShowedInfo,
    checkAuth,
    deleteMyUser,
    googleAuthorization,
    login,
    logout,
    registration,
    removeFriend,
    updateMyUser
} from "@/store/users/thunks";

interface IUsersState {
    list: IUser[];
    candidate: ICandidate | null;
    myUser: IUser | null;
    selectedUserId: IUser['id'] | null;
    search: string;
    followFromCount: number;
    page: number;
    stopRequests: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialState: IUsersState = {
    list: [],
    candidate: null,
    myUser: null,
    selectedUserId: null,
    search: '',
    followFromCount: 0,
    page: 1,
    stopRequests: false,
    isLoading: false,
    error: null,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setCandidate(state, action: PayloadAction<Partial<ICandidate>>) {
            state.candidate = action.payload;
        },
        selectUserId(state, action: PayloadAction<Partial<IUser['id'] | null>>) {
            state.selectedUserId = action.payload;
        },
        setUsersSearch(state, action: PayloadAction<Partial<string>>) {
            state.search = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // getUsers
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true;
                state.stopRequests = true;
                state.error = null;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.stopRequests = false;
                state.error = action.error.message || t('alerts.users-api.get-users.error', { type: 'slice.getUsers' });
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.list = action.payload.users;
                state.followFromCount = action.payload.followFromCount;
                state.page = 2;
                action.payload.users.length === USERS_PAGINATION_LIMIT && (state.stopRequests = false);
                state.isLoading = false;
                state.error = null;
            })
            // addUsers
            .addCase(addUsers.pending, (state) => {
                state.isLoading = true;
                state.stopRequests = true;
                state.error = null;
            })
            .addCase(addUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.stopRequests = false;
                state.error = action.error.message || t('alerts.users-api.get-users.error', { type: 'slice.addUsers' });
            })
            .addCase(addUsers.fulfilled, (state, action) => {
                state.list.push(...action.payload.users);
                state.followFromCount = action.payload.followFromCount;
                state.page += 1;
                action.payload.users.length === USERS_PAGINATION_LIMIT && (state.stopRequests = false);
                state.isLoading = false;
                state.error = null;
            })
            // getAllUsers
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true;
                state.stopRequests = true;
                state.error = null;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.stopRequests = false;
                state.error = action.error.message || t('alerts.users-api.get-all-users.error', { type: 'slice.getAllUsers' });
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.list = action.payload;
                state.page = 2;
                action.payload.length === USERS_PAGINATION_LIMIT && (state.stopRequests = false);
                state.isLoading = false;
                state.error = null;
            })
            // addAllUsers
            .addCase(addAllUsers.pending, (state) => {
                state.isLoading = true;
                state.stopRequests = true;
                state.error = null;
            })
            .addCase(addAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.stopRequests = false;
                state.error = action.error.message || t('alerts.users-api.get-users.error', { type: 'slice.addUsers' });
            })
            .addCase(addAllUsers.fulfilled, (state, action) => {
                state.list.push(...action.payload);
                state.page += 1;
                action.payload.length === USERS_PAGINATION_LIMIT && (state.stopRequests = false);
                state.isLoading = false;
                state.error = null;
            })
            // registration
            .addCase(registration.pending, (state) => {
                state.myUser = null;
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registration.rejected, (state, action) => {
                state.myUser = null;
                state.isLoading = false;
                state.error = action.error.message || t('alerts.my-user-api.registration.error', { type: 'slice' });
            })
            .addCase(registration.fulfilled, (state, action) => {
                state.myUser = action.payload.user;
                state.isLoading = false;
                state.error = null;
            })
            // googleAuthorization
            .addCase(googleAuthorization.pending, (state) => {
                state.myUser = null;
                state.isLoading = true;
                state.error = null;
            })
            .addCase(googleAuthorization.rejected, (state, action) => {
                state.myUser = null;
                state.isLoading = false;
                state.error = action.error.message || t('alerts.my-user-api.google-authorization.error', { type: 'slice' });
            })
            .addCase(googleAuthorization.fulfilled, (state, action) => {
                state.myUser = action.payload.user;
                state.isLoading = false;
                state.error = null;
            })
            // login
            .addCase(login.pending, (state) => {
                state.myUser = null;
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.myUser = null;
                state.isLoading = false;
                state.error = action.error.message || t('alerts.my-user-api.login.error', { type: 'slice' });
            })
            .addCase(login.fulfilled, (state, action) => {
                state.myUser = action.payload.user;
                state.isLoading = false;
                state.error = null;
            })
            // logout
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || t('alerts.my-user-api.logout.error', { type: 'slice' });
            })
            .addCase(logout.fulfilled, (state) => {
                state.myUser = null;
                state.isLoading = false;
                state.error = null;
            })
            // checkAuth
            .addCase(checkAuth.pending, (state) => {
                state.myUser = null;
                state.isLoading = true;
                state.error = null;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.myUser = null;
                state.isLoading = false;
                state.error = action.error.message || t('alerts.my-user-api.refresh.error', { type: 'slice' });
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.myUser = action.payload.user;
                state.isLoading = false;
                state.error = null;
            })
            // changePassword
            .addCase(changePassword.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || t('alerts.my-user-api.change-password.error', { type: 'slice' });
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.myUser = null;
                state.isLoading = false;
                state.error = null;
            })
            // changeLang
            .addCase(changeLang.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(changeLang.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || t('alerts.my-user-api.change-lang.error', { type: 'slice' });
            })
            .addCase(changeLang.fulfilled, (state, action) => {
                state.myUser = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            // changeShowedInfo
            .addCase(changeShowedInfo.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(changeShowedInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || t('alerts.my-user-api.update-data.error', { type: 'slice' });
            })
            .addCase(changeShowedInfo.fulfilled, (state, action) => {
                state.myUser = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            // changeFirsLoaded
            .addCase(changeFirsLoaded.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(changeFirsLoaded.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || t('alerts.my-user-api.update-data.error', { type: 'slice' });
            })
            .addCase(changeFirsLoaded.fulfilled, (state, action) => {
                state.myUser = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            // updateMyUser
            .addCase(updateMyUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateMyUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || t('alerts.my-user-api.update-my-user.error', { type: 'slice' });
            })
            .addCase(updateMyUser.fulfilled, (state, action) => {
                state.myUser = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            // addFriend
            .addCase(addFriend.pending, (state) => {
                state.error = null;
            })
            .addCase(addFriend.rejected, (state, action) => {
                state.error = action.error.message || t('alerts.my-user-api.add-friend.error', { type: 'slice' });
            })
            .addCase(addFriend.fulfilled, (state, action) => {
                state.myUser = action.payload;
                state.error = null;
            })
            // removeFriend
            .addCase(removeFriend.pending, (state) => {
                state.error = null;
            })
            .addCase(removeFriend.rejected, (state, action) => {
                state.error = action.error.message || t('alerts.my-user-api.remove-friend.error', { type: 'slice' });
            })
            .addCase(removeFriend.fulfilled, (state, action) => {
                state.myUser = action.payload;
                state.error = null;
            })
            // deleteMyUser
            .addCase(deleteMyUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteMyUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || t('alerts.my-user-api.delete-my-user.error', { type: 'slice' });
            })
            .addCase(deleteMyUser.fulfilled, (state, action) => {
                if (state.myUser?.id === action.payload) {
                    state.myUser = null;
                    state.error = null;
                } else {
                    state.error = t('alerts.my-user-api.delete-my-user.error', { type: 'slice' });
                }
                state.isLoading = false;
            })
            // doneWish
            .addCase(doneWish.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(doneWish.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || t('alerts.wishes-api.done-wish.error', { type: 'myUser.slice' });
            })
            .addCase(doneWish.fulfilled, (state, action) => {
                const { executorUser } = action.payload;

                if (state.myUser?.id === executorUser.id) {
                    state.myUser = executorUser;
                }
                state.isLoading = false;
                state.error = null;
            })
            // undoneWish
            .addCase(undoneWish.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(undoneWish.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || t('alerts.wishes-api.undone-wish.error', { type: 'myUser.slice' });
            })
            .addCase(undoneWish.fulfilled, (state, action) => {
                const { executorUser } = action.payload;

                if (state.myUser?.id === executorUser.id) {
                    state.myUser = executorUser;
                }
                state.isLoading = false;
                state.error = null;
            })
            // doneWish
            .addCase(doneWish.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(doneWish.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || t('alerts.wishes-api.done-wish.error', { type: 'users.slice' });
            })
            .addCase(doneWish.fulfilled, (state, action) => {
                // Змінити користувача та покласти його там де був
                const { executorUser } = action.payload;

                const index = state.list.findIndex(user => user.id === executorUser.id);

                if (index !== -1) {
                    state.list[index] = executorUser;
                }
                state.isLoading = false;
                state.error = null;
            })
            // undoneWish
            .addCase(undoneWish.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(undoneWish.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || t('alerts.wishes-api.undone-wish.error', { type: 'users.slice' });
            })
            .addCase(undoneWish.fulfilled, (state, action) => {
                // Змінити користувача та покласти його там де був
                const { executorUser } = action.payload;

                const index = state.list.findIndex(user => user.id === executorUser.id);

                if (index !== -1) {
                    state.list[index] = executorUser;
                }
                state.isLoading = false;
                state.error = null;
            });
    },
});

export const { setCandidate, selectUserId, setUsersSearch } = usersSlice.actions;

export default usersSlice.reducer;