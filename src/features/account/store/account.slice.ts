import { createSelector, createSlice } from '@reduxjs/toolkit';
import { Item } from '@types';
import type { RootState } from '@store/types';
import ItemStatus from '../../../common/minting/enums/item-status.enum';

type AccountState = {
  isLoading: boolean;
  imageNumber: number;
};

const initialState: AccountState = {
  isLoading: false,
  imageNumber: 1,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setProfileImage: (state, { payload }) => {
      state.imageNumber = payload;
    },
  },
});

export const selectAccountState = (state: RootState) => state.account;

export const { setProfileImage } = accountSlice.actions;

export const selectCreatedItems = createSelector(
  (state: RootState) => state.marketplace.items,
  (_: unknown, address: string) => address,
  (items: Item[], address: string) => items.filter((item) => item.author.address === address)
);

export const selectOnSaleItems = createSelector(
  (state: RootState) => state.marketplace.items,
  (_: unknown, address: string) => address,
  (items: Item[], address: string) =>
    items.filter((item) => item.owner.address === address && item.status === ItemStatus.Listed)
);

export const selectOwnedItems = createSelector(
  (state: RootState) => state.marketplace.items,
  (_: unknown, address: string) => address,
  (items: Item[], address: string) => items.filter((item) => item.owner.address === address)
);

export const accountReducer = accountSlice.reducer;
