import { rejectWithMetamask } from '../../../../store/error/error-handler';
import ICommand from '../../interfaces/command.interface';
import INftService from '../../../interfaces/nft-service.interface';
import MintError from '../../enums/mint-error.enum';
import MintState from '../../types/mint-state';

export default class MintNftCommand implements ICommand<MintState> {
  private readonly nftService: INftService;

  constructor(_nftService: INftService) {
    this.nftService = _nftService;
  }

  async execute(state: MintState): Promise<MintState> {
    if (!state.cid) return { ...state, error: MintError.RequiredCid };
    if (state.royalty < 0) return { ...state, error: MintError.RequiredRoyalty };
    if (!state.mintEventName) return { ...state, error: MintError.RequiredMintEventName };
    if (!state.collectionAddress) return { ...state, error: MintError.RequiredCollectionAddress };

    try {
      await this.nftService.init(state.collectionAddress);

      const precision = 10;
      const transaction = await this.nftService.mint(state.cid, state.royalty * precision);
      if (!transaction) return { ...state, error: MintError.MintNftUnsuccessful };

      const contractReceipt = await transaction.wait();
      if (!contractReceipt) return { ...state, error: MintError.ContractReceiptFailure };

      const mintedEvent = contractReceipt.events?.find((e) => e.event === state.mintEventName);
      if (!mintedEvent) return { ...state, error: MintError.ContractEventNotFound };

      state.mintEvent = mintedEvent;
    } catch (ex) {
      return rejectWithMetamask(ex, () => ({ ...state, error: MintError.MintNftFailure }));
    }

    return state;
  }
}
