import { ContractTransaction } from 'ethers';
import { IBaseContractService } from './base-contract-service.interface';

interface INftService extends IBaseContractService {
  mint(tokenURI: string, royalty: number): Promise<ContractTransaction | undefined>;
  approveForAll(address: string): Promise<void>;
}

export default INftService;
