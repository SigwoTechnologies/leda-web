import IItemService from '../../../../features/leda-nft/interfaces/item-service.interface';
import { rejectWithMetamask } from '../../../../store/error/error-handler';
import MintError from '../../enums/mint-error.enum';
import ICommand from '../../interfaces/command.interface';
import MintState from '../../types/mint-state';

export default class GetVoucherCommand implements ICommand<MintState> {
  private readonly itemService: IItemService;

  constructor(_itemService: IItemService) {
    this.itemService = _itemService;
  }

  async execute(state: MintState): Promise<MintState> {
    if (!state.item || !state.item.itemId) return { ...state, error: MintError.RequiredItemId };

    try {
      const voucher = await this.itemService.findVoucherByItemId(state.item.itemId);
      state.voucher = { ...voucher, creator: voucher.author.address };
    } catch (ex) {
      return rejectWithMetamask(ex, () => ({
        ...state,
        error: MintError.GetVoucherCommandFailure,
      }));
    }

    return state;
  }
}
