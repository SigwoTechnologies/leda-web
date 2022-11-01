import { createAsyncThunk } from '@reduxjs/toolkit';
import { ledaNftService } from '../../leda-nft/services/leda-nft.service';
import { openToastError, openToastSuccess } from '../../../store/ui/ui.slice';
import BusinessError from '../../../common/exceptions/business-error';
import CollectionType from '../../../common/minting/enums/collection-type.enum';
import ContractEvent from '../process/enums/contract-event.enum';
import LedaAddress from '../../../contracts/LedaNFT-address.json';
import MarketplaceClientProcessor from '../process/clients/marketplace-client-processor';
import MarketplaceService from '../services/marketplace.service';
import MarketplaceState from '../process/types/marketplace-state';

export const getOwner = createAsyncThunk('marketplace/getNftList', async () => {
  const service = new MarketplaceService(ledaNftService);
  return service.getOwner();
});

export const listItem = createAsyncThunk(
  'marketplace/listItem',
  async (
    { price, tokenId, itemId }: { price: string; tokenId: number; itemId: string },
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
