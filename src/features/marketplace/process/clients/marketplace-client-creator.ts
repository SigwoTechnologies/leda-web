import ContractEvent from '../enums/contract-event.enum';
import IClient from '../interfaces/client.interface';
import MarketplaceState from '../types/marketplace-state';
import ListItemClient from './list-item-client';
import BuyItemClient from './buy-item-client';
import DelistItemClient from './delist-item-client';
import ChangePriceItemClient from './change-price-item-client';
import ProcessLazyItemClient from './process-lazy-item-client';

export default class MarketplaceCreator {
  static createClient(state: MarketplaceState): IClient {
    if (state.mintEventName === ContractEvent.LogCreateItem && !state.isLazy)
      return new ListItemClient(state);

    if (state.mintEventName === ContractEvent.LogChangeStatus && !state.isLazy)
      return new DelistItemClient(state);

    if (state.mintEventName === ContractEvent.LogChangePrice && !state.isLazy)
      return new ChangePriceItemClient(state);

    if (
      state.isLazy &&
      [
        ContractEvent.LogChangePrice,
        ContractEvent.LogCreateItem,
        ContractEvent.LogChangeStatus,
      ].includes(state.mintEventName as ContractEvent)
    )
      return new ProcessLazyItemClient(state);

    if (state.mintEventName === ContractEvent.LogBuyItem) return new BuyItemClient(state);

    throw new Error('There is no marketplace implementation for this flow');
  }
}
