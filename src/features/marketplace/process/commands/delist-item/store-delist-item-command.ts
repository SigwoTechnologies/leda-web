import ItemService from '../../../../leda-nft/services/item.service';
import MarketplaceError from '../../enums/marketplace-error.enum';
import ICommand from '../../interfaces/command.interface';
import MarketplaceState from '../../types/marketplace-state';

export default class StoreDelistItemCommand implements ICommand<MarketplaceState> {
  private readonly itemService: ItemService;

  constructor(_itemService: ItemService) {
    this.itemService = _itemService;
  }

  async execute(state: MarketplaceState): Promise<MarketplaceState> {
    if (!state.itemId) return { ...state, error: MarketplaceError.RequiredItemId };
    if (!state.marketplaceEvent) return { ...state, error: MarketplaceError.RequiredListEvent };
    if (!state.ownerAddress) return { ...state, error: MarketplaceError.RequiredOwnerAddress };

    try {
      state.item = await this.itemService.delist(state.itemId, state.ownerAddress);
    } catch (ex) {
      // TODO: Handle exceptions properly
      console.log('ex|StoreDelistItemCommand', ex);
      return { ...state, error: MarketplaceError.StoreDelistItemFailure };
    }

    return state;
  }
}
