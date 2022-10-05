import { MintState } from '../types/mint-state';
import ICommand from '../interfaces/command.interface';
import MintError from '../enums/mint-error';
import { INftService } from '../../interfaces/nft-service.interface';

export default class MintNftCommand implements ICommand<MintState> {
  private readonly nftService: INftService;

  constructor(_nftService: INftService) {
    this.nftService = _nftService;
  }

  async execute(state: MintState): Promise<MintState> {
    if (!state.url) return { ...state, error: MintError.RequireUrl };
    if (!state.royalty) return { ...state, error: MintError.RequireRoyalty };
    if (!state.mintEventName) return { ...state, error: MintError.RequireMintEventName };

    try {
      await this.nftService.init();

      const transaction = await this.nftService.mint(state.url, state.royalty);
      if (!transaction) return { ...state, error: MintError.MintNftUnsuccessful };

      const contractReceipt = await transaction.wait();
      if (!contractReceipt) return { ...state, error: MintError.ContractReceiptFailure };

      const mintedEvent = contractReceipt.events?.find((e) => e.event === state.mintEventName);
      if (!mintedEvent) return { ...state, error: MintError.ContractEventNotFound };

      state.mintEvent = mintedEvent;
    } catch (ex) {
      // TODO: Handle exceptions here
      return { ...state, error: MintError.MintNftFailure };
    }

    return state;
  }
}
