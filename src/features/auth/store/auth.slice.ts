import { createSlice } from '@reduxjs/toolkit';
import { authenticate, signin } from './auth.actions';
import type { RootState } from '../../../store/types';

export type AuthState = {
  address: string;
  isAuthenticated: boolean;
  isAuthCompleted: boolean;
  isConnected: boolean;
};

const initialState: AuthState = {
  address: '',
  isAuthenticated: false,
  isAuthCompleted: false,
  isConnected: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAddress: (state, { payload }) => {
      state.address = payload;
    },
    setIsConnected: (state, { payload }) => {
      state.isConnected = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authenticate.pending, (state) => {
      state.isAuthCompleted = false;
    });
    builder.addCase(authenticate.fulfilled, (state, { payload }) => {
      state.isAuthenticated = payload;
      state.isAuthCompleted = true;
    });
    builder.addCase(signin.fulfilled, (state) => {
      state.isAuthenticated = true;
    });
    builder.addCase(signin.rejected, (state) => {
      state.isAuthenticated = false;
    });
  },
});

export const { setAddress, setIsConnected } = authSlice.actions;

export const selectAuthState = (state: RootState) => state.auth;

export const authReducer = authSlice.reducer;
