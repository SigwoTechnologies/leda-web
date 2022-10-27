import { createSelector, createSlice } from '@reduxjs/toolkit';
import { Item } from '@types';
import type { RootState } from '../../../store/types';
import { findAll, findById, mintNft } from './leda-nft.actions';

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
    builder.addCase(findAll.fulfilled, (state, { payload }) => {
      state.items = payload;
    });
    builder.addCase(findById.fulfilled, (state, { payload }) => {
      const found = state.items.some((item) => item.itemId === payload.itemId);

      if (!found) state.items.push(payload);
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

// TODO: Change this name to selectNftState
export const selectState = (state: RootState) => state.ledaNft;

export const selectAllItems = (state: RootState) => state.ledaNft.items;

export const selectFilteredItems = createSelector(
  selectAllItems,
  (
    _: unknown,
    author: string,
    title: string,
    description: string,
    priceFrom: number,
    priceTo: number,
    likesDirection: string
  ) => ({
    author,
    title,
    description,
    priceFrom,
    priceTo,
    likesDirection,
  }),
  (items: Item[], { author, title, description, priceFrom, priceTo, likesDirection }) => {
    let filteredItems = [...items];
    if (author && author !== 'all') {
      // TODO: The logic is working fine, but we should change the data from the user and add a username
      filteredItems = filteredItems.filter((item) => item.owner.address === author);
    }
    if (title && title !== 'all') {
      filteredItems = filteredItems.filter((item) => item.name.includes(title));
    }
    if (description && description !== 'all') {
      filteredItems = filteredItems.filter((item) => item.description.includes(description));
    }

    if (priceFrom > 0 && priceTo > 0) {
      // TODO: Get the most expensive item from the store and set it as priceRange.to
      filteredItems = filteredItems.filter(
        (item) => Number(item.price) > priceFrom && Number(item.price) < priceTo
      );
    }

    if (likesDirection && likesDirection !== '') {
      if (likesDirection === 'asc') {
        filteredItems = filteredItems.sort((a, b) => a.likes - b.likes);
      }
      if (likesDirection === 'desc') {
        filteredItems = filteredItems.sort((a, b) => b.likes - a.likes);
      }
    }

    return filteredItems;
  }
);

export const selectNewest = (state: RootState) => state.ledaNft.items.slice(0, 5);

export const selectById = (state: RootState, itemId: string) =>
  state.ledaNft.items.find((item) => item.itemId === itemId);

export const ledaNftReducer = ledaNftSlice.reducer;
