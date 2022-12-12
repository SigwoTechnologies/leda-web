import { createAsyncThunk } from '@reduxjs/toolkit';
import { collectionsService } from '../services/collections.service';
import { CollectionsFiltersTypes } from '../types/CollectionsFiltersTypes';
import type { RootState } from '../../../store/types';
import { openToastError } from '../../../store/ui/ui.slice';
import { FilterType } from '../../../types/item-filter-types';

const findCollectionById = createAsyncThunk('collections/findById', async (collectionId: string) =>
  collectionsService.findById(collectionId)
);

const findAllCollections = createAsyncThunk('collections/findAll', async () =>
  collectionsService.findAll()
);

const getNewestCollections = createAsyncThunk('collections/getNewest', async (qty: number) =>
  collectionsService.findNewest(qty)
);

const findPagedCollections = createAsyncThunk(
  'collections/findPagedCollections',
  async (filters: CollectionsFiltersTypes) => collectionsService.findPagedCollections(filters)
);

const findFilteredCollections = createAsyncThunk(
  'collections/findFilteredCollections',
  async (filters: CollectionsFiltersTypes, { getState, dispatch }) => {
    const { collections } = getState() as RootState;
    const payload = await collectionsService.findPagedCollections(filters);
    if (!payload.totalCount) {
      dispatch(openToastError('No collections found.'));
      return collections.collectionPagination;
    }
    return payload;
  }
);

const findFilteredCollectionItems = createAsyncThunk(
  'collections/findFilteredCollectionItems',
  async ({ collectionId, filters }: { collectionId: string; filters: FilterType }) =>
    collectionsService.findPagedCollectionItems(collectionId, filters)
);

const findPagedCollectionsNfts = createAsyncThunk(
  'collections/findFilteredCollectionsNfts',
  async (
    { collectionId, page }: { collectionId: string; page: number },
    { getState, dispatch }
  ) => {
    const { collections } = getState() as RootState;
    const payload = await collectionsService.findPagedCollectionsNfts(collectionId, page);
    if (!payload.totalCount) {
      dispatch(openToastError('No Items found.'));
      return collections.selectedCollection.itemsStats;
    }

    return payload;
  }
);

const findPriceRange = createAsyncThunk(
  'collections/findPriceRange',
  async (collectionId: string) => collectionsService.findPriceRangeCollectionItems(collectionId)
);

const findPagedCollectionItems = createAsyncThunk(
  'collections/findPagedCollectionItems',
  async ({ collectionId, filters }: { collectionId: string; filters: FilterType }) =>
    collectionsService.findPagedCollectionItems(collectionId, filters)
);

export {
  findCollectionById,
  findAllCollections,
  getNewestCollections,
  findPagedCollections,
  findFilteredCollections,
  findPagedCollectionsNfts,
  findPriceRange,
  findPagedCollectionItems,
  findFilteredCollectionItems,
};
