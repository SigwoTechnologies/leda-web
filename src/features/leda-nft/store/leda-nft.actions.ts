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
  setIsModalOpen,
  setSelectedItem,
} from '../../marketplace/store/marketplace.slice';
import { itemService } from '../services/item.service';
import { LazyProcessType } from '../../../common/minting/enums/lazy-process-type.enum';

const mintNft = createAsyncThunk<Item | undefined, ItemRequest, { rejectValue: void }>(
  'nft/mintNft',
  async (
    {
      address,
      blob,
      name,
      collection,
      description,
      royalty,
      tags,
      itemProperties,
      isLazy,
      price,
    }: ItemRequest,
    { dispatch }
  ): Promise<Item | undefined> => {
    const { LedaAddress } = getContracts();

    try {
      const mintState = {
        address,
        tags,
        collection,
        blob,
        collectionType: CollectionType.LedaNft,
        itemProperties,
        collectionAddress: LedaAddress,
        description,
        mintEventName: ContractEvent.LogNFTMinted,
        name,
        royalty: +royalty,
        isLazy,
        price,
        lazyProcessType: LazyProcessType.Activation,
      } as MintState;

      const processor = new ClientProcessor();
      const minted = await processor.execute(mintState);

      Router.push(`item/${minted.item.itemId}`);

      dispatch(openToastSuccess('The NFT has been created successfully.'));

      return minted.item;
    } catch (err) {
      if (err instanceof BusinessError) dispatch(openToastError(err.message));
      throw err;
    }
  }
);

const redeemVoucher = createAsyncThunk<
  Item | undefined,
  { address: string; itemId: string },
  { rejectValue: void }
>(
  'nft/redeemVoucher',
  async (
    { address, itemId }: { address: string; itemId: string },
    { dispatch }
  ): Promise<Item | undefined> => {
    try {
      const redeemState = {
        address,
        collectionType: CollectionType.LedaNft,
        mintEventName: ContractEvent.TransferEvent,
        item: { itemId },
      } as MintState;

      const processor = new ClientProcessor();
      const minted = await processor.execute(redeemState);

      Router.push('/author');

      dispatch(openToastSuccess('The NFT has been purchased successfully.'));
      dispatch(setIsModalOpen(false));

      return minted.item;
    } catch (err) {
      if (err instanceof BusinessError) dispatch(openToastError(err.message));
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

export { findAll, findById, mintNft, redeemVoucher };
