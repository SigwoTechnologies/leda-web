import { createAsyncThunk, Dispatch } from '@reduxjs/toolkit';
import Router from 'next/router';
import type { RootState } from '../../../store/types';
import { openToastError, openToastSuccess } from '../../../store/ui/ui.slice';
import BusinessError from '../../../common/exceptions/business-error';
import CollectionType from '../../../common/minting/enums/collection-type.enum';
import ItemStatus from '../../../common/minting/enums/item-status.enum';
import { LazyProcessType } from '../../../common/minting/enums/lazy-process-type.enum';
import { Item } from '../../../types/item';
import { FilterType, FilterTypeBase } from '../../../types/item-filter-types';
import { getContracts } from '../../../utils/getContracts';
import ItemService, { itemService } from '../../leda-nft/services/item.service';
import MarketplaceClientProcessor from '../process/clients/marketplace-client-processor';
import ContractEvent from '../process/enums/contract-event.enum';
import MarketplaceState from '../process/types/marketplace-state';

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

export const listItem = createAsyncThunk<
  Item,
  {
    address: string;
    price: string;
    item: Item;
  }
>('marketplace/listItem', async ({ address, price, item }, { dispatch }) => {
  const {
    tokenId,
    listId,
    itemId,
    image,
    isLazy,
    royalty,
    owner,
    collectionAddress,
    stakingRewards,
  } = item;
  try {
    const listItemState = {
      address,
      collection: CollectionType.LedaNft,
      collectionAddress,
      mintEventName: ContractEvent.LogCreateItem,
      price,
      tokenId,
      itemId,
      item: { itemId, stakingRewards },
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
});

export const delistItem = createAsyncThunk(
  'marketplace/delistItem',
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
      const { listId, itemId, owner, image, isLazy, collectionAddress } = item;
      const delistItemState = {
        address,
        collection: CollectionType.LedaNft,
        collectionAddress,
        mintEventName: ContractEvent.LogChangeStatus,
        itemId,
        item: { itemId, stakingRewards: 0 },
        listId,
        ownerAddress: owner.address,
        status: ItemStatus.NotListed,
        cid: image.cid,
        lazyProcessType: LazyProcessType.Delisting,
        isLazy,
        imageUrl: image.url,
        price: '0',
        royalty: 0,
        tokenId: 0,
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
      price,
      address,
      item,
    }: {
      address: string;
      price: string;
      item: Item;
    },
    { dispatch }
  ) => {
    try {
      const { image, isLazy, royalty, owner, listId, tokenId, itemId, stakingRewards } = item;
      const marketplaceState = {
        address,
        ownerAddress: owner.address,
        collection: CollectionType.LedaNft,
        collectionAddress: item.collectionAddress,
        mintEventName: ContractEvent.LogChangePrice,
        price,
        itemId,
        item: { itemId, stakingRewards },
        listId,
        tokenId,
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

export const findAllHistory = createAsyncThunk(
  'marketplace/findAllHistory',
  async ({ limit, page }: FilterTypeBase) => itemService.findAllHistory({ limit, page })
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
