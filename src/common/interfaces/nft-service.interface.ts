import { ContractTransaction } from 'ethers';
import { IBaseContractService } from './base-contract-service.interface';

export interface INftService extends IBaseContractService {
  mint(tokenURI: string, royalty: number): Promise<ContractTransaction | undefined>;
}
