/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContractTransaction } from 'ethers';
import { IBaseContractService } from '../../../common/interfaces/base-contract-service.interface';

export interface IMarketplaceService extends IBaseContractService {
  getOwner(): Promise<string | undefined>;
  listItem(
    contractAddress: string,
    tokenId: number,
    price: string,
    ownerAddress: string
  ): Promise<ContractTransaction | undefined>;
  buyItem(tokenId: number, price: string): Promise<ContractTransaction | undefined>;
  getItem(tokenId: number): any;
}
