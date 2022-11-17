import { Item } from '@types';
import ItemStatus from '../../enums/item-status.enum';
import MintError from '../../enums/mint-error.enum';
import ICommand from '../../interfaces/command.interface';
import MintState from '../../types/mint-state';
import ActivateItemCommand from './activate-item-command';

const itemServiceMock = {
  findAll: jest.fn(),
  findById: jest.fn(),
  buy: jest.fn(),
  list: jest.fn(),
  delist: jest.fn(),
  create: jest.fn(),
  activate: jest.fn(),
  findAllHistory: jest.fn(),
  findHistoryByItemId: jest.fn(),
};

describe('ActivateItemCommand', () => {
  let command: ICommand<MintState>;

  beforeAll(() => {
    command = new ActivateItemCommand(itemServiceMock);
  });

  describe('When calling function execute', () => {
    describe('and execution is successful', () => {
      it('should assign the item correctly', async () => {
        const state = {
          address: '123',
          cid: '123',
          imageUrl: 'url',
          item: { itemId: '123' } as Item,
          tokenId: 123,
        } as MintState;

        const expectedItem = { ...state.item, status: ItemStatus.NotListed };
        const expected = { ...state, item: expectedItem } as MintState;

        itemServiceMock.activate.mockResolvedValue(expectedItem);

        const actual = await command.execute(state);

        expect(actual).toEqual(expected);
      });
    });

    describe('and item is not provided', () => {
      it('should assign a RequiredItemId to state', async () => {
        const state = {} as MintState;

        const expected = { ...state, error: MintError.RequiredItemId };

        const actual = await command.execute(state);

        expect(actual).toEqual(expected);
      });
    });

    describe('and address is not provided', () => {
      it('should assign a RequiredAddress to state', async () => {
        const state = { item: { itemId: '123' } as Item } as MintState;

        const expected = { ...state, error: MintError.RequiredAddress };

        const actual = await command.execute(state);

        expect(actual).toEqual(expected);
      });
    });

    describe('and cid is not provided', () => {
      it('should assign a RequiredCid to state', async () => {
        const state = { address: '123', item: { itemId: '123' } as Item } as MintState;

        const expected = { ...state, error: MintError.RequiredCid };

        const actual = await command.execute(state);

        expect(actual).toEqual(expected);
      });
    });

    describe('and imageUrl is not provided', () => {
      it('should assign a RequiredImageUrl to state', async () => {
        const state = {
          address: '123',
          item: { itemId: '123' } as Item,
          cid: '123',
        } as MintState;

        const expected = { ...state, error: MintError.RequiredImageUrl };

        const actual = await command.execute(state);

        expect(actual).toEqual(expected);
      });
    });

    describe('and tokenId is not provided', () => {
      it('should assign a RequiredTokenId to state', async () => {
        const state = {
          address: '123',
          item: { itemId: '123' } as Item,
          cid: '123',
          imageUrl: 'url',
        } as MintState;

        const expected = { ...state, error: MintError.RequiredTokenId };

        const actual = await command.execute(state);

        expect(actual).toEqual(expected);
      });
    });

    describe('and image service upload function fails', () => {
      it('should assign an IpfsStoreFailure to state', async () => {
        const state = {
          address: '123',
          cid: '123',
          imageUrl: 'url',
          item: { itemId: '123' } as Item,
          tokenId: 123,
        } as MintState;

        const expected = { ...state, error: MintError.ActivateItemFailure };

        itemServiceMock.activate.mockRejectedValue('something went wrong.');

        const actual = await command.execute(state);

        expect(actual).toEqual(expected);
      });
    });
  });
});
