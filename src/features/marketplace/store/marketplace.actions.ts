import { createAsyncThunk, Dispatch } from '@reduxjs/toolkit';
import Router from 'next/router';
import { getContracts } from '../../../utils/getContracts';
import { FilterType } from '../../../types/item-filter-types';
import { openToastError, openToastSuccess } from '../../../store/ui/ui.slice';
import BusinessError from '../../../common/exceptions/business-error';
import CollectionType from '../../../common/minting/enums/collection-type.enum';
import ContractEvent from '../process/enums/contract-event.enum';
import ItemService, { itemService } from '../../leda-nft/services/item.service';
import ItemStatus from '../../../common/minting/enums/item-status.enum';
import MarketplaceClientProcessor from '../process/clients/marketplace-client-processor';
import MarketplaceService from '../services/marketplace.service';
import MarketplaceState from '../process/types/marketplace-state';
import type { RootState } from '../../../store/types';
import ItemImage from '../../../common/types/item-image';
import { LazyProcessType } from '../../../common/minting/enums/lazy-process-type.enum';
import { Item } from '../../../types/item';

const { LedaAddress } = getContracts();

export const findFilteredItems = createAsyncThunk(
  'marketplace/findFilteredItems',
  async (filters: FilterType) => itemService.findPagedItems(filters)
);

export const getNewest = createAsyncThunk('marketplace/getNewest', async (qty: number) =>
  itemService.getNewest(qty)
);

export const findPagedItems = createAsyncThunk(
  'marketplace/findPagedItems',
  async (filters: FilterType) => itemService.findPagedItems(filters)
);

export const findPriceRange = createAsyncThunk('marketplace/findPriceRange', async () =>
  itemService.findPriceRange()
);

export const getOwner = createAsyncThunk('marketplace/getNftList', async () => {
  const service = new MarketplaceService();
  return service.getOwner();
});

export const listItem = createAsyncThunk(
  'marketplace/listItem',
  async (
    {
      address,
      price,
      item,
    }: {
      address: string;
      price: string;
      item: Item;
    },
    { dispatch }
  ) => {
    const { tokenId, listId, itemId, image, isLazy, royalty, owner, collectionAddress } = item;
    try {
      const listItemState = {
        address,
        collection: CollectionType.LedaNft,
        collectionAddress,
        mintEventName: ContractEvent.LogCreateItem,
        price,
        tokenId,
        itemId,
        item: { itemId },
        status: ItemStatus.Listed,
        ownerAddress: owner.address,
        listId,
        cid: image.cid,
        imageUrl: image.url,
        lazyProcessType: LazyProcessType.Listing,
        isLazy,
        royalty,
      } as MarketplaceState;

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
    {
      address,
      listId,
      itemId,
      ownerAddress,
      image,
      isLazy,
    }: {
      address: string;
      listId: number;
      itemId: string;
      ownerAddress: string;
      image: ItemImage;
      isLazy: boolean;
    },
    { dispatch }
  ) => {
    try {
      const delistItemState = {
        address,
        collection: CollectionType.LedaNft,
        collectionAddress: LedaAddress,
        mintEventName: ContractEvent.LogChangeStatus,
        itemId,
        item: { itemId },
        listId,
        ownerAddress,
        status: ItemStatus.NotListed,
        cid: image.cid,
        lazyProcessType: LazyProcessType.Delisting,
        isLazy,
        imageUrl: image.url,
        price: '0',
        royalty: 0,
      } as MarketplaceState;

      const processor = new MarketplaceClientProcessor();
      const delisted = await processor.execute(delistItemState);

      dispatch(openToastSuccess('The item has been successfully delisted from the marketplace'));

      return delisted.item;
    } catch (err) {
      if (err instanceof BusinessError) {
        dispatch(openToastError(err.message));
      }
      throw err;
    }
  }
);

export const buyItem = createAsyncThunk<
  Item,
  { address: string; item: Item },
  { dispatch: Dispatch }
>(
  'marketplace/buyItem',
  async (
    {
      address,
      item,
    }: {
      address: string;
      item: Item;
    },
    { dispatch }
  ) => {
    try {
      const { price, tokenId, itemId, listId } = item;
      const buyItemState = {
        collectionAddress: LedaAddress,
        collection: CollectionType.LedaNft,
        mintEventName: ContractEvent.LogBuyItem,
        address,
        price: String(price),
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
      address,
      image,
      isLazy,
      royalty,
      ownerAddress,
      price,
      itemId,
      listId,
    }: {
      address: string;
      image: ItemImage;
      isLazy: boolean;
      royalty: number;
      ownerAddress: string;
      price: string;
      listId: number;
      itemId: string;
    },
    { dispatch }
  ) => {
    try {
      const marketplaceState = {
        address,
        ownerAddress,
        collection: CollectionType.LedaNft,
        collectionAddress: LedaAddress,
        mintEventName: ContractEvent.LogChangePrice,
        price,
        itemId,
        item: { itemId },
        listId,
        status: ItemStatus.Listed,
        cid: image.cid,
        imageUrl: image.url,
        lazyProcessType: LazyProcessType.Listing,
        isLazy,
        royalty,
      } as MarketplaceState;

      const processor = new MarketplaceClientProcessor();
      const listed = await processor.execute(marketplaceState);

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

export const findHistoryByItemId = createAsyncThunk(
  'marketplace/findHistoryByItemId',
  async ({ itemId }: { itemId: string }) => itemService.findHistoryByItemId(itemId)
);

export const findAllHistory = createAsyncThunk('marketplace/findAllHistory', async () =>
  itemService.findAllHistory()
);

export const hideItem = createAsyncThunk(
  'marketplace/hide',
  async (itemId: string, { getState }) => {
    const { auth } = getState() as RootState;
    // TODO: This should be refactored, so it uses the same instance and token attached once the sign in is performed
    const itemSrv = new ItemService();
    return itemSrv.hide(itemId, auth.address);
  }
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
