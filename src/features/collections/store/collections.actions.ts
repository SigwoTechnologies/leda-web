import { createAsyncThunk } from '@reduxjs/toolkit';
import { FilterType } from '../../../types/item-filter-types';
import { collectionsService } from '../services/collections.service';
import { CollectionFilterType } from '../types/CollectionsFiltersTypes';

export const findCollectionById = createAsyncThunk(
  'marketplace/findById',
  async (collectionId: string) => collectionsService.findById(collectionId)
);

export const getNewestCollections = createAsyncThunk(
  'marketplace/getNewestCollections',
  async (qty: number) => collectionsService.findNewest(qty)
);

export const findPagedCollections = createAsyncThunk(
  'marketplace/findPagedCollections',
  async (filters: CollectionFilterType) => collectionsService.findPagedCollections(filters)
);

export const findFilteredCollections = createAsyncThunk(
  'marketplace/findFilteredCollections',
  async (filters: CollectionFilterType) => collectionsService.findPagedCollections(filters)
);

export const findFilteredCollectionItems = createAsyncThunk(
  'marketplace/findFilteredCollectionItems',
  async ({ collectionId, filters }: { collectionId: string; filters: FilterType }) =>
    collectionsService.findPagedCollectionItems(collectionId, filters)
);

export const findPagedCollectionsNfts = createAsyncThunk(
  'marketplace/findFilteredCollectionsNfts',
  async ({ collectionId, page }: { collectionId: string; page: number }) =>
    collectionsService.findPagedCollectionsNfts(collectionId, page)
);

export const findCollectionsByPriceRange = createAsyncThunk(
  'collections/findPriceRange',
  async (collectionId: string) => collectionsService.findPriceRangeCollectionItems(collectionId)
);

export const findPagedCollectionItems = createAsyncThunk(
  'collections/findPagedCollectionItems',
  async ({ collectionId, filters }: { collectionId: string; filters: FilterType }) =>
    collectionsService.findPagedCollectionItems(collectionId, filters)
);
