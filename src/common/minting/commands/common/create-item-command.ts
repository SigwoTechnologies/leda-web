import { Collection, HighestBid, Product2 } from '@types';
import ICommand from '../../interfaces/command.interface';
import MintState from '../../types/mint-state';
import MintError from '../../enums/mint-error';

export default class CreateItemCommand implements ICommand<MintState> {
  async execute(state: MintState): Promise<MintState> {
    if (!state.tokenId) return { ...state, error: MintError.RequiredTokenId };
    if (!state.ipfsUrl) return { ...state, error: MintError.RequiredIpfsUrl };
    if (!state.name) return { ...state, error: MintError.RequiredName };

    // TODO: Update hardcoded values once backend is implemented
    const item: Product2 = {
      id: state.tokenId,
      title: state.name,
      slug: state.tokenId.toString(),
      images: [{ src: state.ipfsUrl, alt: state.name }],
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

    state.item = item;
    return state;
  }
}
