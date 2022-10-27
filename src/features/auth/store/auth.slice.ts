import { createSlice } from '@reduxjs/toolkit';
import { authenticate, signin } from './auth.actions';
import type { RootState } from '../../../store/types';

export type AuthState = {
  address: string;
  isAuthenticated: boolean;
  isAuthCompleted: boolean;
};

const initialState: AuthState = {
  address: '',
  isAuthenticated: false,
  isAuthCompleted: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEthAddress: (state, { payload }) => {
      state.address = payload;
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

export const { setEthAddress } = authSlice.actions;

export const selectAuthState = (state: RootState) => state.auth;

export const authReducer = authSlice.reducer;
