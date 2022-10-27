import { ContractTransaction } from 'ethers';
import createContract from '../../../common/utils/contract-utils';
import marketplaceAddress from '../../../contracts/Marketplace-address.json';
import marketplace from '../../../contracts/Marketplace.json';
import { Marketplace } from '../types/Marketplace';
import { IMarketplaceService } from './marketplace-service.interface';

export default class MarketplaceService implements IMarketplaceService {
  private contract: Marketplace | null;

  constructor() {
    this.contract = null;
  }

  public async init(): Promise<void> {
    this.contract = await createContract<Marketplace>(marketplaceAddress.address, marketplace.abi);
  }

  public async getOwner(): Promise<string | undefined> {
    return this.contract?.owner();
  }

  public async listItem(
    contractAddress: string,
    tokenId: number,
    price: string
  ): Promise<ContractTransaction | undefined> {
    return this.contract?.makeItem(contractAddress, tokenId, price);
  }

  public async getItem(index: number) {
    return this.contract?.items(index);
  }

  public async buyItem(tokenId: number, price: string): Promise<ContractTransaction | undefined> {
    return this.contract?.buyItem(tokenId, { value: price });
  }
}
