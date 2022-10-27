import ContractEvent from '../enums/contract-event.enum';
import IClient from '../interfaces/client.interface';
import MarketplaceState from '../types/marketplace-state';
import ListItemClient from './list-item-client';
import BuyItemClient from './buy-item-client';

export default class MarketplaceCreator {
  static createClient(state: MarketplaceState): IClient {
    if (state.mintEventName === ContractEvent.LogCreateItem) return new ListItemClient(state);

    if (state.mintEventName === ContractEvent.LogBuyItem) return new BuyItemClient(state);

    throw new Error('There is no marketplace implementation for this flow');
  }
}
