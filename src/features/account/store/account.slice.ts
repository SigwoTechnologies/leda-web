import { createSlice } from '@reduxjs/toolkit';
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

export const selectState = (state: RootState) => state.account;

export const selectCreatedItems = (state: RootState, address: string) => {
  const items = [...state.account.items];
  return items.filter((item) => item.author.address === address);
};

export const selectLikedItems = (state: RootState) => [];

export const selectOnSaleItems = (state: RootState, address: string) => {
  const items = [...state.account.items];
  return items.filter(
    (item) => item.owner.address === address && item.status === ItemStatus.Listed
  );
};

export const selectOwnedItems = (state: RootState, address: string) => {
  const items = [...state.account.items];
  return items.filter((item) => item.owner.address === address);
};

export const accountReducer = accountSlice.reducer;
