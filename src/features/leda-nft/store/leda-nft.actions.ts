import { createAsyncThunk } from '@reduxjs/toolkit';
import { Item, ItemRequest } from '@types';
import Router from 'next/router';
import { getContracts } from '../../../utils/getContracts';
import BusinessError from '../../../common/exceptions/business-error';
import ClientProcessor from '../../../common/minting/clients/client-processor';
import CollectionType from '../../../common/minting/enums/collection-type.enum';
import ContractEvent from '../../../common/minting/enums/contract-event.enum';
import MintState from '../../../common/minting/types/mint-state';
import { openToastError, openToastSuccess } from '../../../store/ui/ui.slice';
import {
  setIsLoadingSelectedItem,
  setSelectedItem,
} from '../../marketplace/store/marketplace.slice';
import { itemService } from '../services/item.service';

const { LedaAddress } = getContracts();

const mintNft = createAsyncThunk<Item | undefined, ItemRequest, { rejectValue: void }>(
  'nft/mintNft',
  async (
    { address, blob, name, description, royalty, tags, itemProperties, isLazy }: ItemRequest,
    { dispatch }
  ): Promise<Item | undefined> => {
    try {
      const mintState = {
        address,
        tags,
        collectionAddress: LedaAddress,
        blob,
        itemProperties,
        collection: CollectionType.LedaNft,
        description,
        mintEventName: ContractEvent.LogNFTMinted,
        name,
        royalty: +royalty,
      } as MintState;

      const processor = new ClientProcessor();
      const minted = await processor.execute(mintState);
      Router.push(`item/${minted.item.itemId}`);

      dispatch(openToastSuccess('The NFT has been created successfully.'));

      return minted.item;
    } catch (err) {
      if (err instanceof BusinessError) dispatch(openToastError(err.message));
      dispatch(openToastError('Something went wrong creating the NFT'));
      throw err;
    }
  }
);

const findAll = createAsyncThunk('nft/findAll', async () => itemService.findAll());

const findById = createAsyncThunk('nft/findById', async (itemId: string, { dispatch }) => {
  dispatch(setIsLoadingSelectedItem(true));
  const item = await itemService.findById(itemId);
  dispatch(setSelectedItem(item));
  dispatch(setIsLoadingSelectedItem(false));
  return item;
});

export { findAll, findById, mintNft };
