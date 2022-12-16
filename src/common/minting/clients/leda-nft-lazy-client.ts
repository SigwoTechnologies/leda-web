import ImageService from '../../../features/leda-nft/services/image.service';
import ItemService from '../../../features/leda-nft/services/item.service';
import GetIpfsMetadataCommand from '../commands/common/get-ipfs-metadata-command';
import StoreIpfsObjectCommand from '../commands/common/store-ipfs-object-command';
import IClient from '../interfaces/client.interface';
import MintState from '../types/mint-state';
import StoreDraftItemCommand from '../commands/common/store-draft-item-command';
import LedaNftLazyInvoker from '../invokers/leda-nft-lazy-invoker';
import GenerateVoucherCommand from '../commands/lazy/generate-voucher-command';
import LazyMintService from '../../../features/leda-nft/services/lazy-mint.service';
import StoreVoucherCommand from '../commands/lazy/store-voucher-command';

export default class LedaNftLazyClient implements IClient {
  private readonly invoker: LedaNftLazyInvoker;

  constructor(state: MintState) {
    const imageService = new ImageService();
    const itemService = new ItemService();
    const lazyMintService = new LazyMintService();
    const storeDraftItemCommand = new StoreDraftItemCommand(itemService);
    const storeIpfsObjectCommand = new StoreIpfsObjectCommand(imageService);
    const getIpfsMetadataCommand = new GetIpfsMetadataCommand();
    const generateVoucherCommand = new GenerateVoucherCommand(lazyMintService, imageService);
    const storeVoucherCommand = new StoreVoucherCommand(itemService);

    this.invoker = new LedaNftLazyInvoker(
      state,
      storeDraftItemCommand,
      storeIpfsObjectCommand,
      getIpfsMetadataCommand,
      generateVoucherCommand,
      storeVoucherCommand
    );
  }

  async execute(): Promise<MintState> {
    return this.invoker.execute();
  }
}
