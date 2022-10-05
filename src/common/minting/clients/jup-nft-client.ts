import MintState from '../types/mint-state';
import GetIpfsMetadataCommand from '../commands/common/get-ipfs-metadata-command';
import GetTokenIdCommand from '../commands/leda-nft/get-tokenid-command';
import IClient from '../interfaces/client.interface';
import IpfsService from '../../services/ipfs.service';
import JupNftInvoker from '../invokers/jup-nft-invoker';
import LedaNftService from '../../../features/leda-nft/services/leda-nft.service';
import MintNftCommand from '../commands/common/mint-nft-command';
import StoreIpfsObjectCommand from '../commands/common/store-ipfs-object-command';
import TransformIpfsImageCommand from '../commands/common/transform-ipfs-image-command';

export default class JupNftClient implements IClient {
  private readonly invoker: JupNftInvoker;

  constructor(state: MintState) {
    const ledaNftService = new LedaNftService();
    const ipfsService = new IpfsService();
    const storeIpfsObjectCommand = new StoreIpfsObjectCommand(ipfsService);
    const mintNftCommand = new MintNftCommand(ledaNftService);
    const getTokenIdCommand = new GetTokenIdCommand();
    const getIpfsMetadataCommand = new GetIpfsMetadataCommand();
    const transformIpfsImageCommand = new TransformIpfsImageCommand();

    this.invoker = new JupNftInvoker(
      state,
      storeIpfsObjectCommand,
      mintNftCommand,
      getTokenIdCommand,
      getIpfsMetadataCommand,
      transformIpfsImageCommand
    );
  }

  async execute(): Promise<MintState> {
    return this.invoker.execute();
  }
}
