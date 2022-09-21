import { createSlice } from '@reduxjs/toolkit';

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
export const authReducer = authSlice.reducer;
