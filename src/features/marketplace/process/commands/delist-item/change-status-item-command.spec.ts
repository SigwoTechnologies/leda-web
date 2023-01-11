import { ContractReceipt, Event } from 'ethers';
import * as errorHandler from '../../../../../store/error/error-handler';
import ItemStatus from '../../../../../common/minting/enums/item-status.enum';
import MarketplaceError from '../../enums/marketplace-error.enum';
import ICommand from '../../interfaces/command.interface';
import MarketplaceState from '../../types/marketplace-state';
import ChangeStatusItemCommand from './change-status-item-command';

const marketplaceServiceMock = {
  init: jest.fn(),
  getOwner: jest.fn(),
  listItem: jest.fn(),
  buyItem: jest.fn(),
  getItem: jest.fn(),
  changeStatusItem: jest.fn(),
  changePrice: jest.fn(),
};

jest.mock('../../../../../store/error/error-handler', () => ({
  rejectWithMetamask: jest.fn(),
}));

describe('ListItemCommand', () => {
  let command: ICommand<MarketplaceState>;

  beforeAll(() => {
    command = new ChangeStatusItemCommand(marketplaceServiceMock);
  });

  describe('When calling execute function', () => {
    describe('and execution is successful', () => {
      it('should assign the marketplaceEvent state variable', async () => {
        const state = {
          listId: 1,
          itemId: '1',
          mintEventName: 'myEvent',
          status: ItemStatus.NotListed,
        } as MarketplaceState;

        const contractReceipt = {
          events: [{ event: state.mintEventName }] as Event[],
        } as ContractReceipt;

        const expected = {
          event: state.mintEventName,
        } as Event;

        const transaction = { wait: jest.fn() };

        marketplaceServiceMock.changeStatusItem.mockResolvedValue(transaction);
        transaction.wait.mockResolvedValue(contractReceipt);

        const actual = await command.execute(state);

        expect(marketplaceServiceMock.init).toHaveBeenCalled();
        expect(marketplaceServiceMock.changeStatusItem).toHaveBeenCalledWith(
          state.listId,
          Number(state.status)
        );
        expect(actual.marketplaceEvent).toEqual(expected);
      });
    });

    describe('and listId is not provided', () => {
      it('should return a RequiredListId error', async () => {
        const state = {} as MarketplaceState;

        const expected = { ...state, error: MarketplaceError.RequiredListId } as MarketplaceState;

        const actual = await command.execute(state);

        expect(actual).toEqual(expected);
      });
    });

    describe('and itemId is not provided', () => {
      it('should return RequiredItemId error', async () => {
        const state = { listId: 1 } as MarketplaceState;

        const expected = { ...state, error: MarketplaceError.RequiredItemId };

        const actual = await command.execute(state);

        expect(actual).toEqual(expected);
      });
    });

    describe('and changeStatusItem returns undefined', () => {
      it('should return ChangeStatusUnsuccessful error', async () => {
        const state = {
          listId: 1,
          itemId: '1',
          mintEventName: 'myEvent',
          status: ItemStatus.NotListed,
        } as MarketplaceState;

        const expected = { ...state, error: MarketplaceError.ChangeStatusUnsuccessful };

        marketplaceServiceMock.changeStatusItem.mockResolvedValue(undefined);

        const actual = await command.execute(state);

        expect(actual).toEqual(expected);
      });
    });

    describe('and transaction returns undefined', () => {
      it('should return a ContractReceiptFailure error', async () => {
        const state = {
          listId: 1,
          itemId: '1',
          mintEventName: 'myEvent',
          status: ItemStatus.NotListed,
        } as MarketplaceState;

        const transaction = { wait: jest.fn() };

        marketplaceServiceMock.changeStatusItem.mockResolvedValue(transaction);
        transaction.wait.mockResolvedValue(undefined);

        const expected = {
          ...state,
          error: MarketplaceError.ContractReceiptFailure,
        } as MarketplaceState;

        const actual = await command.execute(state);

        expect(actual).toEqual(expected);
      });
    });

    describe('and contract receipt is not found', () => {
      it('should return a ContractEventNotFound error', async () => {
        const state = {
          listId: 1,
          itemId: '1',
          mintEventName: 'myEvent',
          status: ItemStatus.NotListed,
        } as MarketplaceState;

        const contractReceipt = {
          events: [{ event: 'wrong event' }] as Event[],
        } as ContractReceipt;

        const transaction = { wait: jest.fn() };

        marketplaceServiceMock.changeStatusItem.mockResolvedValue(transaction);
        transaction.wait.mockResolvedValue(contractReceipt);

        const expected = {
          ...state,
          error: MarketplaceError.ContractEventNotFound,
        } as MarketplaceState;

        const actual = await command.execute(state);

        expect(actual).toEqual(expected);
      });
    });

    describe('and listing function fails', () => {
      it('should return a ChangeStatusItemFailure error', async () => {
        const state = {
          listId: 1,
          itemId: '1',
          mintEventName: 'myEvent',
          status: ItemStatus.NotListed,
        } as MarketplaceState;

        const errorMessage = 'something went wrong';

        const expected = { ...state, error: MarketplaceError.ChangeStatusItemFailure };

        jest.spyOn(errorHandler, 'rejectWithMetamask').mockResolvedValue(expected);

        marketplaceServiceMock.changeStatusItem.mockRejectedValue(errorMessage);

        const actual = await command.execute(state);

        expect(actual).toEqual(expected);
      });
    });
  });
});
