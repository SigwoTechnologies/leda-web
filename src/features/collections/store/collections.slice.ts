import { createSlice } from '@reduxjs/toolkit';
import { ICollection } from '../../../types/ICollection';
import {
  findAllCollections,
  findCollectionById,
  getNewestCollections,
  findPagedCollections,
} from './collections.actions';
import type { RootState } from '../../../store/types';
import { CollectionPagination, CollectionsFiltersTypes } from '../types/CollectionsFiltersTypes';

type CollectionsState = {
  collections: ICollection[];
  selectedCollection: ICollection;
  newestCollections: ICollection[];
  isLoadingCollections: boolean;
  collectionsFilters: CollectionsFiltersTypes;
  collectionPagination: CollectionPagination;
  isPagingLoading: boolean;
};

const initialState: CollectionsState = {
  collections: [] as ICollection[],
  newestCollections: [] as ICollection[],
  selectedCollection: {} as ICollection,
  isLoadingCollections: false,
  collectionsFilters: {
    search: '',
    collectionId: '',
    creationDirection: '',
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
  reducers: {},
  extraReducers: (builder) => {
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

export const selectCollectionsState = (state: RootState) => state.collections;

export const selectCollections = (state: RootState) => state.collections.collections;

export const selectCurrentSelection = (state: RootState) => state.collections.selectedCollection;
