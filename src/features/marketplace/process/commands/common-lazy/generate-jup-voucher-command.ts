import { ethers } from 'ethers';
import ILazyMintService from '../../../../leda-nft/interfaces/lazy-mint-service.interface';
import MarketplaceError from '../../enums/marketplace-error.enum';
import ICommand from '../../interfaces/command.interface';
import MarketplaceState from '../../types/marketplace-state';
import { rejectWithHttp } from '../../../../../store/error/error-handler';

export default class GenerateJupVoucherCommand implements ICommand<MarketplaceState> {
  private readonly lazyMintService: ILazyMintService;

  constructor(_lazyMintService: ILazyMintService) {
    this.lazyMintService = _lazyMintService;
  }

  async execute(state: MarketplaceState): Promise<MarketplaceState> {
    if (!state.imageUrl) return { ...state, error: MarketplaceError.RequiredImageUrl };
    if (state.tokenId < 0) return { ...state, error: MarketplaceError.RequiredTokenId };
    if (state.royalty < 0) return { ...state, error: MarketplaceError.RequiredRoyalty };
    if (!state.item || state.item.stakingRewards < 0)
      return { ...state, error: MarketplaceError.RequiredStakingRewards };
    if (!state.price) return { ...state, error: MarketplaceError.RequiredPrice };
    if (!state.address) return { ...state, error: MarketplaceError.RequiredAddress };

    try {
      const precision = 10;
      const wei = ethers.utils.parseUnits(String(state.price), 'ether').toString();

      state.voucher = await this.lazyMintService.createJupVoucher(
        state.imageUrl,
        state.royalty * precision,
        wei,
        state.tokenId,
        state.item.stakingRewards
      );
      state.voucher.creator = state.address;
    } catch (ex) {
      return rejectWithHttp(ex, () => ({
        ...state,
        error: MarketplaceError.GenerateJupVoucherCommand,
      }));
    }

    return state;
  }
}
