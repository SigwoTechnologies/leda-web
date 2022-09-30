import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../../store/types';
import getNftList from '../../marketplace/store/marketplace.actions';

type State = {
  nfts: string | null;
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    nfts: '',
  } as State,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNftList.fulfilled, (state, { payload }) => {
      state.nfts = payload;
    });
  },
});

export const selectState = (state: RootState) => state.wallet;
export const walletReducer = walletSlice.reducer;
