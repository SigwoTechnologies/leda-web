import { createAsyncThunk } from '@reduxjs/toolkit';
import { Item, ItemRequest } from '@types';
import Router from 'next/router';
import BusinessError from '../../../common/exceptions/business-error';
import ClientProcessor from '../../../common/minting/clients/client-processor';
import CollectionType from '../../../common/minting/enums/collection-type.enum';
import ContractEvent from '../../../common/minting/enums/contract-event.enum';
import { LazyProcessType } from '../../../common/minting/enums/lazy-process-type.enum';
import MintState from '../../../common/minting/types/mint-state';
import { openToastError, openToastSuccess } from '../../../store/ui/ui.slice';
import { getContracts } from '../../../utils/getContracts';
import { setIsModalOpen } from '../../marketplace/store/marketplace.slice';
import { itemService } from '../services/item.service';

export const mintNft = createAsyncThunk<Item | undefined, ItemRequest, { rejectValue: void }>(
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
        blob,
        collection,
        collectionAddress: LedaAddress,
        description,
        isLazy,
        itemProperties,
        name,
        price,
        royalty: +royalty,
        tags,
        collectionType: CollectionType.LedaNft,
        mintEventName: ContractEvent.LogNFTMinted,
        lazyProcessType: LazyProcessType.Activation,
      } as MintState;
      console.log({ mintState });

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

export const redeemVoucher = createAsyncThunk<
  Item | undefined,
  { address: string; item: Item },
  { rejectValue: void }
>(
  'nft/redeemVoucher',
  async (
    { address, item }: { address: string; item: Item },
    { dispatch }
  ): Promise<Item | undefined> => {
    try {
      const redeemState = {
        address,
        collectionType: CollectionType.LedaNft,
        mintEventName: ContractEvent.TransferEvent,
        item,
        collectionAddress: item.collectionAddress,
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

export const getNewest = createAsyncThunk('nft/getNewest', async (qty: number) =>
  itemService.getNewest(qty)
);
