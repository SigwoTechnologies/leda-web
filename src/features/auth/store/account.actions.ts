import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '@store/types';
import axios from 'axios';
import { imageService } from '../../leda-nft/services/image.service';
import appConfig from '../../../common/configuration/app.config';
import { IpfsObjectResponse } from '../../../common/types/ipfs-types';
import { ICollection } from '../../../types/ICollection';
import { FilterType } from '../../../types/item-filter-types';
import { accountService } from '../services/account.service';
import { Item } from '../../../types/item';
import { Account } from '../../../types/account';

export const findItemsByAccount = createAsyncThunk(
  'account/findItemsByAccount',
  async (filters: FilterType, { getState }): Promise<Item[]> => {
    const {
      auth: { account },
    } = getState() as RootState;

    return accountService.findItemsByAccount(account.address, filters);
  }
);

export const findLikedItemsByAccount = createAsyncThunk(
  'account/findLikedItemsByAccount',
  async (filters: FilterType, { getState }): Promise<Item[]> => {
    const {
      auth: { account },
    } = getState() as RootState;

    return accountService.findLikedItemsByAccount(account.address);
  }
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

export const changeBackgroundPicture = createAsyncThunk<Account, File>(
  'account/changeBackgroundPicture',
  async (file, { getState }): Promise<Account> => {
    const {
      auth: { account },
    } = getState() as RootState;

    const cid = await imageService.uploadProfileImages(file, 'background', account.address);

    const { data } = await axios.get<IpfsObjectResponse>(
      `https://${appConfig.pinataGatewayUrl}/ipfs/${cid}`
    );

    return accountService.changeInformation({ ...account, background: { cid, url: data.image } });
  }
);

export const changeProfilePicture = createAsyncThunk<Account, File>(
  'account/changeProfilePicture',
  async (file, { getState }): Promise<Account> => {
    const {
      auth: { account },
    } = getState() as RootState;

    const cid = await imageService.uploadProfileImages(file, 'picture', account.address);

    const { data } = await axios.get<IpfsObjectResponse>(
      `https://${appConfig.pinataGatewayUrl}/ipfs/${cid}`
    );

    return accountService.changeInformation({ ...account, picture: { cid, url: data.image } });
  }
);

export const changeAccountInformation = createAsyncThunk(
  'account/changeInformation',
  async (account: Account): Promise<Account> => accountService.changeInformation(account)
);
