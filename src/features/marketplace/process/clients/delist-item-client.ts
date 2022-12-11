import ItemService from '../../../leda-nft/services/item.service';
import MarketplaceService from '../../services/marketplace.service';
import ChangeStatusItemCommand from '../commands/delist-item/change-status-item-command';
import StoreDelistItemCommand from '../commands/delist-item/store-delist-item-command';
import IClient from '../interfaces/client.interface';
import DelistItemInvoker from '../invokers/delist-item-invoker';
import MarketplaceState from '../types/marketplace-state';

export default class DelistItemClient implements IClient {
  private readonly invoker: DelistItemInvoker;

  constructor(state: MarketplaceState) {
    const marketplaceService = new MarketplaceService();
    const itemService = new ItemService();
    const changeStatusItemCommand = new ChangeStatusItemCommand(marketplaceService);
    const storeDelistItemCommand = new StoreDelistItemCommand(itemService);

    this.invoker = new DelistItemInvoker(state, changeStatusItemCommand, storeDelistItemCommand);
  }

  async execute(): Promise<MarketplaceState> {
    return this.invoker.execute();
  }
}
