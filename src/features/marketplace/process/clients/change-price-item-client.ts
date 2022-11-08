import { itemService } from '../../../leda-nft/services/item.service';
import LedaNftService from '../../../leda-nft/services/leda-nft.service';
import MarketplaceService from '../../services/marketplace.service';
import ChangePriceItemCommand from '../commands/change-price-item/change-price-item-command';
import StoreChangePriceItemCommand from '../commands/change-price-item/store-change-price-item-command';
import ChangeStatusItemCommand from '../commands/delist-item/change-status-item-command';
import IClient from '../interfaces/client.interface';
import ChangePriceItemInvoker from '../invokers/change-price-item-invoker';
import MarketplaceState from '../types/marketplace-state';

export default class ChangePriceItemClient implements IClient {
  private readonly invoker: ChangePriceItemInvoker;

  constructor(state: MarketplaceState) {
    const ledaNftService = new LedaNftService();
    const marketplaceService = new MarketplaceService(ledaNftService);
    const changePriceItemCommand = new ChangePriceItemCommand(marketplaceService);
    const changeStatusItemCommand = new ChangeStatusItemCommand(marketplaceService);
    const storeChangePriceItemCommand = new StoreChangePriceItemCommand(itemService);

    this.invoker = new ChangePriceItemInvoker(
      state,
      changePriceItemCommand,
      changeStatusItemCommand,
      storeChangePriceItemCommand
    );
  }

  async execute(): Promise<MarketplaceState> {
    return this.invoker.execute();
  }
}