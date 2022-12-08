import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../../store/types';
import { History } from '../../../types/history';
import { Item } from '../../../types/item';
import { FilterType, ItemPagination } from '../../../types/item-filter-types';
import ItemStatus from '../../../common/minting/enums/item-status.enum';
import {
  changePriceItem,
  delistItem,
  findFilteredItems,
  findPagedItems,
  findPriceRange,
  findAllHistory,
  findHistoryByItemId,
  getOwner,
  listItem,
  buyItem,
  likeItem,
  getNewest,
  hideItem,
} from './marketplace.actions';

export type MarketplaceState = {
  owner: string | undefined;
  marketplaceFilters: FilterType;
  itemPagination: ItemPagination;
  newestItems: Item[];
  loadingNewest: boolean;
  isLoading: boolean;
  isPagingLoading: boolean;
  isLoadingHistory: boolean;
  selectedItem: Item;
  history: History[];
  isModalOpen: boolean;
  isSelectedLoading: boolean;
  isCompleted: boolean;
};

export const initialFormState = {
  collection: {
    name: '',
    description: '',
  },
  tags: [],
  properties: [],
};

const initialState: MarketplaceState = {
  owner: '',
  isLoading: false,
  isPagingLoading: false,
  isLoadingHistory: false,
  isSelectedLoading: false,
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
  newestItems: [],
  loadingNewest: false,
  history: [],
  isModalOpen: false,
  isCompleted: false,
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
    setIsLoadingSelectedItem: (state, { payload }) => {
      state.isSelectedLoading = payload;
    },
    setSelectedItem: (state, { payload }) => {
      state.selectedItem = payload;
    },
    setIsModalOpen: (state, { payload }) => {
      state.isModalOpen = payload;
    },
  },
  extraReducers: (builder) => {
    // List Item
    builder.addCase(listItem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(listItem.fulfilled, (state, { payload: item }) => {
      state.isLoading = false;
      state.isCompleted = true;
      state.isModalOpen = false;
      state.selectedItem = item;
    });
    builder.addCase(getNewest.pending, (state) => {
      state.loadingNewest = true;
    });
    builder.addCase(getNewest.fulfilled, (state, { payload }) => {
      state.loadingNewest = false;
      state.newestItems = payload;
    });
    builder.addCase(getNewest.rejected, (state) => {
      state.loadingNewest = false;
    });
    builder.addCase(listItem.rejected, (state) => {
      state.isLoading = false;
    });
    // Delist Item
    builder.addCase(delistItem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(delistItem.fulfilled, (state, { payload: item }) => {
      state.isLoading = false;
      state.isCompleted = true;
      state.isModalOpen = false;
      state.selectedItem = item;
    });
    builder.addCase(delistItem.rejected, (state) => {
      state.isLoading = false;
    });
    // Change Price
    builder.addCase(changePriceItem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(changePriceItem.fulfilled, (state, { payload: item }) => {
      state.isLoading = false;
      state.isCompleted = true;
      state.isModalOpen = false;
      state.selectedItem = item;
    });
    builder.addCase(changePriceItem.rejected, (state) => {
      state.isLoading = false;
    });
    // Buy Item
    builder.addCase(buyItem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(buyItem.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isCompleted = true;
      state.isModalOpen = false;
      state.selectedItem = payload;
    });
    builder.addCase(buyItem.rejected, (state) => {
      state.isLoading = false;
      state.isModalOpen = false;
    });
    builder.addCase(getOwner.fulfilled, (state, { payload }) => {
      state.owner = payload;
    });
    builder.addCase(findFilteredItems.pending, (state) => {
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
      state.isPagingLoading = true;
    });
    builder.addCase(findPagedItems.fulfilled, (state, { payload }) => {
      state.itemPagination.items = [...state.itemPagination.items, ...payload.items];
      state.itemPagination.totalCount = payload.totalCount;
      state.isPagingLoading = false;
    });
    builder.addCase(findPagedItems.rejected, (state) => {
      state.isPagingLoading = false;
    });
    builder.addCase(findPriceRange.fulfilled, (state, { payload }) => {
      state.marketplaceFilters.cheapest = payload.from;
      state.marketplaceFilters.mostExpensive = payload.to;
    });
    builder.addCase(findHistoryByItemId.pending, (state) => {
      state.isLoadingHistory = true;
    });
    builder.addCase(findHistoryByItemId.fulfilled, (state, { payload }) => {
      state.selectedItem.history = payload;
      state.isLoadingHistory = false;
    });
    builder.addCase(findAllHistory.pending, (state) => {
      state.isLoadingHistory = true;
    });
    builder.addCase(findAllHistory.rejected, (state) => {
      state.isLoadingHistory = false;
    });
    builder.addCase(findAllHistory.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isLoadingHistory = false;

      state.history = payload;
    });
    builder.addCase(likeItem.fulfilled, (state, { payload }) => {
      const index = state.itemPagination.items.findIndex((i) => i.itemId === payload.itemId);
      state.itemPagination.items[index] = payload;

      if (state.selectedItem.itemId === payload.itemId) state.selectedItem = payload;
    });
    builder.addCase(hideItem.fulfilled, (state, { payload }) => {
      const index = state.itemPagination.items.findIndex((i) => i.itemId === payload.itemId);
      state.itemPagination.items[index] = payload;

      if (state.selectedItem.itemId === payload.itemId) state.selectedItem = payload;
    });
  },
});

export const selectOwner = (state: RootState) => state.marketplace.owner;

export const selectNFTsMarketplace = (state: RootState) => state.marketplace;

export const selectCanIList = (state: RootState) => {
  const {
    auth: { address },
    marketplace: { selectedItem },
  } = state;
  return selectedItem.owner?.address === address && selectedItem.status === ItemStatus.NotListed;
};
export const selectCanIDelist = (state: RootState) => {
  const {
    auth: { address },
    marketplace: { selectedItem },
  } = state;
  return (
    selectedItem.owner?.address === address &&
    selectedItem.status === ItemStatus.Listed &&
    !selectedItem.isHidden
  );
};

export const selectCanISeeItem = (state: RootState) => {
  const {
    auth: { address },
    marketplace: { selectedItem },
  } = state;

  const isOwner = selectedItem?.owner?.address === address;

  const isAbleToSee = [ItemStatus.Listed, ItemStatus.NotListed].includes(selectedItem?.status);

  return isOwner || isAbleToSee || !selectedItem.isHidden;
};

export const selectIsOwner = (state: RootState) => {
  const {
    auth: { address },
    marketplace: { selectedItem },
  } = state;

  return address === selectedItem?.owner?.address;
};

export const selectMarketplaceState = (state: RootState) => state.marketplace;

export const {
  setMarketplaceFilters,
  resetMarketplaceFilters,
  setSelectedItem,
  setIsModalOpen,
  setIsLoadingSelectedItem,
} = marketplaceSlice.actions;

export const marketplaceReducer = marketplaceSlice.reducer;
