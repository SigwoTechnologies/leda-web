import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@store/types';
import ItemStatus from '../../../common/minting/enums/item-status.enum';
import { History } from '../../../types/history';
import { ICollection } from '../../../types/ICollection';
import { Item } from '../../../types/item';
import { FilterType } from '../../../types/item-filter-types';
import {
  findItemsByAccount,
  findLikedItemsByAccount,
  findUserCollections,
  findUserCollectionsWithoutItems,
} from '../../account/store/account.actions';
import {
  findCollectionById,
  findFilteredCollectionItems,
  findFilteredCollections,
  findPagedCollectionItems,
  findPagedCollections,
  findPagedCollectionsNfts,
  findCollectionsByPriceRange,
  getNewestCollections,
} from '../../collections/store/collections.actions';
import { CollectionFilterType } from '../../collections/types/CollectionsFiltersTypes';
import {
  buyItem,
  changePriceItem,
  delistItem,
  findAllHistory,
  findFilteredItems,
  findHistoryByItemId,
  findPagedItems,
  findPriceRange,
  getNewest,
  hideItem,
  likeItem,
  listItem,
} from './marketplace.actions';

export type MarketplaceState = {
  items: Item[];
  likedItems: Item[];
  collections: ICollection[];
  collectionsCount: number;
  historyCount: number;
  collectionsWithoutItems: ICollection[];
  itemsCount: number;
  filters: FilterType;
  collectionsFilters: CollectionFilterType;
  newestItems: Item[];
  selectedItem: Item;
  history: History[];
  selectedCollection: ICollection;
  newestCollections: ICollection[];
  isLoadingCollections: boolean;
  isLoadingNewest: boolean;
  isLoading: boolean;
  isPagingLoading: boolean;
  isLoadingHistory: boolean;
  isDelisting: boolean;
  isLoadingCollection: boolean;
  isListing: boolean;
  isModalOpen: boolean;
  isCompleted: boolean;
  isOpenPreviewProductModal: boolean;
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
  items: [],
  itemsCount: 0,
  likedItems: [],
  collections: [],
  collectionsCount: 0,
  collectionsWithoutItems: [],
  selectedItem: {} as Item,
  newestItems: [],
  filters: {
    likesDirection: '',
    search: '',
    priceRange: {
      from: '',
      to: '',
    },
    cheapest: '',
    mostExpensive: '',
    page: 1,
    limit: 3,
  },
  history: [] as History[],
  historyCount: 0,
  newestCollections: [] as ICollection[],
  selectedCollection: {} as ICollection,
  isLoadingCollections: false,
  collectionsFilters: {
    search: '',
    popularityOrder: '',
    creationOrder: '',
    mintType: '',
    page: 1,
    limit: 3,
  },
  isLoading: false,
  isDelisting: false,
  isListing: false,
  isPagingLoading: false,
  isLoadingHistory: false,
  isLoadingNewest: false,
  isLoadingCollection: false,
  isModalOpen: false,
  isCompleted: false,
  isOpenPreviewProductModal: false,
};

