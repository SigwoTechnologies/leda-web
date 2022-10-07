import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product, Product2 } from '../../../types/product';
import ClientProcessor from '../../../common/minting/clients/client-processor';
import CollectionType from '../../../common/minting/enums/collection-type.enum';
import ContractEvent from '../../../common/minting/enums/contract-event.enum';
import MintState from '../../../common/minting/types/mint-state';
import ItemService from '../services/item.service';

const createNft = createAsyncThunk(
  'nft/createNft',
  async ({ blob, name, discription, royalty }: Product): Promise<Product2 | undefined> => {
    const mintState = {
      blob,
      collection: CollectionType.LedaNft,
      description: discription,
      mintEventName: ContractEvent.LogNFTMinted,
      name,
      royalty,
    } as MintState;

    const processor = new ClientProcessor();
    const mintedNft = await processor.execute(mintState);

    return mintedNft.item;
  }
);

const findAll = createAsyncThunk('nft/findAll', async () => {
  const itemService = new ItemService();
  return itemService.findAll();
});

export { createNft, findAll };
