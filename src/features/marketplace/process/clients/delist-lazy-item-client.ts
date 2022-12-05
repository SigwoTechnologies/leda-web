import ItemService from '../../../leda-nft/services/item.service';
import LazyMintService from '../../../leda-nft/services/lazy-mint.service';
import GetVoucherCommand from '../commands/lazy/get-voucher-command';
import StoreVoucherCommand from '../commands/lazy/store-voucher-command';
import IClient from '../interfaces/client.interface';
import DelistLazyItemInvoker from '../invokers/delist-lazy-item-invoker';
import MarketplaceState from '../types/marketplace-state';

export default class DelistLazyItemClient implements IClient {
  private readonly invoker: DelistLazyItemInvoker;

  constructor(state: MarketplaceState) {
    const lazyMintService = new LazyMintService();
    const itemService = new ItemService();
    const getVoucherCommand = new GetVoucherCommand(lazyMintService);
    const storeVoucherCommand = new StoreVoucherCommand(itemService);

    this.invoker = new DelistLazyItemInvoker(state, getVoucherCommand, storeVoucherCommand);
  }

  async execute(): Promise<MarketplaceState> {
    return this.invoker.execute();
  }
}
