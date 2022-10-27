import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../../store/types';

export type AuthState = {
  ethAddress: string;
};

const initialState: AuthState = {
  ethAddress: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEthAddress: (state, { payload }) => {
      state.ethAddress = payload;
    },
  },
});

export const { setEthAddress } = authSlice.actions;
export const selectAuthState = (state: RootState) => state.auth;
export const authReducer = authSlice.reducer;
