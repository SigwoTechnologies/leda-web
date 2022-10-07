import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../../store/types';
import { Product2 } from '../../../types/product';
import createNft from './leda-nft.actions';

type LedaNftState = {
  items: Product2[];
};

const initialState: LedaNftState = {
  items: [],
};

const ledaNftSlice = createSlice({
  name: 'ledaNft',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createNft.fulfilled, (state, { payload }) => {
      if (!payload) return;

      state.items.push(payload);
    });
  },
});

export const selectState = (state: RootState) => state.ledaNft;

export const selectItems = (state: RootState) => state.ledaNft.items;

export const ledaNftReducer = ledaNftSlice.reducer;
