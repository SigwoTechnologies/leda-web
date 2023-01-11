import { rejectWithHttp } from '../../../../../store/error/error-handler';
import IItemService from '../../../../leda-nft/interfaces/item-service.interface';
import MarketplaceError from '../../enums/marketplace-error.enum';
import ICommand from '../../interfaces/command.interface';
import MarketplaceState from '../../types/marketplace-state';

export default class StoreListItemCommand implements ICommand<MarketplaceState> {
  private readonly itemService: IItemService;

  constructor(_itemService: IItemService) {
    this.itemService = _itemService;
  }

  async execute(state: MarketplaceState): Promise<MarketplaceState> {
    if (!state.itemId) return { ...state, error: MarketplaceError.RequiredItemId };
    if (!state.price) return { ...state, error: MarketplaceError.RequiredPrice };
    if (!state.address) return { ...state, error: MarketplaceError.RequiredAddress };
    if (!state.marketplaceEvent) return { ...state, error: MarketplaceError.RequiredListEvent };

    try {
      const listId = state.marketplaceEvent.args?.[0].toNumber();
      state.item = await this.itemService.list(state.itemId, state.price, listId, state.address);

      state.listId = listId;
    } catch (ex) {
      return rejectWithHttp(ex, () => ({
        ...state,
        error: MarketplaceError.StoreListItemFailure,
      }));
    }

    return state;
  }
}
