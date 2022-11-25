import ImageService from '../../../features/leda-nft/services/image.service';
import ItemService from '../../../features/leda-nft/services/item.service';
import GetIpfsMetadataCommand from '../commands/common/get-ipfs-metadata-command';
import StoreIpfsObjectCommand from '../commands/common/store-ipfs-object-command';
import ActivateItemCommand from '../commands/common/activate-item-command';
import IClient from '../interfaces/client.interface';
import MintState from '../types/mint-state';
import StoreDraftItemCommand from '../commands/common/store-draft-item-command';
import LedaNftLazyInvoker from '../invokers/leda-nft-lazy-invoker';
import GetVoucherCommand from '../commands/lazy/get-voucher-command';
import LazyMintService from '../../../features/leda-nft/services/lazy-mint.service';

export default class LedaNftLazyClient implements IClient {
  private readonly invoker: LedaNftLazyInvoker;

  constructor(state: MintState) {
    const imageService = new ImageService();
    const itemService = new ItemService();
    const lazyMintService = new LazyMintService();
    const storeDraftItemCommand = new StoreDraftItemCommand(itemService);
    const storeIpfsObjectCommand = new StoreIpfsObjectCommand(imageService);
    const getIpfsMetadataCommand = new GetIpfsMetadataCommand();
    const getVoucherCommand = new GetVoucherCommand(lazyMintService);
    const activateItemCommand = new ActivateItemCommand(itemService);

    this.invoker = new LedaNftLazyInvoker(
      state,
      storeDraftItemCommand,
      storeIpfsObjectCommand,
      getIpfsMetadataCommand,
      getVoucherCommand,
      activateItemCommand
    );
  }

  async execute(): Promise<MintState> {
    return this.invoker.execute();
  }
}
