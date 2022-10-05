import { createAsyncThunk } from '@reduxjs/toolkit';
import { Collection } from '../../../types/collection';
import { HighestBid } from '../../../types/highest-bid';
import { Product, Product2 } from '../../../types/product';
import ClientProcessor from '../../../common/minting/clients/client-processor';
import CollectionType from '../../../common/minting/enums/collection-type.enum';
import ContractEvent from '../../../common/minting/enums/contract-event.enum';
import MintState from '../../../common/minting/types/mint-state';

const getNftFromChain = async (nftId: number, url: string) => {
  const item: Product2 = {
    id: nftId,
    title: '',
    slug: 'slug',
    images: [{ src: url, alt: nftId.toString() }],
    publishedAt: '999999',
    price: { amount: 1000, currency: 'ETH' },
    owner: {
      name: '',
      slug: '',
      image: { src: '', alt: '' },
      totalSale: 999,
      twitter: '',
      followers: '',
      following: '',
    },
    latestBid: '1212',
    likeCount: 20,
    categories: [],
    authors: [],
    bitCount: 10,
    collection: {} as Collection,
    highestBid: {} as HighestBid,
    tags: [],
    properties: [],
    bids: [],
    history: [],
  };

  return item;
};

const createNft = createAsyncThunk(
  'nft/createNft',
  async ({ blob, name, discription, royalty }: Product): Promise<Product2 | undefined> => {
    const mintState = {
      blob,
      collection: CollectionType.JupNft,
      description: discription,
      mintEventName: ContractEvent.LogNFTMinted,
      name,
      royalty,
    } as MintState;

    const processor = new ClientProcessor();
    const mintedNft = await processor.execute(mintState);

    // TODO: Create item object creation command
    // TODO: Unit test
    // TODO: Exception handling

    return getNftFromChain(mintedNft.tokenId, mintedNft.ipfsUrl);
  }
);

export default createNft;
