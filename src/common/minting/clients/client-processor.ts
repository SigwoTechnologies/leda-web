import ClientCreator from './client-creator';
import MintState from '../types/mint-state';
import constants from '../../configuration/constants';
import BusinessError from '../../exceptions/business-error';

class ClientProcessor {
  async execute(state: MintState): Promise<MintState> {
    const client = ClientCreator.createClient(state);

    const response = await client.execute();

    if (response.error) {
      const { message, code } = constants.errors.minting[response.error.toString()];
      throw new BusinessError(message, code);
    }

    return response;
  }
}

export default ClientProcessor;
