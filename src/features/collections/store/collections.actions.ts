import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICollection } from '../../../types/ICollection';
import { collectionsService } from '../services/collections.service';

const findCollectionById = createAsyncThunk('collections/findById', async (collectionId: string) =>
  collectionsService.findById(collectionId)
);

const findAllCollections = createAsyncThunk('collections/findAll', async () =>
  collectionsService.findAll()
);

export { findCollectionById, findAllCollections };
