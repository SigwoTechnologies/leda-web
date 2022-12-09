import { ethers } from 'ethers';
import ILazyMintService from '../../../../leda-nft/interfaces/lazy-mint-service.interface';
import MarketplaceError from '../../enums/marketplace-error.enum';
import ICommand from '../../interfaces/command.interface';
import MarketplaceState from '../../types/marketplace-state';
import { rejectWithHttp } from '../../../../../store/error/error-handler';

export default class GenerateVoucherCommand implements ICommand<MarketplaceState> {
  private readonly lazyMintService: ILazyMintService;

  constructor(_lazyMintService: ILazyMintService) {
    this.lazyMintService = _lazyMintService;
  }

  async execute(state: MarketplaceState): Promise<MarketplaceState> {
    if (!state.imageUrl) return { ...state, error: MarketplaceError.RequiredImageUrl };
    if (!state.address) return { ...state, error: MarketplaceError.RequiredAddress };
    if (state.royalty < 0) return { ...state, error: MarketplaceError.RequiredRoyalty };
    if (!state.price) return { ...state, error: MarketplaceError.RequiredPrice };

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
      return rejectWithHttp(ex, () => ({
        ...state,
        error: MarketplaceError.GenerateVoucherCommandFailure,
      }));
    }

    return state;
  }
}
