import CollectionType from '../enums/collection-type.enum';
import IClient from '../interfaces/client.interface';
import JupApeNftClient from './jup-ape-nft-client';
import LedaNftClient from './leda-nft-client';
import LedaNftLazyClient from './leda-nft-lazy-client';
import ContractEvent from '../enums/contract-event.enum';
import RedeemClient from './redeem-client';
import MintState from '../types/mint-state';

export default class ClientCreator {
  static createClient(state: MintState): IClient {
    if (state.mintEventName === ContractEvent.TransferEvent) return new RedeemClient(state);

    if (state.collectionType === CollectionType.LedaNft && state.isLazy)
      return new LedaNftLazyClient(state);

    if (state.collectionType === CollectionType.LedaNft && !state.isLazy)
      return new LedaNftClient(state);

    if (state.collectionType === CollectionType.JupApeNft) return new JupApeNftClient(state);

    throw new Error('There is no client implementation for this flow');
  }
}
