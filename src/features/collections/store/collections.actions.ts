import { createAsyncThunk } from '@reduxjs/toolkit';
import { collectionsService } from '../services/collections.service';
import { CollectionsFiltersTypes } from '../types/CollectionsFiltersTypes';

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

export { findCollectionById, findAllCollections, getNewestCollections, findPagedCollections };
