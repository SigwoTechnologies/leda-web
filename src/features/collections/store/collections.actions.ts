import { createAsyncThunk } from '@reduxjs/toolkit';
import { FilterType } from '../../../types/item-filter-types';
import { collectionsService } from '../services/collections.service';
import { CollectionsFiltersTypes } from '../types/CollectionsFiltersTypes';

export const findCollectionById = createAsyncThunk(
  'collections/findById',
  async (collectionId: string) => collectionsService.findById(collectionId)
);

export const findAllCollections = createAsyncThunk('collections/findAll', async () =>
  collectionsService.findAll()
);

export const getNewestCollections = createAsyncThunk('collections/getNewest', async (qty: number) =>
  collectionsService.findNewest(qty)
);

export const findPagedCollections = createAsyncThunk(
  'collections/findPagedCollections',
  async (filters: CollectionsFiltersTypes) => collectionsService.findPagedCollections(filters)
);

export const findFilteredCollections = createAsyncThunk(
  'collections/findFilteredCollections',
  async (filters: CollectionsFiltersTypes) => collectionsService.findPagedCollections(filters)
);

export const findFilteredCollectionItems = createAsyncThunk(
  'collections/findFilteredCollectionItems',
  async ({ collectionId, filters }: { collectionId: string; filters: FilterType }) =>
    collectionsService.findPagedCollectionItems(collectionId, filters)
);

export const findPagedCollectionsNfts = createAsyncThunk(
  'collections/findFilteredCollectionsNfts',
  async ({ collectionId, page }: { collectionId: string; page: number }) =>
    collectionsService.findPagedCollectionsNfts(collectionId, page)
);

export const findPriceRange = createAsyncThunk(
  'collections/findPriceRange',
  async (collectionId: string) => collectionsService.findPriceRangeCollectionItems(collectionId)
);

export const findPagedCollectionItems = createAsyncThunk(
  'collections/findPagedCollectionItems',
  async ({ collectionId, filters }: { collectionId: string; filters: FilterType }) =>
    collectionsService.findPagedCollectionItems(collectionId, filters)
);
