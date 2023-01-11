import { rejectWithHttp } from '../../../../../store/error/error-handler';
import IItemService from '../../../../leda-nft/interfaces/item-service.interface';
import MarketplaceError from '../../enums/marketplace-error.enum';
import ICommand from '../../interfaces/command.interface';
import MarketplaceState from '../../types/marketplace-state';

export default class StoreDelistItemCommand implements ICommand<MarketplaceState> {
  private readonly itemService: IItemService;

  constructor(_itemService: IItemService) {
    this.itemService = _itemService;
  }

  async execute(state: MarketplaceState): Promise<MarketplaceState> {
    if (!state.itemId) return { ...state, error: MarketplaceError.RequiredItemId };
    if (!state.marketplaceEvent) return { ...state, error: MarketplaceError.RequiredListEvent };
    if (!state.ownerAddress) return { ...state, error: MarketplaceError.RequiredOwnerAddress };

    try {
      state.item = await this.itemService.delist(state.itemId, state.ownerAddress);
    } catch (ex) {
      return rejectWithHttp(ex, () => ({
        ...state,
        error: MarketplaceError.StoreDelistItemFailure,
      }));
    }

    return state;
  }
}
