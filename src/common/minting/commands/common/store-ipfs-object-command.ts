import ICommand from '../../interfaces/command.interface';
import MintError from '../../enums/mint-error.enum';
import MintState from '../../types/mint-state';
import IImageService from '../../../../features/leda-nft/interfaces/image-service.interface';

export default class StoreIpfsObjectCommand implements ICommand<MintState> {
  private readonly imageService: IImageService;

  constructor(_imageService: IImageService) {
    this.imageService = _imageService;
  }

  async execute(state: MintState): Promise<MintState> {
    if (!state.blob) return { ...state, error: MintError.RequiredBlobFile };
    if (!state.item || !state.item.itemId) return { ...state, error: MintError.RequiredItemId };

    try {
      state.cid = await this.imageService.upload(
        state.blob,
        state.name,
        state.description,
        state.item.itemId,
        state.itemProperties
      );

      if (state.collection.blob) {
        const cidResponse = await this.imageService.uploadCollectionImage(
          state.collection.blob,
          state.collection.name,
          state.collection.description,
          state.item.collection?.id
        );
        console.log(cidResponse);

        state.collection.image.cid = cidResponse;
      }
    } catch (ex) {
      // TODO: Handle exceptions properly
      console.log('ex|StoreIpfsObjectCommand', ex);
      return { ...state, error: MintError.IpfsStoreFailure };
    }

    return state;
  }
}
