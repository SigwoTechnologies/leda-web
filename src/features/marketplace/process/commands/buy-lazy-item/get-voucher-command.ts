import { rejectWithMetamask } from '../../../../../store/error/error-handler';
import ICommand from '../../interfaces/command.interface';
import MarketplaceError from '../../enums/marketplace-error.enum';
import MarketplaceState from '../../types/marketplace-state';
import IItemService from '../../../../leda-nft/interfaces/item-service.interface';

export default class GetVoucherCommand implements ICommand<MarketplaceState> {
  private readonly itemService: IItemService;

  constructor(_itemService: IItemService) {
    this.itemService = _itemService;
  }

  async execute(state: MarketplaceState): Promise<MarketplaceState> {
    if (!state.itemId) return { ...state, error: MarketplaceError.RequiredItemId };
    if (!state.address) return { ...state, error: MarketplaceError.RequiredAddress };

    try {
      state.voucher = await this.itemService.findVoucherByItemId(state.itemId, state.address);
    } catch (ex) {
      return rejectWithMetamask(ex, () => ({
        ...state,
        error: MarketplaceError.GetVoucherCommandFailure,
      }));
    }

    return state;
  }
}
