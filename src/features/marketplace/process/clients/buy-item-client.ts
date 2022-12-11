import ItemService from '../../../leda-nft/services/item.service';
import MarketplaceService from '../../services/marketplace.service';
import BuyItemCommand from '../commands/buy-item/buy-item-command';
import StoreBuyItemCommand from '../commands/buy-item/store-buy-item-command';
import IClient from '../interfaces/client.interface';
import BuyItemInvoker from '../invokers/buy-item-invoker';
import MarketplaceState from '../types/marketplace-state';

export default class BuyItemClient implements IClient {
  private readonly invoker: BuyItemInvoker;

  constructor(state: MarketplaceState) {
    const itemService = new ItemService();
    const marketplaceService = new MarketplaceService();
    const buyItemCommand = new BuyItemCommand(marketplaceService);
    const storeBuyItemCommand = new StoreBuyItemCommand(itemService);

    this.invoker = new BuyItemInvoker(state, buyItemCommand, storeBuyItemCommand);
  }

  async execute(): Promise<MarketplaceState> {
    return this.invoker.execute();
  }
}
