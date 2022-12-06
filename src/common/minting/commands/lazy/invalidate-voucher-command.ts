import IVoucherService from '../../../../features/leda-nft/interfaces/voucher-service.interface';
import { rejectWithMetamask } from '../../../../store/error/error-handler';
import MintError from '../../enums/mint-error.enum';
import ICommand from '../../interfaces/command.interface';
import MintState from '../../types/mint-state';

export default class InvalidateVoucherCommand implements ICommand<MintState> {
  private readonly voucherService: IVoucherService;

  constructor(_voucherService: IVoucherService) {
    this.voucherService = _voucherService;
  }

  async execute(state: MintState): Promise<MintState> {
    if (!state.voucher || !state.voucher.voucherId)
      return { ...state, error: MintError.RequiredVoucher };

    try {
      await this.voucherService.delete(state.voucher.voucherId);
    } catch (ex) {
      return rejectWithMetamask(ex, () => ({
        ...state,
        error: MintError.GetVoucherCommandFailure,
      }));
    }

    return state;
  }
}
