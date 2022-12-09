import { createSlice } from '@reduxjs/toolkit';
import { Item } from '@types';
import type { RootState } from '../../../store/types';
import { buyItem, likeItem, listItem } from '../../marketplace/store/marketplace.actions';
import { getNewest, mintNft } from './leda-nft.actions';

type LedaNftState = {
  items: Item[];
  isLoading: boolean;
};

const initialState: LedaNftState = {
  items: [],
  isLoading: false,
};

const ledaNftSlice = createSlice({
  name: 'ledaNft',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNewest.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getNewest.fulfilled, (state, { payload }) => {
      state.items = payload;
      state.isLoading = false;
    });
    builder.addCase(getNewest.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(buyItem.pending, (state) => {
      state.isLoading = false;
    });
    builder.addCase(buyItem.fulfilled, (state, { payload }) => {
      const index = state.items.findIndex((item) => item.itemId === payload.itemId);
      if (index !== -1) state.items[index] = payload;

      state.isLoading = false;
    });
    builder.addCase(buyItem.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(mintNft.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(mintNft.fulfilled, (state, { payload }) => {
      if (!payload) return;
      state.items.push(payload);
      state.isLoading = false;
    });
    builder.addCase(mintNft.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(listItem.fulfilled, (state, { payload }) => {
      const index = state.items.findIndex((item) => item.itemId === payload.itemId);
      if (index !== -1) state.items[index] = payload;
    });
    builder.addCase(likeItem.fulfilled, (state, { payload }) => {
      const index = state.items.findIndex((i) => i.itemId === payload.itemId);
      state.items[index] = payload;
    });
  },
});

export const selectNftState = (state: RootState) => state.ledaNft;

export const selectAllItems = (state: RootState) => state.ledaNft.items;

export const selectNewest = (state: RootState) => state.ledaNft.items.slice(0, 5);

export const selectById = (state: RootState, itemId: string) =>
  state.ledaNft.items.find((item) => item.itemId === itemId);

export const ledaNftReducer = ledaNftSlice.reducer;
