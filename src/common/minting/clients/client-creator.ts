import CollectionType from '../enums/collection-type.enum';
import IClient from '../interfaces/client.interface';
import JupApeNftClient from './jup-ape-nft-client';
import JupNftClient from './jup-nft-client';
import MintState from '../types/mint-state';

export default class ClientCreator {
  static createClient(state: MintState): IClient {
    if (state.collection === CollectionType.JupNft) return new JupNftClient(state);

    if (state.collection === CollectionType.JupApeNft) return new JupApeNftClient(state);

    throw new Error('There is no client implementetion for this flow');
  }
}
