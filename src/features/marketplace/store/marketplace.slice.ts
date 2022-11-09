import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../../store/types';
import { History } from '../../../types/history';
import { Item } from '../../../types/item';
import ItemStatus from '../process/enums/item-status.enum';
import { findAllHistory, findHistoryByItemId, getOwner, listItem } from './marketplace.actions';

export type MarketplaceState = {
  isLoading: boolean;
  owner: string | undefined;
  selectedItem: Item;
  history: History[];
};

const initialState: MarketplaceState = {
  owner: '',
  isLoading: false,
  selectedItem: {} as Item,
  history: [],
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
    builder.addCase(findHistoryByItemId.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(findHistoryByItemId.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.selectedItem.history = payload;
    });
    builder.addCase(findAllHistory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(findAllHistory.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.history = payload;
    });
  },
});

export const selectOwner = (state: RootState) => state.marketplace.owner;

export const selectCanIList = (state: RootState, item: Item) => {
  const { address } = state.auth;
  return item.owner.address === address && item.status === ItemStatus.NotListed;
};
export const selectCanIDelist = (state: RootState, item: Item) => {
  const { address } = state.auth;
  return item.owner.address === address && item.status === ItemStatus.Listed;
};

export const marketplaceReducer = marketplaceSlice.reducer;
