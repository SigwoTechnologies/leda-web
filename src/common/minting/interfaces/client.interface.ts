import { MintState } from '../types/mint-state';

interface IClient {
  execute(): Promise<MintState>;
}

export default IClient;
