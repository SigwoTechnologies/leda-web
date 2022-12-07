import { createAsyncThunk } from '@reduxjs/toolkit';
import { Item } from '@types';
import { ICollection } from '../../../types/ICollection';
import AccountService from '../services/account.service';

const findItemsByAccount = createAsyncThunk(
  'account/findItemsByAccount',
  async (address: string): Promise<Item[]> => {
    const accountService = new AccountService();
    return accountService.findItemsByAccount(address);
  }
);

const findLikedItemsByAccount = createAsyncThunk(
  'account/findLikedItemsByAccount',
  async (address: string): Promise<Item[]> => {
    const accountService = new AccountService();
    return accountService.findLikedItemsByAccount(address);
  }
);

const findUserCollections = createAsyncThunk(
  'account/findUserCollections',
  async (address: string): Promise<ICollection[]> => {
    const accountService = new AccountService();
    return accountService.findUserCollections(address);
  }
);

const findUserCollectionsWithoutItems = createAsyncThunk(
  'account/findUserCollectionsWithoutItems',
  async (address: string): Promise<ICollection[]> => {
    const accountService = new AccountService();
    return accountService.findUserCollectionsWithoutItems(address);
  }
);

export {
  findItemsByAccount,
  findLikedItemsByAccount,
  findUserCollections,
  findUserCollectionsWithoutItems,
};
