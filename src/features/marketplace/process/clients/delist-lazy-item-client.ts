import GetVoucherCommand from '../../../../common/minting/commands/lazy/get-voucher-command';
import StoreVoucherCommand from '../../../../common/minting/commands/lazy/store-voucher-command';
import ItemService from '../../../leda-nft/services/item.service';
import LazyMintService from '../../../leda-nft/services/lazy-mint.service';
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

    this.invoker = new DelistLazyItemInvoker(state);
  }

  async execute(): Promise<MarketplaceState> {
    return this.invoker.execute();
  }
}
