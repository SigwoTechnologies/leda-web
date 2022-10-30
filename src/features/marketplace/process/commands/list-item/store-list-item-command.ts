import ItemRequest from '../../../../../common/types/item-request';
import ItemService from '../../../../leda-nft/services/item.service';
import ItemStatus from '../../enums/item-status.enum';
import MarketplaceError from '../../enums/marketplace-error.enum';
import ICommand from '../../interfaces/command.interface';
import MarketplaceState from '../../types/marketplace-state';

export default class StoreListItemCommand implements ICommand<MarketplaceState> {
  private readonly itemService: ItemService;

  constructor(_itemService: ItemService) {
    this.itemService = _itemService;
  }

  async execute(state: MarketplaceState): Promise<MarketplaceState> {
    if (!state.itemId) return { ...state, error: MarketplaceError.RequiredItemId };
    if (!state.price) return { ...state, error: MarketplaceError.RequiredPrice };
    if (!state.marketplaceEvent) return { ...state, error: MarketplaceError.RequiredListEvent };

    try {
      const listId = state.marketplaceEvent.args?.[0].toNumber();
      state.item = await this.itemService.list(state.itemId, state.price, listId);
    } catch (ex) {
      // TODO: Handle exceptions properly
      console.log('ex|StoreListItemCommand', ex);
      return { ...state, error: MarketplaceError.StoreListItemFailure };
    }

    return state;
  }
}
