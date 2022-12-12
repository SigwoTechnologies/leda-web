import { createSlice } from '@reduxjs/toolkit';
import { ICollection } from '../../../types/ICollection';
import {
  findCollectionById,
  getNewestCollections,
  findPagedCollections,
  findFilteredCollections,
  findPagedCollectionsNfts,
  findPriceRange,
  findFilteredCollectionItems,
} from './collections.actions';
import type { RootState } from '../../../store/types';
import { CollectionPagination, CollectionsFiltersTypes } from '../types/CollectionsFiltersTypes';
import { FilterType, ItemPagination } from '../../../types/item-filter-types';
import { Item } from '../../../types/item';
import { likeItem } from '../../marketplace/store/marketplace.actions';

type CollectionsState = {
  selectedCollection: ICollection;
  itemsStats: {
    items: Item[];
    totalCount: number;
    page: number;
    limit: number;
    isLoadingItemsStats: boolean;
  };
  collectionItemsFiltering: {
    itemsFilters: FilterType;
    itemsPagination: ItemPagination;
    isCollectionNftsLoading: boolean;
  };
  newestCollections: ICollection[];
  isLoadingCollections: boolean;
  collectionsFilters: CollectionsFiltersTypes;
  collectionPagination: CollectionPagination;
  isPagingLoading: boolean;
};

const initialState: CollectionsState = {
  newestCollections: [] as ICollection[],
  itemsStats: {
    items: [],
    totalCount: 0,
    page: 1,
    limit: 3,
    isLoadingItemsStats: false,
  },
  collectionItemsFiltering: {
    itemsFilters: {
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
    itemsPagination: { items: [], totalCount: 0 },
    isCollectionNftsLoading: false,
  },
  selectedCollection: {} as ICollection,
  isLoadingCollections: false,
  collectionsFilters: {
    search: '',
    popularityOrder: '',
    creationOrder: '',
    mintType: '',
    page: 1,
    limit: 15,
  },
  collectionPagination: { collections: [], totalCount: 0 },
  isPagingLoading: false,
};

const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    setCollectionsFilters: (state, { payload }) => {
      state.collectionsFilters = payload;
    },
    resetCollectionsFilters: (state) => {
      state.collectionsFilters = initialState.collectionsFilters;
    },
    resetSelectedCollectionStats: (state) => {
      state.itemsStats = initialState.itemsStats;
    },
    setCollectionsNftsFilters: (state, { payload }) => {
      state.collectionItemsFiltering.itemsFilters = payload;
    },
    resetCollectionsNftFilters: (state) => {
      state.collectionItemsFiltering.itemsFilters =
        initialState.collectionItemsFiltering.itemsFilters;
    },
    setSelectedCollection: (state, { payload }) => {
      state.selectedCollection = payload;
    },
  },
  extraReducers: (builder) => {
    // find filtered collection items
    builder.addCase(findFilteredCollectionItems.pending, (state) => {
      state.collectionItemsFiltering.isCollectionNftsLoading = true;
    });
    builder.addCase(findFilteredCollectionItems.fulfilled, (state, { payload }) => {
      state.collectionItemsFiltering.itemsPagination = payload;
      state.collectionItemsFiltering.isCollectionNftsLoading = false;
    });
    builder.addCase(findFilteredCollectionItems.rejected, (state) => {
      state.collectionItemsFiltering.isCollectionNftsLoading = false;
    });
    // find price range with items inside a collection
    builder.addCase(findPriceRange.pending, (state) => {
      state.collectionItemsFiltering.isCollectionNftsLoading = true;
    });
    builder.addCase(findPriceRange.fulfilled, (state, { payload }) => {
      state.collectionItemsFiltering.itemsFilters.cheapest = payload.from;
      state.collectionItemsFiltering.itemsFilters.mostExpensive = payload.to;
      state.collectionItemsFiltering.isCollectionNftsLoading = false;
    });
    builder.addCase(findPriceRange.rejected, (state) => {
      state.collectionItemsFiltering.isCollectionNftsLoading = false;
    });
    // find nfts from a collections
    builder.addCase(findPagedCollectionsNfts.pending, (state) => {
      state.itemsStats.isLoadingItemsStats = true;
    });
    builder.addCase(findPagedCollectionsNfts.fulfilled, (state, { payload }) => {
      state.itemsStats.limit = payload.limit;
      state.itemsStats.page = payload.page;
      state.itemsStats.totalCount = payload.totalCount;
      state.itemsStats.items = [...state.itemsStats.items, ...payload.items];
      state.itemsStats.isLoadingItemsStats = false;
    });
    builder.addCase(findPagedCollectionsNfts.rejected, (state) => {
      state.itemsStats.isLoadingItemsStats = false;
    });
    // find filtered collections
    builder.addCase(findFilteredCollections.pending, (state) => {
      state.isLoadingCollections = true;
    });
    builder.addCase(findFilteredCollections.fulfilled, (state, { payload }) => {
      state.collectionPagination = payload;
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
      state.collectionPagination.collections = [
        ...state.collectionPagination.collections,
        ...payload.collections,
      ];
      state.collectionPagination.totalCount = payload.totalCount;
      state.isLoadingCollections = false;
    });
    builder.addCase(findPagedCollections.rejected, (state) => {
      state.isLoadingCollections = false;
    });
    // get latets collections
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
    builder.addCase(likeItem.fulfilled, (state, { payload }) => {
      const indexItemsStats = state.itemsStats.items.findIndex((i) => i.itemId === payload.itemId);
      const indexItemsFiltering = state.collectionItemsFiltering.itemsPagination.items.findIndex(
        (i) => i.itemId === payload.itemId
      );
      state.itemsStats.items[indexItemsStats] = payload;
      state.collectionItemsFiltering.itemsPagination.items[indexItemsFiltering] = payload;
    });
  },
});

export const collectionsReducer = collectionsSlice.reducer;

export const {
  resetCollectionsFilters,
  setCollectionsNftsFilters,
  setCollectionsFilters,
  resetSelectedCollectionStats,
  resetCollectionsNftFilters,
  setSelectedCollection,
} = collectionsSlice.actions;

export const selectCollectionsState = (state: RootState) => state.collections;

export const selectCurrentSelection = (state: RootState) => state.collections.selectedCollection;

export const selectCurrentSelectionItemsFiltering = (state: RootState) =>
  state.collections.collectionItemsFiltering;
