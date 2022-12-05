import { ethers } from 'ethers';
import ICommand from '../../interfaces/command.interface';
import MintError from '../../enums/mint-error.enum';
import MintState from '../../types/mint-state';
import ILazyMintService from '../../../../features/leda-nft/interfaces/lazy-mint-service.interface';

export default class GenerateVoucherCommand implements ICommand<MintState> {
  private readonly lazyMintService: ILazyMintService;

  constructor(_lazyMintService: ILazyMintService) {
    this.lazyMintService = _lazyMintService;
  }

  async execute(state: MintState): Promise<MintState> {
    if (!state.imageUrl) return { ...state, error: MintError.RequiredImageUrl };
    if (!state.address) return { ...state, error: MintError.RequiredAddress };
    if (!state.royalty) return { ...state, error: MintError.RequiredRoyalty };
    if (!state.price) return { ...state, error: MintError.RequiredPrice };

    try {
      const precision = 10;
      const wei = ethers.utils.parseUnits(String(state.price), 'ether').toString();

      state.voucher = await this.lazyMintService.createVoucher(
        state.imageUrl,
        state.address,
        state.royalty * precision,
        wei
      );
    } catch (ex) {
      // TODO: Handle exceptions properly
      console.log('ex|GenerateVoucherCommand', ex);
      return { ...state, error: MintError.GenerateVoucherCommandFailure };
    }

    return state;
  }
}
