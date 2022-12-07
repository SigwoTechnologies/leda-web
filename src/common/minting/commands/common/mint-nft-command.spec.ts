import { ContractReceipt, Event } from 'ethers';
import MintError from '../../enums/mint-error.enum';
import ICommand from '../../interfaces/command.interface';
import MintState from '../../types/mint-state';
import MintNftCommand from './mint-nft-command';
import * as errorHandler from '../../../../store/error/error-handler';

const nftServiceMock = {
  init: jest.fn(),
  mint: jest.fn(),
  approveForAll: jest.fn(),
  isApproveForAll: jest.fn(),
  redeem: jest.fn(),
};

jest.mock('../../../../store/error/error-handler', () => ({
  rejectWithMetamask: jest.fn(),
}));

describe('MintNftCommand', () => {
  let command: ICommand<MintState>;

  beforeAll(() => {
    command = new MintNftCommand(nftServiceMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('When calling function execute', () => {
    describe('and execution is successful', () => {
      it('should assign the mintEvent correctly', async () => {
        const state = {
          cid: '123',
          royalty: 10,
          mintEventName: 'myEvent',
        } as MintState;

        const contractReceipt = {
          events: [{ event: state.mintEventName }] as Event[],
        } as ContractReceipt;

        const contractTransaction = {
          wait: jest.fn(),
        };

        const expected = {
          event: state.mintEventName,
        } as Event;

        nftServiceMock.mint.mockResolvedValue(contractTransaction);
        contractTransaction.wait.mockResolvedValue(contractReceipt);

        const actual = await command.execute(state);

        expect(nftServiceMock.init).toBeCalled();
        expect(nftServiceMock.mint).toHaveBeenCalledWith(state.cid, state.royalty * 10);
        expect(actual.mintEvent).toEqual(expected);
      });
    });

    describe('and cid is not provided', () => {
      it('should return RequiredCid error', async () => {
        const state = {} as MintState;
        const expected = { ...state, error: MintError.RequiredCid };

        const actual = await command.execute(state);

        expect(actual).toEqual(expected);
        expect(nftServiceMock.init).not.toHaveBeenCalled();
        expect(nftServiceMock.mint).not.toHaveBeenCalled();
      });
    });

    describe('and royalty is not provided', () => {
      it('should return RequiredRoyalty error', async () => {
        const state = { cid: '123' } as MintState;
        const expected = {
          ...state,
          error: MintError.RequiredRoyalty,
        };

        const actual = await command.execute(state);

        expect(actual).toEqual(expected);
        expect(nftServiceMock.init).not.toHaveBeenCalled();
        expect(nftServiceMock.mint).not.toHaveBeenCalled();
      });
    });

    describe('and mintEventName is not provided', () => {
      it('should return RequiredMintEventName error', async () => {
        const state = { cid: '123', royalty: 1 } as MintState;
        const expected = {
          ...state,
          error: MintError.RequiredMintEventName,
        };

        const actual = await command.execute(state);

        expect(actual).toEqual(expected);
        expect(nftServiceMock.init).not.toHaveBeenCalled();
        expect(nftServiceMock.mint).not.toHaveBeenCalled();
      });
    });

    describe('and mint returns undefined', () => {
      it('should return MintNftUnsuccessful error', async () => {
        const state = {
          cid: '123',
          royalty: 10,
          mintEventName: 'myEvent',
        } as MintState;

        const expected = {
          ...state,
          error: MintError.MintNftUnsuccessful,
        };

        nftServiceMock.mint.mockResolvedValue(undefined);

        const actual = await command.execute(state);

        expect(actual).toEqual(expected);
      });
    });

    describe('and transaction returns undefined', () => {
      it('should return ContractReceiptFailure error', async () => {
        const state = {
          cid: '123',
          royalty: 10,
          mintEventName: 'myEvent',
        } as MintState;

        const contractTransaction = {
          wait: jest.fn(),
        };

        const expected = {
          ...state,
          error: MintError.ContractReceiptFailure,
        };

        nftServiceMock.mint.mockResolvedValue(contractTransaction);
        contractTransaction.wait.mockResolvedValue(undefined);

        const actual = await command.execute(state);

        expect(actual).toEqual(expected);
      });
    });

    describe('and contract receipt event is not found', () => {
      it('should return ContractEventNotFound error', async () => {
        const state = {
          cid: '123',
          royalty: 10,
          mintEventName: 'myEvent',
        } as MintState;

        const contractReceipt = {
          events: [{ event: 'this is an incorrect event' }] as Event[],
        } as ContractReceipt;

        const contractTransaction = {
          wait: jest.fn(),
        };

        const expected = {
          ...state,
          error: MintError.ContractEventNotFound,
        };

        nftServiceMock.mint.mockResolvedValue(contractTransaction);
        contractTransaction.wait.mockResolvedValue(contractReceipt);

        const actual = await command.execute(state);

        expect(actual).toEqual(expected);
      });
    });

    describe('and mint function fails', () => {
      it('should return a MintNftFailure error', async () => {
        const state = {
          cid: '123',
          royalty: 10,
          mintEventName: 'myEvent',
        } as MintState;

        const expected = { ...state, error: MintError.MintNftFailure };

        jest.spyOn(errorHandler, 'rejectWithMetamask').mockResolvedValue(expected);

        nftServiceMock.mint.mockRejectedValue('something went wrong.');

        const actual = await command.execute(state);

        expect(actual).toEqual(expected);
      });
    });
  });
});
