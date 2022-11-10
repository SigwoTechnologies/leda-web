import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../../store/types';
import { History } from '../../../types/history';
import { Item } from '../../../types/item';
import { FilterType } from '../../../types/item-filter-types';
import ItemStatus from '../process/enums/item-status.enum';
import {
  findFilteredItems,
  findPagedItems,
  findPriceRange,
  findAllHistory,
  findHistoryByItemId,
  getOwner,
  listItem,
} from './marketplace.actions';

export type ItemPagination = {
  items: Item[];
  totalCount: number;
};

export type MarketplaceState = {
  owner: string | undefined;
  marketplaceFilters: FilterType;
  itemPagination: ItemPagination;
  isLoading: boolean;
  selectedItem: Item;
  history: History[];
  isListed: boolean;
};

const initialState: MarketplaceState = {
  owner: '',
  isLoading: false,
  itemPagination: { items: [], totalCount: 0 },
  marketplaceFilters: {
    likesDirection: '',
    search: '',
    priceRange: {
      from: '',
      to: '',
    },
    cheapest: '',
    mostExpensive: '',
    page: 1,
    limit: 15,
  } as FilterType,
  selectedItem: {} as Item,
  history: [],
  isListed: false,
};

const marketplaceSlice = createSlice({
  name: 'marketplace',
  initialState,
  reducers: {
    setMarketplaceFilters: (state, { payload }) => {
      state.marketplaceFilters = payload;
    },
    resetMarketplaceFilters: (state) => {
      state.marketplaceFilters = initialState.marketplaceFilters;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(listItem.pending, (state) => {
      state.isLoading = true;
      state.isListed = false;
    });
    builder.addCase(listItem.fulfilled, (state) => {
      state.isLoading = false;
      state.isListed = true;
    });
    builder.addCase(listItem.rejected, (state) => {
      state.isLoading = false;
      state.isListed = false;
    });
    builder.addCase(getOwner.fulfilled, (state, { payload }) => {
      state.owner = payload;
    });
    builder.addCase(findFilteredItems.pending, (state) => {
      state.itemPagination = { items: [], totalCount: 0 };
      state.isLoading = true;
    });
    builder.addCase(findFilteredItems.fulfilled, (state, { payload }) => {
      state.itemPagination = payload;
      state.isLoading = false;
    });
    builder.addCase(findFilteredItems.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(findPagedItems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(findPagedItems.fulfilled, (state, { payload }) => {
      state.itemPagination.items = [...state.itemPagination.items, ...payload.items];
      state.itemPagination.totalCount = payload.totalCount;
      state.isLoading = false;
    });
    builder.addCase(findPagedItems.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(findPriceRange.fulfilled, (state, { payload }) => {
      state.marketplaceFilters.cheapest = payload.from;
      state.marketplaceFilters.mostExpensive = payload.to;
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

export const selectNFTsMarketplace = (state: RootState) => state.marketplace;

export const selectCanIList = (state: RootState, item: Item) => {
  const { address } = state.auth;
  return item.owner.address === address && item.status === ItemStatus.NotListed;
};
export const selectCanIDelist = (state: RootState, item: Item) => {
  const { address } = state.auth;
  return item.owner.address === address && item.status === ItemStatus.Listed;
};

export const selectMarketplaceState = (state: RootState) => state.marketplace;

export const { setMarketplaceFilters, resetMarketplaceFilters } = marketplaceSlice.actions;

export const marketplaceReducer = marketplaceSlice.reducer;
