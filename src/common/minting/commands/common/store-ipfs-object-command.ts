import ICommand from '../../interfaces/command.interface';
import IIpfsService from '../../../interfaces/ipfs-service.interface';
import MintError from '../../enums/mint-error';
import MintState from '../../types/mint-state';

export default class StoreIpfsObjectCommand implements ICommand<MintState> {
  private readonly ipfsService: IIpfsService;

  constructor(_ipfsService: IIpfsService) {
    this.ipfsService = _ipfsService;
  }

  async execute(state: MintState): Promise<MintState> {
    if (!state.blob) return { ...state, error: MintError.RequiredBlobFile };
    if (!state.name) return { ...state, error: MintError.RequiredName };
    if (!state.description) return { ...state, error: MintError.RequireDescription };

    try {
      const { ipnft, url } = await this.ipfsService.storeNft(
        state.blob,
        state.name,
        state.description
      );

      state.ipnft = ipnft;
      state.url = url;
    } catch (ex) {
      // TODO: Handle exceptions here
      return { ...state, error: MintError.IpfsStoreFailure };
    }

    return state;
  }
}
