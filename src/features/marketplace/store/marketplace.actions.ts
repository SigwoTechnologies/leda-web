import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ledaNftService } from '../../leda-nft/services/leda-nft.service';
import { openToastError, openToastSuccess } from '../../../store/ui/ui.slice';
import BusinessError from '../../../common/exceptions/business-error';
import CollectionType from '../../../common/minting/enums/collection-type.enum';
import ContractEvent from '../process/enums/contract-event.enum';
import LedaAddress from '../../../contracts/LedaNFT-address.json';
import MarketplaceClientProcessor from '../process/clients/marketplace-client-processor';
import MarketplaceService from '../services/marketplace.service';
import MarketplaceState from '../process/types/marketplace-state';
import { itemService } from '../../leda-nft/services/item.service';

export const getOwner = createAsyncThunk('marketplace/getNftList', async () => {
  const service = new MarketplaceService(ledaNftService);
  return service.getOwner();
});

export const listItem = createAsyncThunk(
  'marketplace/listItem',
  async (
    {
      price,
      tokenId,
      itemId,
      ownerAddress,
    }: { price: string; tokenId: number; itemId: string; ownerAddress: string },
    { dispatch }
  ) => {
    try {
      const makeItemState = {
        collection: CollectionType.LedaNft,
        collectionAddress: LedaAddress.address,
        mintEventName: ContractEvent.LogCreateItem,
        price,
        tokenId,
        itemId,
        ownerAddress,
      } as MarketplaceState;

      const processor = new MarketplaceClientProcessor();
      const listed = await processor.execute(makeItemState);

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

export const fetchNfts = createAsyncThunk('nft/fetchNFTs', async (page: number) => {
  try {
    const response = await axios.get(`http://localhost:3334/v1/items?limit=5&page=${page}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
  return null;
});

export const findMarketplace = createAsyncThunk('nft/findAll', async () =>
  itemService.findMarketplaceItems()
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
        collectionAddress: LedaAddress.address,
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

      dispatch(openToastSuccess('The NFT has been bought successfully'));

      return bought.item;
    } catch (err) {
      if (err instanceof BusinessError) {
        dispatch(openToastError(err.message));
      }
      throw err;
    }
  }
);
