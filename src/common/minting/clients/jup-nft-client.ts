import LedaNftService from '../../../features/leda-nft/services/leda-nft.service';
import IpfsService from '../../services/ipfs.service';
import GetIpfsMetadataCommand from '../commands/get-ipfs-metadata-command';
import GetTokenIdCommand from '../commands/get-tokenid-command';
import MintNftCommand from '../commands/mint-nft-command';
import StoreIpfsObjectCommand from '../commands/store-ipfs-object-command';
import TransformIpfsImageCommand from '../commands/transform-ipfs-image-command';
import IClient from '../interfaces/client.interface';
import JupNftInvoker from '../invokers/jup-nft-invoker';
import { MintState } from '../types/mint-state';

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
