import ItemService from '../../../../leda-nft/services/item.service';
import MarketplaceError from '../../enums/marketplace-error.enum';
import ICommand from '../../interfaces/command.interface';
import MarketplaceState from '../../types/marketplace-state';

export default class StoreBuyItemCommand implements ICommand<MarketplaceState> {
  private readonly itemService: ItemService;

  constructor(_itemService: ItemService) {
    this.itemService = _itemService;
  }

  async execute(state: MarketplaceState): Promise<MarketplaceState> {
    if (!state.address) return { ...state, error: MarketplaceError.RequiredAddress };
    if (!state.itemId) return { ...state, error: MarketplaceError.RequiredItemId };

    try {
      state.item = await this.itemService.buy(state.itemId, state.address);
    } catch (ex) {
      // TODO: Handle exceptions properly
      console.log('ex|StoreBuyItemCommand', ex);
      return { ...state, error: MarketplaceError.StoreItemFailure };
    }

    return state;
  }
}
