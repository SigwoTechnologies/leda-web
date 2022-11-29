import { createSlice } from '@reduxjs/toolkit';
import { ICollection } from '../../../types/ICollection';
import {
  findAllCollections,
  findCollectionById,
  getNewestCollections,
  findPagedCollections,
  findFilteredCollections,
  findPagedCollectionsNfts,
} from './collections.actions';
import type { RootState } from '../../../store/types';
import { CollectionPagination, CollectionsFiltersTypes } from '../types/CollectionsFiltersTypes';
import { FilterType } from '../../../types/item-filter-types';
import { Item } from '../../../types/item';

type CollectionsState = {
  collections: ICollection[];
  selectedCollection: {
    itemsStats: {
      items: Item[];
      totalCount: number;
      page: number;
      limit: number;
      isLoadingItemsStats: boolean;
    };
    itemsFilters: FilterType;
    itemsPagination: any;
    collection: ICollection;
  };
  newestCollections: ICollection[];
  isLoadingCollections: boolean;
  collectionsFilters: CollectionsFiltersTypes;
  collectionPagination: CollectionPagination;
  isPagingLoading: boolean;
};

const initialState: CollectionsState = {
  collections: [] as ICollection[],
  newestCollections: [] as ICollection[],
  selectedCollection: {
    itemsStats: {
      items: [],
      totalCount: 0,
      page: 1,
      limit: 5,
      isLoadingItemsStats: false,
    },
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
    itemsPagination: '',
    collection: {} as ICollection,
  },
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
      state.selectedCollection.itemsStats = initialState.selectedCollection.itemsStats;
    },
  },
  extraReducers: (builder) => {
    // find nfts from a collections
    builder.addCase(findPagedCollectionsNfts.pending, (state) => {
      state.selectedCollection.itemsStats.isLoadingItemsStats = true;
    });
    builder.addCase(findPagedCollectionsNfts.fulfilled, (state, { payload }) => {
      state.selectedCollection.itemsStats.limit = payload.limit;
      state.selectedCollection.itemsStats.page = payload.page;
      state.selectedCollection.itemsStats.totalCount = payload.totalCount;
      state.selectedCollection.itemsStats.items = [
        ...state.selectedCollection.itemsStats.items,
        ...payload.items,
      ];
      state.selectedCollection.itemsStats.isLoadingItemsStats = false;
    });
    builder.addCase(findPagedCollectionsNfts.rejected, (state) => {
      state.selectedCollection.itemsStats.isLoadingItemsStats = false;
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
      state.selectedCollection.collection = payload;
      state.isLoadingCollections = false;
    });
    builder.addCase(findCollectionById.rejected, (state) => {
      state.isLoadingCollections = false;
    });
    // get all collections (change when paginating is integrated)
    builder.addCase(findAllCollections.pending, (state) => {
      state.isLoadingCollections = true;
    });
    builder.addCase(findAllCollections.fulfilled, (state, { payload }) => {
      state.collections = payload;
      state.isLoadingCollections = false;
    });
    builder.addCase(findAllCollections.rejected, (state) => {
      state.isLoadingCollections = false;
    });
  },
});

export const collectionsReducer = collectionsSlice.reducer;

export const { resetCollectionsFilters, setCollectionsFilters, resetSelectedCollectionStats } =
  collectionsSlice.actions;

export const selectCollectionsState = (state: RootState) => state.collections;

export const selectCollections = (state: RootState) => state.collections.collections;

export const selectCurrentSelection = (state: RootState) => state.collections.selectedCollection;
