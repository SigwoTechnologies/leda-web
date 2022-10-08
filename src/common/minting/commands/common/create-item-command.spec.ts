import { Collection, HighestBid, Product2 } from '../../../../types';
import MintError from '../../enums/mint-error';
import ICommand from '../../interfaces/command.interface';
import MintState from '../../types/mint-state';
import CreateItemCommand from './create-item-command';

describe('Create Item Command', () => {
  describe('When executing the command', () => {
    let command: ICommand<MintState>;

    beforeAll(() => {
      command = new CreateItemCommand();
    });
    describe('and execution is successful', () => {
      it('should attach the item and return the mint state object', async () => {
        const state = {
          tokenId: 20,
          imageUrl: 'test url',
          name: 'test name',
        } as MintState;

        const expected: Product2 = {
          id: state.tokenId,
          title: state.name,
          slug: state.tokenId.toString(),
          images: [{ src: state.imageUrl, alt: state.name }],
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

        const actual = await command.execute(state);

        expect(actual.item).toEqual(expected);
        expect(actual.error).toBeUndefined();
      });
    });
    describe('and tokenId is not provided', () => {
      it('should return a RequiredTokenId error', async () => {
        const state = {} as MintState;

        const expected = MintError.RequiredTokenId;

        const actual = await command.execute(state);

        expect(actual.error).toEqual(expected);
        expect(actual.item).toBeUndefined();
      });
    });
    describe('and imageUrl is not provided', () => {
      it('should return a RequiredImageUrl error', async () => {
        const state = {
          tokenId: 12,
        } as MintState;

        const expected = MintError.RequiredImageUrl;

        const actual = await command.execute(state);

        expect(actual.error).toEqual(expected);
        expect(actual.item).toBeUndefined();
      });
    });
    describe('and name is not provided', () => {
      it('should return a RequiredName error', async () => {
        const state = {
          tokenId: 12,
          imageUrl: 'test url',
        } as MintState;

        const expected = MintError.RequiredName;

        const actual = await command.execute(state);

        expect(actual.error).toEqual(expected);
        expect(actual.item).toBeUndefined();
      });
    });
  });
});
