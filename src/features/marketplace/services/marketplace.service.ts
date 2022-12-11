import { ContractTransaction } from 'ethers';
import { getContracts } from '../../../utils/getContracts';
import { Marketplace } from '../types/Marketplace';
import { IMarketplaceService } from './marketplace-service.interface';
import createContract from '../../../common/utils/contract-utils';

const { MarketplaceAddress, MarketplaceAbi } = getContracts();
export default class MarketplaceService implements IMarketplaceService {
  private contract: Marketplace | null;

  constructor() {
    this.contract = null;
  }

  public async init(): Promise<void> {
    this.contract = await createContract<Marketplace>(MarketplaceAddress, MarketplaceAbi);
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

  public async changeStatusItem(
    listId: number,
    newStatus: number
  ): Promise<ContractTransaction | undefined> {
    return this.contract?.changeItemStatus(listId, newStatus);
  }

  public async changePrice(
    listId: number,
    newPrice: string
  ): Promise<ContractTransaction | undefined> {
    return this.contract?.getListedAgain(listId, newPrice);
  }

  public async getItem(tokenId: number) {
    return this.contract?.items(tokenId);
  }

  public async buyItem(tokenId: number, price: string): Promise<ContractTransaction | undefined> {
    return this.contract?.buyItem(tokenId, { value: price });
  }
}
