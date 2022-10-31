import BuyItemCommand from '../commands/buy-item/buy-item-command';
import BuyItemInvoker from '../invokers/buy-item-invoker';
import IClient from '../interfaces/client.interface';
import ItemService from '../../../leda-nft/services/item.service';
import LedaNftService from '../../../leda-nft/services/leda-nft.service';
import MarketplaceService from '../../services/marketplace.service';
import MarketplaceState from '../types/marketplace-state';
import StoreBuyItemCommand from '../commands/buy-item/store-buy-item-command';

export default class BuyItemClient implements IClient {
  private readonly invoker: BuyItemInvoker;

  constructor(state: MarketplaceState) {
    const ledaNftService = new LedaNftService();
    const marketplaceService = new MarketplaceService(ledaNftService);
    const itemService = new ItemService();
    const buyItemCommand = new BuyItemCommand(marketplaceService);
    const storeBuyItemCommand = new StoreBuyItemCommand(itemService);
    this.invoker = new BuyItemInvoker(state, buyItemCommand, storeBuyItemCommand);
  }

  async execute(): Promise<MarketplaceState> {
    return this.invoker.execute();
  }
}
