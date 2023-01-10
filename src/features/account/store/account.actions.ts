import { createAsyncThunk } from '@reduxjs/toolkit';
import { Item } from '@types';
import { ICollection } from '../../../types/ICollection';
import { accountService } from '../services/account.service';

export const findItemsByAccount = createAsyncThunk(
  'account/findItemsByAccount',
  async (address: string): Promise<Item[]> => accountService.findItemsByAccount(address)
);

export const findLikedItemsByAccount = createAsyncThunk(
  'account/findLikedItemsByAccount',
  async (address: string): Promise<Item[]> => accountService.findLikedItemsByAccount(address)
);

export const findUserCollections = createAsyncThunk(
  'account/findUserCollections',
  async (address: string): Promise<ICollection[]> => accountService.findUserCollections(address)
);

export const findUserCollectionsWithoutItems = createAsyncThunk(
  'account/findUserCollectionsWithoutItems',
  async (address: string): Promise<ICollection[]> =>
    accountService.findUserCollectionsWithoutItems(address)
);
