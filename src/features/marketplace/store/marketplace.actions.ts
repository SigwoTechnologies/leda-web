import { createAsyncThunk } from '@reduxjs/toolkit';
import Router from 'next/router';

import { getContracts } from '../../../utils/getContracts';
import { FilterType } from '../../../types/item-filter-types';
import { ledaNftService } from '../../leda-nft/services/leda-nft.service';
import { openToastError, openToastSuccess } from '../../../store/ui/ui.slice';
import BusinessError from '../../../common/exceptions/business-error';
import CollectionType from '../../../common/minting/enums/collection-type.enum';
import ContractEvent from '../process/enums/contract-event.enum';
import ItemService, { itemService } from '../../leda-nft/services/item.service';
import ItemStatus from '../process/enums/item-status.enum';
import MarketplaceClientProcessor from '../process/clients/marketplace-client-processor';
import MarketplaceService from '../services/marketplace.service';
import MarketplaceState from '../process/types/marketplace-state';
import type { RootState } from '../../../store/types';

const { LedaAddress } = getContracts();

export const findFilteredItems = createAsyncThunk(
  'marketplace/findFilteredItems',
  async (filters: FilterType) => itemService.findPagedItems(filters)
);

export const findPagedItems = createAsyncThunk(
  'marketplace/findPagedItems',
  async (filters: FilterType) => itemService.findPagedItems(filters)
);

export const findPriceRange = createAsyncThunk('marketplace/findPriceRange', async () =>
  itemService.findPriceRange()
);

export const getOwner = createAsyncThunk('marketplace/getNftList', async () => {
  const service = new MarketplaceService(ledaNftService);
  return service.getOwner();
});

export const listItem = createAsyncThunk(
  'marketplace/listItem',
  async (
    {
      address,
      price,
      tokenId,
      itemId,
      listId,
      ownerAddress,
    }: {
      address: string;
      price: string;
      tokenId: number;
      listId: number;
      itemId: string;
      ownerAddress: string;
    },
    { dispatch }
  ) => {
    try {
      const listItemState = {
        address,
        collection: CollectionType.LedaNft,
        collectionAddress: LedaAddress,
        mintEventName: ContractEvent.LogCreateItem,
        price,
        tokenId,
        itemId,
        ownerAddress,
        listId,
      } as MarketplaceState;

      console.log(LedaAddress);

      const processor = new MarketplaceClientProcessor();
      const listed = await processor.execute(listItemState);

      dispatch(openToastSuccess('The item has been successfully listed on the marketplace.'));

      return listed.item;
    } catch (err) {
      if (err instanceof BusinessError) {
        dispatch(openToastError(err.message));
      }
      throw err;
    }
  }
);

export const delistItem = createAsyncThunk(
  'marketplace/delistItem',
  async (
    { listId, itemId, ownerAddress }: { listId: number; itemId: string; ownerAddress: string },
    { dispatch }
  ) => {
    try {
      const delistItemState = {
        collection: CollectionType.LedaNft,
        collectionAddress: LedaAddress,
        mintEventName: ContractEvent.LogChangeStatus,
        itemId,
        listId,
        ownerAddress,
        status: ItemStatus.NotListed,
      } as MarketplaceState;

      const processor = new MarketplaceClientProcessor();
      const delisted = await processor.execute(delistItemState);

      dispatch(openToastSuccess('The item has been successfully delisted on the marketplace.'));

      return delisted.item;
    } catch (err) {
      if (err instanceof BusinessError) {
        dispatch(openToastError(err.message));
      }
      throw err;
    }
  }
);

export const buyItem = createAsyncThunk(
  'marketplace/buyItem',
  async (
    {
      price,
      tokenId,
      itemId,
      listId,
      address,
    }: { price: string; tokenId: number; itemId: string; listId: number; address: String },
    { dispatch }
  ) => {
    try {
      const buyItemState = {
        collectionAddress: LedaAddress,
        collection: CollectionType.LedaNft,
        mintEventName: ContractEvent.LogBuyItem,
        address,
        price,
        tokenId,
        itemId,
        listId,
      } as MarketplaceState;

      const processor = new MarketplaceClientProcessor();
      const bought = await processor.execute(buyItemState);

      dispatch(openToastSuccess('The NFT was successfully purchased'));

      Router.push('/author');
      return bought.item;
    } catch (err) {
      if (err instanceof BusinessError) {
        dispatch(openToastError(err.message));
      }
      throw err;
    }
  }
);

export const changePriceItem = createAsyncThunk(
  'marketplace/changePriceItem',
  async (
    {
      ownerAddress,
      price,
      itemId,
      listId,
    }: {
      ownerAddress: string;
      price: string;
      listId: number;
      itemId: string;
    },
    { dispatch }
  ) => {
    try {
      const marketplaceState = {
        ownerAddress,
        collection: CollectionType.LedaNft,
        collectionAddress: LedaAddress,
        mintEventName: ContractEvent.LogChangePrice,
        price,
        itemId,
        listId,
        status: ItemStatus.Listed,
      } as MarketplaceState;

      const processor = new MarketplaceClientProcessor();
      const listed = await processor.execute(marketplaceState);

      dispatch(openToastSuccess('The item price has been successfully changed.'));

      return listed.item;
    } catch (err) {
      if (err instanceof BusinessError) {
        dispatch(openToastError(err.message));
      }
      throw err;
    }
  }
);

export const findHistoryByItemId = createAsyncThunk(
  'marketplace/findHistoryByItemId',
  async ({ itemId }: { itemId: string }) => itemService.findHistoryByItemId(itemId)
);

export const findAllHistory = createAsyncThunk('marketplace/findAllHistory', async () =>
  itemService.findAllHistory()
);

export const likeItem = createAsyncThunk(
  'marketplace/like',
  async (itemId: string, { getState }) => {
    const { auth } = getState() as RootState;
    // TODO: This should be refactored, so it uses the same instance and token attached once the sign in is performed
    const itemSrv = new ItemService();
    return itemSrv.like(itemId, auth.address);
  }
);
