import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../../store/types';
import signin from './auth.actions';

export type AuthState = {
  ethAddress: string;
  isMetamaskConnecting: boolean;
  token: string; // TODO: Testing, remove it
};

const initialState: AuthState = {
  ethAddress: '',
  isMetamaskConnecting: false,
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEthAddress: (state, { payload }) => {
      state.ethAddress = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signin.pending, (state) => {
      state.isMetamaskConnecting = true;
    });
    builder.addCase(signin.fulfilled, (state, { payload }) => {
      state.token = payload;
      state.isMetamaskConnecting = false;
    });
    builder.addCase(signin.rejected, (state) => {
      state.isMetamaskConnecting = false;
    });
  },
});

export const { setEthAddress } = authSlice.actions;

export const selectAuthState = (state: RootState) => state.auth;

export const authReducer = authSlice.reducer;
