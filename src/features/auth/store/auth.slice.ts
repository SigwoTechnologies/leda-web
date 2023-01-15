import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@store/types';
import ItemImage from '../../../common/types/item-image';
import { Account } from '../../../types/account';
import { History } from '../../../types/history';
import { Item } from '../../../types/item';
import {
  changeAccountInformation,
  changeBackgroundPicture,
  changeProfilePicture,
} from './account.actions';
import { authenticate, signIn } from './auth.actions';

export type AuthState = {
  account: Account;
  isAuthenticated: boolean;
  isAuthCompleted: boolean;
  isConnected: boolean;
  isMainnet: boolean;
  isLoading: boolean;
};

const initialState: AuthState = {
  account: {
    address: '',
    history: [] as History[],
    background: {} as ItemImage,
    picture: {} as ItemImage,
    accountId: '',
    items: [] as Item[],
    createdAt: new Date(),
    updatedAt: new Date(),
    username: '',
  } as Account,
  isAuthenticated: false,
  isAuthCompleted: false,
  isConnected: false,
  isMainnet: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccount: (state, { payload }) => {
      state.account = payload;
    },
    setIsConnected: (state, { payload }) => {
      state.isConnected = payload;
    },
    setIsMainnet: (state, { payload }) => {
      state.isMainnet = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authenticate.pending, (state) => {
      state.isAuthCompleted = false;
    });
    builder.addCase(authenticate.fulfilled, (state, { payload }) => {
      state.isAuthenticated = !!payload?.token;
      if (payload) state.account = payload.account;
      state.isAuthCompleted = true;
    });
    builder.addCase(authenticate.rejected, (state) => {
      state.isAuthCompleted = false;
    });
    // CHANGE ACCOUNT INFORMATION
    builder.addCase(changeAccountInformation.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(changeAccountInformation.fulfilled, (state, { payload }) => {
      state.account = payload;
      state.isLoading = false;
    });
    builder.addCase(changeAccountInformation.rejected, (state) => {
      state.isLoading = false;
    });
    // Change Profile Picture
    builder.addCase(changeProfilePicture.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(changeProfilePicture.fulfilled, (state, { payload }) => {
      state.account = payload;
      state.isLoading = false;
    });
    builder.addCase(changeProfilePicture.rejected, (state) => {
      state.isLoading = false;
    });
    // Change Background Picture
    builder.addCase(changeBackgroundPicture.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(changeBackgroundPicture.fulfilled, (state, { payload }) => {
      state.account = payload;
      state.isLoading = false;
    });
    builder.addCase(changeBackgroundPicture.rejected, (state) => {
      state.isLoading = false;
    });
    // SIGN IN
    builder.addCase(signIn.fulfilled, (state) => {
      state.isAuthenticated = true;
    });
    builder.addCase(signIn.rejected, (state) => {
      state.isAuthenticated = false;
    });
  },
});

export const { setAccount, setIsConnected, setIsMainnet } = authSlice.actions;

export const selectAuthState = (state: RootState) => state.auth;

export const authReducer = authSlice.reducer;
