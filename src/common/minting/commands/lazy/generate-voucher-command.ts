import { ethers } from 'ethers';
import { rejectWithMetamask } from '../../../../store/error/error-handler';
import ICommand from '../../interfaces/command.interface';
import MintError from '../../enums/mint-error.enum';
import MintState from '../../types/mint-state';
import ILazyMintService from '../../../../features/leda-nft/interfaces/lazy-mint-service.interface';
import IImageService from '../../../../features/leda-nft/interfaces/image-service.interface';

export default class GenerateVoucherCommand implements ICommand<MintState> {
  private readonly lazyMintService: ILazyMintService;

  private readonly imageService: IImageService;

  constructor(_lazyMintService: ILazyMintService, _imageService: IImageService) {
    this.lazyMintService = _lazyMintService;
    this.imageService = _imageService;
  }

  async execute(state: MintState): Promise<MintState> {
    if (!state.cid) return { ...state, error: MintError.RequiredCid };
    if (!state.imageUrl) return { ...state, error: MintError.RequiredImageUrl };
    if (!state.address) return { ...state, error: MintError.RequiredAddress };
    if (state.royalty < 0) return { ...state, error: MintError.RequiredRoyalty };
    if (!state.price) return { ...state, error: MintError.RequiredPrice };

    try {
      const precision = 10;
      const wei = ethers.utils.parseUnits(String(state.price), 'ether').toString();

      state.voucher = await this.lazyMintService.createVoucher(
        state.cid,
        state.address,
        state.royalty * precision,
        wei
      );
      state.voucher.uri = state.imageUrl;
    } catch (ex) {
      return rejectWithMetamask(ex, () => ({
        ...state,
        error: MintError.GenerateVoucherCommandFailure,
      }));
    }

    return state;
  }
}
