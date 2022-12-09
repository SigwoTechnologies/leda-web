import IItemService from '../../../../leda-nft/interfaces/item-service.interface';
import MarketplaceError from '../../enums/marketplace-error.enum';
import ICommand from '../../interfaces/command.interface';
import MarketplaceState from '../../types/marketplace-state';
import { rejectWithHttp } from '../../../../../store/error/error-handler';

export default class StoreBuyItemCommand implements ICommand<MarketplaceState> {
  private readonly itemService: IItemService;

  constructor(_itemService: IItemService) {
    this.itemService = _itemService;
  }

  async execute(state: MarketplaceState): Promise<MarketplaceState> {
    if (!state.address) return { ...state, error: MarketplaceError.RequiredAddress };
    if (!state.itemId) return { ...state, error: MarketplaceError.RequiredItemId };

    try {
      state.item = await this.itemService.buy(state.itemId, state.address);
    } catch (ex) {
      return rejectWithHttp(ex, () => ({
        ...state,
        error: MarketplaceError.StoreBuyItemFailure,
      }));
    }

    return state;
  }
}
