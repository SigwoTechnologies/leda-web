import { MintState } from '../types/mint-state';
import ClientCreator from './client-creator';

class ClientProcessor {
  async execute(state: MintState): Promise<MintState> {
    const client = ClientCreator.createClient(state);

    const response = await client.execute();

    if (response.error) throw new Error('Custom message'); // TODO: Throw proper error here

    return response;
  }
}

export default ClientProcessor;
