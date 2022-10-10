import { createAsyncThunk } from '@reduxjs/toolkit';
import { Item, ItemRequest } from '@types';
import ClientProcessor from '../../../common/minting/clients/client-processor';
import CollectionType from '../../../common/minting/enums/collection-type.enum';
import ContractEvent from '../../../common/minting/enums/contract-event.enum';
import MintState from '../../../common/minting/types/mint-state';
import ItemService from '../services/item.service';
import collectionAddress from '../../../contracts/LedaNFT-address.json';
import { openToast } from '../../../store/ui/ui.slice';

const mintNft = createAsyncThunk(
  'nft/mintNft',
  async (
    { address, blob, name, description, royalty }: ItemRequest,
    { dispatch }
  ): Promise<Item | undefined> => {
    const mintState = {
      address,
      collectionAddress: collectionAddress.address,
      blob,
      collection: CollectionType.LedaNft,
      description,
      mintEventName: ContractEvent.LogNFTMinted,
      name,
      royalty: +royalty,
    } as MintState;

    const processor = new ClientProcessor();
    const minted = await processor.execute(mintState);

    dispatch(openToast({ type: 'success', text: 'The NFT has been created successfully' }));

    return minted.item;
  }
);

const findAll = createAsyncThunk('nft/findAll', async () => {
  const itemService = new ItemService();
  return itemService.findAll();
});

export { findAll, mintNft };
