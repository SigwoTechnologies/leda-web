/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContractTransaction } from 'ethers';

export interface IMarketplaceService {
  init(): Promise<void>;
  getOwner(): Promise<string | undefined>;
  listItem(
    contractAddress: string,
    tokenId: number,
    price: string,
    ownerAddress: string
  ): Promise<ContractTransaction | undefined>;
  buyItem(tokenId: number, price: string): Promise<ContractTransaction | undefined>;
  getItem(tokenId: number): any;
  changeStatusItem(listId: number, newStatus: number): Promise<ContractTransaction | undefined>;
  changePrice(listId: number, newPrice: string): Promise<ContractTransaction | undefined>;
}
