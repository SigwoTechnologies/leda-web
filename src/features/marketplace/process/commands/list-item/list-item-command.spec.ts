import { ContractReceipt, ethers, Event } from 'ethers';
import MarketplaceError from '../../enums/marketplace-error.enum';
import ICommand from '../../interfaces/command.interface';
import MarketplaceState from '../../types/marketplace-state';
import ListItemCommand from './list-item-command';
import * as errorHandler from '../../../../../store/error/error-handler';

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
    command = new ListItemCommand(marketplaceServiceMock);
  });

  describe('When calling execute function', () => {
    describe('and execution is successful', () => {
      it('should assign the marketplaceEvent state variable', async () => {
        const state = {
          price: '1',
          tokenId: 123,
          collectionAddress: 'test',
          mintEventName: 'myEvent',
          ownerAddress: 'ownerAddress',
          isContractApproved: true,
        } as MarketplaceState;

        const contractReceipt = {
          events: [{ event: state.mintEventName }] as Event[],
        } as ContractReceipt;

        const expected = {
          event: state.mintEventName,
        } as Event;

        const transaction = { wait: jest.fn() };
        const expectedWei = ethers.utils.parseUnits(String(state.price), 'ether').toString();

        marketplaceServiceMock.listItem.mockResolvedValue(transaction);
        transaction.wait.mockResolvedValue(contractReceipt);

        const actual = await command.execute(state);

        expect(marketplaceServiceMock.init).toHaveBeenCalled();
        expect(marketplaceServiceMock.listItem).toHaveBeenCalledWith(
          state.collectionAddress,
          state.tokenId,
          expectedWei,
          state.ownerAddress
        );
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

    describe('and tokenId is not provided', () => {
      it('should return RequiredTokenId error', async () => {
        const state = { price: '123' } as MarketplaceState;

        const expected = { ...state, error: MarketplaceError.RequiredTokenId };

        const actual = await command.execute(state);

        expect(actual).toEqual(expected);
      });
    });

    describe('and collectionAddress is not provided', () => {
      it('should return RequiredCollectionAddress error', async () => {
        const state = { price: '123', tokenId: 123 } as MarketplaceState;

        const expected = { ...state, error: MarketplaceError.RequiredCollectionAddress };

        const actual = await command.execute(state);

        expect(actual).toEqual(expected);
      });
    });

    describe('and isContractApproved is not provided', () => {
      it('should return RequiredIsContractApproved error', async () => {
        const state = { price: '123', tokenId: 123, collectionAddress: '123' } as MarketplaceState;

        const expected = { ...state, error: MarketplaceError.RequiredContractApproval };

        const actual = await command.execute(state);

        expect(actual).toEqual(expected);
      });
    });

    describe('and listItem returns undefined', () => {
      it('should return ListItemUnsuccessful error', async () => {
        const state = {
          price: '1',
          tokenId: 123,
          collectionAddress: 'test',
          isContractApproved: true,
        } as MarketplaceState;

        const expected = { ...state, error: MarketplaceError.ListItemUnsuccessful };

        marketplaceServiceMock.listItem.mockResolvedValue(undefined);

        const actual = await command.execute(state);

        expect(actual).toEqual(expected);
      });
    });

    describe('and transaction returns undefined', () => {
      it('should return a ContractReceiptFailure error', async () => {
        const state = {
          price: '1',
          tokenId: 123,
          collectionAddress: 'test',
          isContractApproved: true,
        } as MarketplaceState;

        const transaction = { wait: jest.fn() };

        marketplaceServiceMock.listItem.mockResolvedValue(transaction);
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
          tokenId: 123,
          collectionAddress: 'test',
          mintEventName: 'notFoundEventName',
          isContractApproved: true,
        } as MarketplaceState;

        const contractReceipt = {
          events: [{ event: 'wrong event' }] as Event[],
        } as ContractReceipt;

        const transaction = { wait: jest.fn() };

        marketplaceServiceMock.listItem.mockResolvedValue(transaction);
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
      it('should return a ListItemFailure error', async () => {
        const state = {
          price: '1',
          tokenId: 123,
          collectionAddress: 'test',
          isContractApproved: true,
        } as MarketplaceState;

        const errorMessage = 'something went wrong';

        const expected = { ...state, error: MarketplaceError.ListItemFailure };

        jest.spyOn(errorHandler, 'rejectWithMetamask').mockResolvedValue(expected);

        marketplaceServiceMock.listItem.mockRejectedValue(errorMessage);

        const actual = await command.execute(state);

        expect(actual).toEqual(expected);
      });
    });
  });
});
