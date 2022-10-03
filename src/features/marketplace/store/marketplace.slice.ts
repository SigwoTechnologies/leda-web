import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../../store/types';
import getOwner from './marketplace.actions';

export type MarketplaceState = {
  owner: string | undefined;
};

const initialState: MarketplaceState = {
  owner: '',
};

const marketplaceSlice = createSlice({
  name: 'marketplace',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOwner.fulfilled, (state, { payload }) => {
      state.owner = payload;
    });
  },
});

export const selectOwner = (state: RootState) => state.marketplace.owner;
export const marketplaceReducer = marketplaceSlice.reducer;
