import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '@store/types';
import axios from 'axios';
import { imageService } from '../../leda-nft/services/image.service';
import appConfig from '../../../common/configuration/app.config';
import { IpfsObjectResponse } from '../../../common/types/ipfs-types';
import { ICollection } from '../../../types/ICollection';
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

export const changePictureCollection = createAsyncThunk<ICollection, { file: File }>(
  'marketplace/changePictureCollection',
  async ({ file }, { getState }) => {
    const {
      marketplace: { selectedCollection },
    } = getState() as RootState;

    const cid = await imageService.uploadCollectionImage(
      file,
      selectedCollection.name,
      selectedCollection.description,
      selectedCollection.id
    );

    const { data } = await axios.get<IpfsObjectResponse>(
      `https://${appConfig.pinataGatewayUrl}/ipfs/${cid}`
    );

    return collectionsService.changeInformation({
      ...selectedCollection,
      image: { url: data.image, cid },
    });
  }
);

export const changeCollectionInformation = createAsyncThunk(
  'marketplace/changeCollectionInformation',
  async (collection: ICollection) => collectionsService.changeInformation(collection)
);