const marketplaceSlice = createSlice({
  name: 'marketplace',
  initialState,
  reducers: {
    setFilters: (state, { payload }) => {
      state.filters = payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.items = initialState.items;
      state.history = initialState.history;
    },
    setSelectedItem: (state, { payload }) => {
      state.selectedItem = payload;
    },
    setIsModalOpen: (state, { payload }) => {
      state.isModalOpen = payload;
    },
    setIsOpenPreviewProductModal: (state, { payload }) => {
      state.isOpenPreviewProductModal = payload;
    },
    setCollectionsFilters: (state, { payload }) => {
      state.collectionsFilters = payload;
    },
    setSelectedCollection: (state, { payload }) => {
      state.selectedCollection = payload;
    },
  },
  extraReducers: (builder) => {
    // List Item
    builder.addCase(listItem.pending, (state) => {
      state.isListing = true;
    });
    builder.addCase(listItem.fulfilled, (state, { payload: item }) => {
      state.isListing = false;
      state.isCompleted = true;
      state.isModalOpen = false;
      state.selectedItem = item;
    });
    builder.addCase(listItem.rejected, (state) => {
      state.isListing = false;
    });
    // getNewestItems
    builder.addCase(getNewest.pending, (state) => {
      state.isLoadingNewest = true;
    });
    builder.addCase(getNewest.fulfilled, (state, { payload }) => {
      state.newestItems = payload;
      state.isLoadingNewest = false;
    });
    builder.addCase(getNewest.rejected, (state) => {
      state.isLoadingNewest = false;
    });
    // Delist Item
    builder.addCase(delistItem.pending, (state) => {
      state.isDelisting = true;
    });
    builder.addCase(delistItem.fulfilled, (state, { payload: item }) => {
      state.isDelisting = false;
      state.isCompleted = true;
      state.isModalOpen = false;
      state.selectedItem = item;
    });
    builder.addCase(delistItem.rejected, (state) => {
      state.isDelisting = false;
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
    builder.addCase(findUserCollectionsWithoutItems.pending, (state) => {
      state.isLoadingCollection = true;
    });
    builder.addCase(findUserCollectionsWithoutItems.fulfilled, (state, { payload }) => {
      state.isLoadingCollection = false;
      state.collectionsWithoutItems = payload;
    });
    builder.addCase(findUserCollectionsWithoutItems.rejected, (state) => {
      state.isLoadingCollection = false;
    });
    builder.addCase(findUserCollections.pending, (state) => {
      state.isLoadingCollection = true;
    });
    builder.addCase(findUserCollections.fulfilled, (state, { payload }) => {
      state.collections = payload;
      state.isLoadingCollection = false;
    });
    builder.addCase(findUserCollections.rejected, (state) => {
      state.isLoadingCollection = false;
    });
    builder.addCase(likeItem.fulfilled, (state, { payload }) => {
      const index = state.items.findIndex((i) => i.itemId === payload.itemId);
      state.items[index] = payload;

      const likedIndex = state.likedItems.findIndex((i) => i.itemId === payload.itemId);

      if (likedIndex !== -1) state.likedItems.splice(likedIndex, 1);
      else state.likedItems.push(payload);

      if (state.selectedItem.itemId === payload.itemId) state.selectedItem = payload;
      const indexNewest = state.newestItems.findIndex((i) => i.itemId === payload.itemId);
      state.newestItems[indexNewest] = payload;
    });
    builder.addCase(findFilteredItems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(findFilteredItems.fulfilled, (state, { payload }) => {
      state.items = payload.items;
      state.itemsCount = payload.totalCount;
      state.isLoading = false;
    });
    builder.addCase(findFilteredItems.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(findPagedItems.pending, (state) => {
      state.isPagingLoading = true;
    });
    builder.addCase(findPagedItems.fulfilled, (state, { payload }) => {
      state.items = [...state.items, ...payload.items];
      state.itemsCount = payload.totalCount;
      state.isPagingLoading = false;
    });
    builder.addCase(findPagedItems.rejected, (state) => {
      state.isPagingLoading = false;
    });
    builder.addCase(findPriceRange.fulfilled, (state, { payload }) => {
      state.filters.cheapest = payload.from;
      state.filters.mostExpensive = payload.to;
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

      state.history = [...state.history, ...payload.history];
      state.historyCount = payload.count;
    });

    builder.addCase(hideItem.fulfilled, (state, { payload }) => {
      const index = state.items.findIndex((i) => i.itemId === payload.itemId);
      state.items[index] = payload;

      if (state.selectedItem.itemId === payload.itemId) state.selectedItem = payload;
    });

    // FIND PAGED COLLECTIONS
    builder.addCase(findPagedCollectionItems.pending, (state) => {
      state.isPagingLoading = true;
    });
    builder.addCase(findPagedCollectionItems.fulfilled, (state, { payload }) => {
      state.items = [...state.items, ...payload.items];
      state.isPagingLoading = false;
    });
    builder.addCase(findPagedCollectionItems.rejected, (state) => {
      state.isPagingLoading = false;
    });
    // find filtered collection items
    builder.addCase(findFilteredCollectionItems.pending, (state) => {
      state.isPagingLoading = true;
    });
    builder.addCase(findFilteredCollectionItems.fulfilled, (state, { payload }) => {
      state.items = payload.items;
      state.itemsCount = payload.totalCount;
      state.isPagingLoading = false;
    });
    builder.addCase(findFilteredCollectionItems.rejected, (state) => {
      state.isPagingLoading = false;
    });
    // find price range with items inside a collection
    builder.addCase(findCollectionsByPriceRange.pending, (state) => {
      state.isPagingLoading = true;
    });
    builder.addCase(findCollectionsByPriceRange.fulfilled, (state, { payload }) => {
      state.filters.cheapest = payload.from;
      state.filters.mostExpensive = payload.to;
      state.isPagingLoading = false;
    });
    builder.addCase(findCollectionsByPriceRange.rejected, (state) => {
      state.isPagingLoading = false;
    });
    // find nfts from a collections
    builder.addCase(findPagedCollectionsNfts.pending, (state) => {
      state.isPagingLoading = true;
    });
    builder.addCase(findPagedCollectionsNfts.fulfilled, (state, { payload }) => {
      state.filters.page = payload.page;
      state.itemsCount = payload.totalCount;
      state.items = [...state.items, ...payload.items];
      state.isPagingLoading = false;
    });
    builder.addCase(findPagedCollectionsNfts.rejected, (state) => {
      state.isPagingLoading = false;
    });
    // find filtered collections
    builder.addCase(findFilteredCollections.pending, (state) => {
      state.isLoadingCollections = true;
    });
    builder.addCase(findFilteredCollections.fulfilled, (state, { payload }) => {
      state.collections = payload.collections;
      state.collectionsCount = payload.totalCount;
      state.isLoadingCollections = false;
    });
    builder.addCase(findFilteredCollections.rejected, (state) => {
      state.isLoadingCollections = false;
    });
    // find paginated collections
    builder.addCase(findPagedCollections.pending, (state) => {
      state.isPagingLoading = true;
    });
    builder.addCase(findPagedCollections.fulfilled, (state, { payload }) => {
      state.collections = [...state.collections, ...payload.collections];
      state.collectionsCount = payload.totalCount;
      state.isLoadingCollections = false;
    });
    builder.addCase(findPagedCollections.rejected, (state) => {
      state.isLoadingCollections = false;
    });
    // get latests collections
    builder.addCase(getNewestCollections.pending, (state) => {
      state.isLoadingCollections = true;
    });
    builder.addCase(getNewestCollections.fulfilled, (state, { payload }) => {
      state.newestCollections = payload;
      state.isLoadingCollections = false;
    });
    builder.addCase(getNewestCollections.rejected, (state) => {
      state.isLoadingCollections = false;
    });
    // get collection by id
    builder.addCase(findCollectionById.pending, (state) => {
      state.isLoadingCollections = true;
    });
    builder.addCase(findCollectionById.fulfilled, (state, { payload }) => {
      state.selectedCollection = payload;
      state.isLoadingCollections = false;
    });
    builder.addCase(findCollectionById.rejected, (state) => {
      state.isLoadingCollections = false;
    });
  },
});
export const selectMarketplaceState = (state: RootState) => state.marketplace;

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

  const isOwner = selectedItem.owner?.address === address;
  const isAbleToSee = !selectedItem.isHidden;

  return Object.entries(selectedItem).length && (isOwner || isAbleToSee);
};

export const selectIsOwner = (state: RootState) => {
  const {
    auth: { address },
    marketplace: { selectedItem },
  } = state;

  return address === selectedItem?.owner?.address;
};

export const selectIsLoadingWhileBuy = (state: RootState) => {
  const { marketplace, ledaNft } = state;

  if (marketplace.selectedItem.isLazy) {
    return ledaNft.isLoading;
  }

  return marketplace.isLoading;
};

export const {
  setFilters,
  resetFilters,
  setSelectedItem,
  setIsModalOpen,
  setIsOpenPreviewProductModal,
  setCollectionsFilters,
  setSelectedCollection,
} = marketplaceSlice.actions;

export const marketplaceReducer = marketplaceSlice.reducer;
