import ImageService from '../../../leda-nft/services/image.service';
import ItemService from '../../../leda-nft/services/item.service';
import LazyMintService from '../../../leda-nft/services/lazy-mint.service';
import StoreVoucherCommand from '../commands/common-lazy/store-voucher-command';
import IClient from '../interfaces/client.interface';
import ProcessLazyItemInvoker from '../invokers/process-lazy-item-invoker';
import MarketplaceState from '../types/marketplace-state';
import VoucherCreator from './voucher-creator';

export default class ProcessLazyItemClient implements IClient {
  private readonly invoker: ProcessLazyItemInvoker;

  constructor(state: MarketplaceState) {
    const lazyMintService = new LazyMintService();
    const imageService = new ImageService();
    const itemService = new ItemService();
    const generateVoucherCommand = VoucherCreator.createCommand(
      state,
      lazyMintService,
      imageService
    );
    const storeVoucherCommand = new StoreVoucherCommand(itemService);
    this.invoker = new ProcessLazyItemInvoker(state, generateVoucherCommand, storeVoucherCommand);
  }

  async execute(): Promise<MarketplaceState> {
    return this.invoker.execute();
  }
}
