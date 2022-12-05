import axios from 'axios';
import ICommand from '../../interfaces/command.interface';
import MintState from '../../types/mint-state';
import MintError from '../../enums/mint-error.enum';
import appConfig from '../../../configuration/app.config';
import { IpfsObjectResponse } from '../../../types/ipfs-types';

export default class GetIpfsMetadataCommand implements ICommand<MintState> {
  async execute(state: MintState): Promise<MintState> {
    if (!state.cid) return { ...state, error: MintError.RequiredCid };

    try {
      const { data } = await axios.get<IpfsObjectResponse>(
        `https://${appConfig.pinataGatewayUrl}/ipfs/${state.cid}`
      );

      if (state.collection.image?.cid && state.collection.name.length) {
        const {
          data: { image },
        } = await axios.get<IpfsObjectResponse>(
          `https://${appConfig.pinataGatewayUrl}/ipfs/${state.collection.image.cid}`
        );

        state.collection.image.url = image;
      }

      state.imageUrl = data.image;
    } catch (ex) {
      // TODO: Handle exceptions properly
      console.log('ex|GetIpfsMetadataCommand', ex);
      return { ...state, error: MintError.IpfsMetadataFailure };
    }
    return state;
  }
}
