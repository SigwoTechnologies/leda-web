import ICommand from '../../interfaces/command.interface';
import MintError from '../../enums/mint-error';
import MintState from '../../types/mint-state';

export default class TransformIpfsImageCommand implements ICommand<MintState> {
  async execute(state: MintState): Promise<MintState> {
    if (!state.ipfsObject) return { ...state, error: MintError.RequiredIpfsObject };

    const imageUrl = state.ipfsObject.image;
    const imgUrl = imageUrl.slice(imageUrl.indexOf(':'), imageUrl.lastIndexOf('/'));
    const slice = imageUrl?.slice(imageUrl.lastIndexOf('/'), imageUrl?.length);
    state.ipfsUrl = `https${imgUrl}.ipfs.dweb.link${slice}`;

    return state;
  }
}
