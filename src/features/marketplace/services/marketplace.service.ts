import { ContractTransaction } from 'ethers';
import { getContracts } from '../../../utils/getContracts';
import INftService from '../../../common/interfaces/nft-service.interface';
import createContract from '../../../common/utils/contract-utils';
import { Marketplace } from '../types/Marketplace';
import { IMarketplaceService } from './marketplace-service.interface';

const { MarketplaceAddress, MarketplaceAbi } = getContracts();
export default class MarketplaceService implements IMarketplaceService {
  private contract: Marketplace | null;

  private readonly ledaNftService: INftService;

  constructor(_ledaNftervice: INftService) {
    this.contract = null;
    this.ledaNftService = _ledaNftervice;
  }

  public async init(): Promise<void> {
    this.contract = await createContract<Marketplace>(MarketplaceAddress, MarketplaceAbi);
    await this.ledaNftService.init();
  }

  public async getOwner(): Promise<string | undefined> {
    return this.contract?.owner();
  }

  public async listItem(
    contractAddress: string,
    tokenId: number,
    price: string,
    ownerAddress: string
  ): Promise<ContractTransaction | undefined> {
    const approvedNft = await this.ledaNftService.isApproveForAll(ownerAddress, MarketplaceAddress);
    if (!approvedNft) await this.ledaNftService.approveForAll(MarketplaceAddress);
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
    return this.contract?.changeItemPrice(listId, newPrice);
  }

  public async getItem(tokenId: number) {
    return this.contract?.items(tokenId);
  }

  public async buyItem(tokenId: number, price: string): Promise<ContractTransaction | undefined> {
    return this.contract?.buyItem(tokenId, { value: price });
  }
}
