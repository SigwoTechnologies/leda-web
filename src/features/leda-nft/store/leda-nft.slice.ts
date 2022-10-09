import { createSlice } from '@reduxjs/toolkit';
import { Item } from '@types';
import type { RootState } from '../../../store/types';
import { Product2 } from '../../../types/product';
import { findAll, findNewest, mintNft } from './leda-nft.actions';

type LedaNftState = {
  items: Product2[];
  items2: Item[];
  isLoading: boolean;
};

const initialState: LedaNftState = {
  items: [],
  items2: [],
  isLoading: false,
};

const ledaNftSlice = createSlice({
  name: 'ledaNft',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(findAll.fulfilled, (state, { payload }) => {
      state.items2 = payload;
    });
    builder.addCase(findNewest.fulfilled, (state, { payload }) => {
      state.items2 = payload;
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
  },
});

export const selectState = (state: RootState) => state.ledaNft;
export const ledaNftReducer = ledaNftSlice.reducer;
