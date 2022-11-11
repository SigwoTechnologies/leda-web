import { createSelector, createSlice } from '@reduxjs/toolkit';
import { Item } from '@types';
import ItemStatus from '../../../common/minting/enums/item-status.enum';
import type { RootState } from '../../../store/types';
import { likeItem } from '../../marketplace/store/marketplace.actions';
import { findItemsByAccount, findLikedItemsByAccount } from './account.actions';

type LedaNftState = {
  items: Item[];
  likedItems: Item[];
  isLoading: boolean;
};

const initialState: LedaNftState = {
  items: [],
  likedItems: [],
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
    builder.addCase(findLikedItemsByAccount.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(findLikedItemsByAccount.fulfilled, (state, { payload }) => {
      state.likedItems = payload;
    });
    builder.addCase(likeItem.fulfilled, (state, { payload }) => {
      const index = state.items.findIndex((i) => i.itemId === payload.itemId);
      state.items[index] = payload;

      const likedIndex = state.likedItems.findIndex((i) => i.itemId === payload.itemId);

      if (likedIndex !== -1) state.likedItems.splice(likedIndex, 1);
      else state.likedItems.push(payload);
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

export const selectLikedItems = (state: RootState) => state.account.likedItems;

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
