import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@store/types';
import { authenticate, signIn } from './auth.actions';

export type AuthState = {
  address: string;
  isAuthenticated: boolean;
  isAuthCompleted: boolean;
  isConnected: boolean;
  isMainnet: boolean;
};

const initialState: AuthState = {
  address: '',
  isAuthenticated: false,
  isAuthCompleted: false,
  isConnected: false,
  isMainnet: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEthAddress: (state, { payload }) => {
      state.address = payload;
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
      state.isAuthenticated = payload;
      state.isAuthCompleted = true;
    });
    builder.addCase(authenticate.rejected, (state) => {
      state.isAuthCompleted = false;
    });
    builder.addCase(signIn.fulfilled, (state) => {
      state.isAuthenticated = true;
    });
    builder.addCase(signIn.rejected, (state) => {
      state.isAuthenticated = false;
    });
  },
});

export const { setEthAddress, setIsConnected, setIsMainnet } = authSlice.actions;

export const selectAuthState = (state: RootState) => state.auth;

export const authReducer = authSlice.reducer;
