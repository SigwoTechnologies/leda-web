import { createSlice } from '@reduxjs/toolkit';
import { Item } from '@types';
import type { RootState } from '../../../store/types';
import { Product2 } from '../../../types/product';
import { createNft, findAll } from './leda-nft.actions';

type LedaNftState = {
  items: Product2[];
  items2: Item[];
};

const initialState: LedaNftState = {
  items: [],
  items2: [],
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
    builder.addCase(findAll.fulfilled, (state, { payload }) => {
      state.items2 = payload;
    });
  },
});

export const selectState = (state: RootState) => state.ledaNft;

export const selectItems = (state: RootState) => state.ledaNft.items;
export const selectItems2 = (state: RootState) => state.ledaNft.items2;

export const ledaNftReducer = ledaNftSlice.reducer;
