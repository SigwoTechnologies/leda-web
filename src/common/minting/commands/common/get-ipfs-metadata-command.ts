import axios from 'axios';
import ICommand from '../../interfaces/command.interface';
import MintState from '../../types/mint-state';
import MintError from '../../enums/mint-error';
import { IpfsObjectResponse } from '../../../types/ipfs-types';

export default class GetIpfsMetadataCommand implements ICommand<MintState> {
  async execute(state: MintState): Promise<MintState> {
    if (!state.ipnft) return { ...state, error: MintError.RequiredIpfsId };

    try {
      // TODO: We should have either a fallback gateway or our own ipfs node. Do not rely only on one IPFS source
      const { data } = await axios.get<IpfsObjectResponse>(
        `https://${state.ipnft}.ipfs.dweb.link/metadata.json`
      );

      state.ipfsObject = data;
    } catch (ex) {
      // TODO: Handle exceptions properly
      console.log('ex|GetIpfsMetadataCommand', ex);
      return { ...state, error: MintError.IpfsMetadataFailure };
    }
    return state;
  }
}
