import IClient from '../interfaces/client.interface';
import JupApeNftInvoker from '../invokers/jup-ape-nft-invoker';
import { MintState } from '../types/mint-state';

export default class JupApeNftClient implements IClient {
  private readonly invoker: JupApeNftInvoker;

  constructor(state: MintState) {
    // TODO: Here all the dependencies should be created
    this.invoker = new JupApeNftInvoker(state);
  }

  async execute(): Promise<MintState> {
    return this.invoker.execute();
  }
}
