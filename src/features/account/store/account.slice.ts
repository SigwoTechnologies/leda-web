import { createSelector, createSlice } from '@reduxjs/toolkit';
import { Item } from '@types';
import ItemStatus from '../../../common/minting/enums/item-status.enum';
import type { RootState } from '../../../store/types';
import findItemsByAccount from './account.actions';

type LedaNftState = {
  items: Item[];
  isLoading: boolean;
};

const initialState: LedaNftState = {
  items: [],
  isLoading: false,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(findItemsByAccount.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(findItemsByAccount.fulfilled, (state, { payload }) => {
      state.items = payload;
    });
  },
});

export const selectAccountState = (state: RootState) => state.account;

export const selectItems = createSelector(
  (state: RootState) => state.account.items,
  (items: Item[]) => items
);

export const selectCreatedItems = createSelector(
  selectItems,
  (_: unknown, address: string) => address,
  (items: Item[], address: string) => items.filter((item) => item.author.address === address)
);

export const selectLikedItems = (state: RootState) => [];

export const selectOnSaleItems = createSelector(
  selectItems,
  (_: unknown, address: string) => address,
  (items: Item[], address: string) =>
    items.filter((item) => item.owner.address === address && item.status === ItemStatus.Listed)
);

export const selectOwnedItems = createSelector(
  selectItems,
  (_: unknown, address: string) => address,
  (items: Item[], address: string) => items.filter((item) => item.owner.address === address)
);

export const accountReducer = accountSlice.reducer;
