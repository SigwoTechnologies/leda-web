import ICommand from '../../interfaces/command.interface';
import MintError from '../../enums/mint-error';
import MintState from '../../types/mint-state';
import IImageService from '../../../../features/leda-nft/services/image.service';

export default class StoreIpfsObjectCommand implements ICommand<MintState> {
  private readonly imageService: IImageService;

  constructor(_imageService: IImageService) {
    this.imageService = _imageService;
  }

  async execute(state: MintState): Promise<MintState> {
    if (!state.blob) return { ...state, error: MintError.RequiredBlobFile };
    if (!state.name) return { ...state, error: MintError.RequiredName };
    if (!state.description) return { ...state, error: MintError.RequireDescription };

    try {
      state.cid = await this.imageService.upload(state.blob);
    } catch (ex) {
      // TODO: Handle exceptions properly
      console.log('ex|StoreIpfsObjectCommand', ex);
      return { ...state, error: MintError.IpfsStoreFailure };
    }

    return state;
  }
}
