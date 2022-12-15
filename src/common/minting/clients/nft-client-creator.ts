import { getContracts } from '../../../utils/getContracts';
import MintState from '../types/mint-state';
import JupNftService from '../../../features/leda-nft/services/jup-nft.service';
import LedaNftService from '../../../features/leda-nft/services/leda-nft.service';
import INftCreateService from '../../interfaces/nft-create-service.interface';

const { LedaAddress, JupApeAddress } = getContracts();

export default class NftClientCreator {
  static createClient(state: MintState): INftCreateService {
    if (state.collectionAddress.toLocaleLowerCase() === JupApeAddress.toLocaleLowerCase())
      return new JupNftService();

    if (state.collectionAddress.toLocaleLowerCase() === LedaAddress.toLocaleLowerCase())
      return new LedaNftService();

    throw new Error('There is no client implementation for this flow');
  }
}
