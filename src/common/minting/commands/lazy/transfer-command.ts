import IItemService from '../../../../features/leda-nft/interfaces/item-service.interface';
import MintError from '../../enums/mint-error.enum';
import ICommand from '../../interfaces/command.interface';
import MintState from '../../types/mint-state';
import { rejectWithHttp } from '../../../../store/error/error-handler';

export default class TransferCommand implements ICommand<MintState> {
  private readonly itemService: IItemService;

  constructor(_itemService: IItemService) {
    this.itemService = _itemService;
  }

  async execute(state: MintState): Promise<MintState> {
    if (!state.item || !state.item.itemId) return { ...state, error: MintError.RequiredItemId };
    if (!state.address) return { ...state, error: MintError.RequiredAddress };
    if (!state.voucher || !state.voucher.voucherId)
      return { ...state, error: MintError.RequiredVoucher };
    if (!state.tokenId) return { ...state, error: MintError.RequiredTokenId };

    try {
      await this.itemService.transfer(
        state.item.itemId,
        state.address,
        state.voucher.voucherId,
        state.tokenId
      );
    } catch (ex) {
      return rejectWithHttp(ex, () => ({
        ...state,
        error: MintError.TransferCommandFailure,
      }));
    }

    return state;
  }
}
