import IClient from '../interfaces/client.interface';
import ItemService from '../../../leda-nft/services/item.service';
import LedaNftService from '../../../leda-nft/services/leda-nft.service';
import ListItemCommand from '../commands/list-item/list-item-command';
import ListItemInvoker from '../invokers/list-item-invoker';
import MarketplaceService from '../../services/marketplace.service';
import MarketplaceState from '../types/marketplace-state';
import StoreListItemCommand from '../commands/list-item/store-list-item-command';

export default class ListItemClient implements IClient {
  private readonly invoker: ListItemInvoker;

  constructor(state: MarketplaceState) {
    const ledaNftService = new LedaNftService();
    const marketplaceService = new MarketplaceService(ledaNftService);
    const itemService = new ItemService();
    const listItemCommand = new ListItemCommand(marketplaceService);
    const storeListItemCommand = new StoreListItemCommand(itemService);

    this.invoker = new ListItemInvoker(state, listItemCommand, storeListItemCommand);
  }

  async execute(): Promise<MarketplaceState> {
    return this.invoker.execute();
  }
}
