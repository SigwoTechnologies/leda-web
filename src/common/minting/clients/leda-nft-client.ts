import ImageService from '../../../features/leda-nft/services/image.service';
import ItemService from '../../../features/leda-nft/services/item.service';
import LedaNftService from '../../../features/leda-nft/services/leda-nft.service';
import GetIpfsMetadataCommand from '../commands/common/get-ipfs-metadata-command';
import MintNftCommand from '../commands/common/mint-nft-command';
import StoreIpfsObjectCommand from '../commands/common/store-ipfs-object-command';
import StoreItemCommand from '../commands/common/store-item-command';
import GetTokenIdCommand from '../commands/leda-nft/get-tokenid-command';
import IClient from '../interfaces/client.interface';
import LedaNftInvoker from '../invokers/leda-nft-invoker';
import MintState from '../types/mint-state';

export default class LedaNftClient implements IClient {
  private readonly invoker: LedaNftInvoker;

  constructor(state: MintState) {
    const ledaNftService = new LedaNftService();
    const imageService = new ImageService();
    const itemService = new ItemService();
    const storeIpfsObjectCommand = new StoreIpfsObjectCommand(imageService);
    const mintNftCommand = new MintNftCommand(ledaNftService);
    const getTokenIdCommand = new GetTokenIdCommand();
    const getIpfsMetadataCommand = new GetIpfsMetadataCommand();
    const storeItemCommand = new StoreItemCommand(itemService);

    this.invoker = new LedaNftInvoker(
      state,
      storeIpfsObjectCommand,
      mintNftCommand,
      getTokenIdCommand,
      getIpfsMetadataCommand,
      storeItemCommand
    );
  }

  async execute(): Promise<MintState> {
    return this.invoker.execute();
  }
}
