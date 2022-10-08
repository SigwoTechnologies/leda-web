import MintState from '../types/mint-state';
import GetIpfsMetadataCommand from '../commands/common/get-ipfs-metadata-command';
import GetTokenIdCommand from '../commands/leda-nft/get-tokenid-command';
import IClient from '../interfaces/client.interface';
import LedaNftInvoker from '../invokers/leda-nft-invoker';
import LedaNftService from '../../../features/leda-nft/services/leda-nft.service';
import MintNftCommand from '../commands/common/mint-nft-command';
import StoreIpfsObjectCommand from '../commands/common/store-ipfs-object-command';
import CreateItemCommand from '../commands/common/create-item-command';
import ImageService from '../../../features/leda-nft/services/image.service';
import StoreItemCommand from '../commands/common/store-item-command';
import ItemService from '../../../features/leda-nft/services/item.service';

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
    const createItemCommand = new CreateItemCommand();
    const storeItemCommand = new StoreItemCommand(itemService);

    this.invoker = new LedaNftInvoker(
      state,
      storeIpfsObjectCommand,
      mintNftCommand,
      getTokenIdCommand,
      getIpfsMetadataCommand,
      createItemCommand,
      storeItemCommand
    );
  }

  async execute(): Promise<MintState> {
    return this.invoker.execute();
  }
}
