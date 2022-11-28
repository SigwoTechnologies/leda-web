import { createAsyncThunk } from '@reduxjs/toolkit';
import { collectionsService } from '../services/collections.service';
import { CollectionsFiltersTypes } from '../types/CollectionsFiltersTypes';
import type { RootState } from '../../../store/types';
import { openToastError } from '../../../store/ui/ui.slice';

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
      dispatch(openToastError('Not items found.'));
      return collections.collectionPagination;
    }
    return payload;
  }
);

export {
  findCollectionById,
  findAllCollections,
  getNewestCollections,
  findPagedCollections,
  findFilteredCollections,
};
