import ItemStatus from '../../enums/item-status.enum';
import MintError from '../../enums/mint-error.enum';
import ICommand from '../../interfaces/command.interface';
import MintState from '../../types/mint-state';
import StoreDraftItemCommand from './store-draft-item-command';

const itemServiceMock = {
  findAll: jest.fn(),
  findById: jest.fn(),
  buy: jest.fn(),
  list: jest.fn(),
  delist: jest.fn(),
  create: jest.fn(),
  processLazyItem: jest.fn(),
  activate: jest.fn(),
  findAllHistory: jest.fn(),
  findHistoryByItemId: jest.fn(),
};

describe('ActivateItemCommand', () => {
  let command: ICommand<MintState>;

  beforeAll(() => {
    command = new StoreDraftItemCommand(itemServiceMock);
  });

  describe('When calling function execute', () => {
    describe('and execution is successful', () => {
      it('should assign the item correctly', async () => {
        const state = {
          address: '123',
          collectionAddress: '123',
          description: 'description',
          name: 'test',
          royalty: 1,
          tags: ['green', 'glasses'],
        } as MintState;

        const expectedItem = { ...state.item, status: ItemStatus.Draft };
        const expected = { ...state, item: expectedItem } as MintState;

        itemServiceMock.create.mockResolvedValue(expectedItem);

        const actual = await command.execute(state);

        expect(actual).toEqual(expected);
      });
    });

    describe('and address is not provided', () => {
      it('should assign a RequiredAddress error to state', async () => {
        const state = {} as MintState;

        const expected = { ...state, error: MintError.RequiredAddress };

        const actual = await command.execute(state);

        expect(actual).toEqual(expected);
      });
    });

    describe('and collectionAddress is not provided', () => {
      it('should assign a RequiredCollectionAddress error to state', async () => {
        const state = { address: '123' } as MintState;

        const expected = { ...state, error: MintError.RequiredCollectionAddress };

        const actual = await command.execute(state);

        expect(actual).toEqual(expected);
      });
    });

    describe('and description is not provided', () => {
      it('should assign a RequiredDescription error to state', async () => {
        const state = { address: '123', collectionAddress: '123' } as MintState;

        const expected = { ...state, error: MintError.RequiredDescription };

        const actual = await command.execute(state);

        expect(actual).toEqual(expected);
      });
    });

    describe('and name is not provided', () => {
      it('should assign a RequiredName error to state', async () => {
        const state = {
          address: '123',
          collectionAddress: '123',
          description: 'description test',
        } as MintState;

        const expected = { ...state, error: MintError.RequiredName };

        const actual = await command.execute(state);

        expect(actual).toEqual(expected);
      });
    });

    describe('and royalty is not provided', () => {
      it('should assign a RequiredRoyalty error to state', async () => {
        const state = {
          address: '123',
          collectionAddress: '123',
          description: 'description test',
          name: 'test',
        } as MintState;

        const expected = { ...state, error: MintError.RequiredRoyalty };

        const actual = await command.execute(state);

        expect(actual).toEqual(expected);
      });
    });

    describe('and tags array is not provided', () => {
      it('should assign a RequiredTags error to state', async () => {
        const state = {
          address: '123',
          collectionAddress: '123',
          description: 'description test',
          name: 'test',
          royalty: 1,
        } as MintState;

        const expected = { ...state, error: MintError.RequiredTags };

        const actual = await command.execute(state);

        expect(actual).toEqual(expected);
      });
    });

    describe('and item service create function fails', () => {
      it('should assign an StoreDraftItemFailure to state', async () => {
        const state = {
          address: '123',
          collectionAddress: '123',
          description: 'description',
          name: 'test',
          royalty: 1,
          tags: ['green', 'glasses'],
        } as MintState;

        const expected = { ...state, error: MintError.StoreDraftItemFailure };

        itemServiceMock.create.mockRejectedValue('something went wrong.');

        const actual = await command.execute(state);

        expect(actual).toEqual(expected);
      });
    });
  });
});
