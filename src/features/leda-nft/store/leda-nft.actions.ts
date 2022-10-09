import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product, Product2 } from '../../../types/product';
import ClientProcessor from '../../../common/minting/clients/client-processor';
import CollectionType from '../../../common/minting/enums/collection-type.enum';
import ContractEvent from '../../../common/minting/enums/contract-event.enum';
import MintState from '../../../common/minting/types/mint-state';
import ItemService from '../services/item.service';

const mintNft = createAsyncThunk(
  'nft/mintNft',
  async ({ blob, name, description, royalty, price }: Product): Promise<Product2 | undefined> => {
    const mintState = {
      address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', // TODO: Remove hardcoded address. testing purposes
      collectionAddress: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', // TODO: Remove hardcoded
      blob,
      collection: CollectionType.LedaNft,
      description,
      mintEventName: ContractEvent.LogNFTMinted,
      name,
      royalty,
      price,
    } as MintState;

    const processor = new ClientProcessor();
    const minted = await processor.execute(mintState);
    return minted.item;
  }
);

const findAll = createAsyncThunk('nft/findAll', async () => {
  const itemService = new ItemService();
  return itemService.findAll();
});

const findNewest = createAsyncThunk('nft/findNewest', async () => {
  const itemService = new ItemService();
  return itemService.findNewest();
});

export { findAll, findNewest, mintNft };
