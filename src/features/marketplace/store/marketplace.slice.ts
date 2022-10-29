import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../../store/types';
import { Item } from '../../../types/item';
import ItemStatus from '../process/enums/item-status.enum';
import { getOwner, listItem } from './marketplace.actions';

export type MarketplaceState = {
  isLoading: boolean;
  owner: string | undefined;
};

const initialState: MarketplaceState = {
  owner: '',
  isLoading: false,
};

const marketplaceSlice = createSlice({
  name: 'marketplace',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listItem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(listItem.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(listItem.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getOwner.fulfilled, (state, { payload }) => {
      state.owner = payload;
    });
  },
});

export const selectOwner = (state: RootState) => state.marketplace.owner;

export const selectCanIList = (state: RootState, item: Item) => {
  const { address } = state.auth;
  return item.owner.address === address && item.status === ItemStatus.NotListed;
};

export const marketplaceReducer = marketplaceSlice.reducer;
