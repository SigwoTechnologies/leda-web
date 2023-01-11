import { ContractReceipt, ethers, Event } from 'ethers';
import * as errorHandler from '../../../../../store/error/error-handler';
import MarketplaceError from '../../enums/marketplace-error.enum';
import ICommand from '../../interfaces/command.interface';
import MarketplaceState from '../../types/marketplace-state';
import ChangePriceItemCommand from './change-price-item-command';

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
    command = new ChangePriceItemCommand(marketplaceServiceMock);
  });

  describe('When calling execute function', () => {
    describe('and execution is successful', () => {
      it('should assign the marketplaceEvent state variable', async () => {
        const state = {
          price: '1',
          listId: 123,
          mintEventName: 'myEvent',
        } as MarketplaceState;

        const contractReceipt = {
          events: [{ event: state.mintEventName }] as Event[],
        } as ContractReceipt;

        const expected = {
          event: state.mintEventName,
        } as Event;

        const transaction = { wait: jest.fn() };
        const expectedWei = ethers.utils.parseUnits(String(state.price), 'ether').toString();

        marketplaceServiceMock.changePrice.mockResolvedValue(transaction);
        transaction.wait.mockResolvedValue(contractReceipt);

        const actual = await command.execute(state);

        expect(marketplaceServiceMock.init).toHaveBeenCalled();
        expect(marketplaceServiceMock.changePrice).toHaveBeenCalledWith(state.listId, expectedWei);
        expect(actual.marketplaceEvent).toEqual(expected);
      });
    });

    describe('and price is not provided', () => {
      it('should return a RequiredPrice error', async () => {
        const state = {} as MarketplaceState;

        const expected = { ...state, error: MarketplaceError.RequiredPrice } as MarketplaceState;

        const actual = await command.execute(state);

        expect(actual).toEqual(expected);
      });
    });

    describe('and listId is not provided', () => {
      it('should return RequiredListId error', async () => {
        const state = { price: '123' } as MarketplaceState;

        const expected = { ...state, error: MarketplaceError.RequiredListId };

        const actual = await command.execute(state);

        expect(actual).toEqual(expected);
      });
    });

    describe('and changePrice returns undefined', () => {
      it('should return ChangePriceItemFailure error', async () => {
        const state = {
          price: '1',
          listId: 123,
          mintEventName: 'myEvent',
        } as MarketplaceState;

        const expected = { ...state, error: MarketplaceError.ChangePriceItemFailure };

        marketplaceServiceMock.changePrice.mockResolvedValue(undefined);

        const actual = await command.execute(state);

        expect(actual).toEqual(expected);
      });
    });

    describe('and transaction returns undefined', () => {
      it('should return a ContractReceiptFailure error', async () => {
        const state = {
          price: '1',
          listId: 123,
          mintEventName: 'myEvent',
        } as MarketplaceState;

        const transaction = { wait: jest.fn() };

        marketplaceServiceMock.changePrice.mockResolvedValue(transaction);
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
          price: '1',
          listId: 123,
          mintEventName: 'myEvent',
        } as MarketplaceState;

        const contractReceipt = {
          events: [{ event: 'wrong event' }] as Event[],
        } as ContractReceipt;

        const transaction = { wait: jest.fn() };

        marketplaceServiceMock.changePrice.mockResolvedValue(transaction);
        transaction.wait.mockResolvedValue(contractReceipt);

        const expected = {
          ...state,
          error: MarketplaceError.ContractEventNotFound,
        } as MarketplaceState;

        const actual = await command.execute(state);

        expect(actual).toEqual(expected);
      });
    });

    describe('and changePrice function fails', () => {
      it('should return a ChangePrice error', async () => {
        const state = {
          price: '1',
          listId: 123,
          mintEventName: 'myEvent',
        } as MarketplaceState;

        const errorMessage = 'something went wrong';

        const expected = { ...state, error: MarketplaceError.ChangePriceItemFailure };

        jest.spyOn(errorHandler, 'rejectWithMetamask').mockResolvedValue(expected);

        marketplaceServiceMock.changePrice.mockRejectedValue(errorMessage);

        const actual = await command.execute(state);

        expect(actual).toEqual(expected);
      });
    });
  });
});
