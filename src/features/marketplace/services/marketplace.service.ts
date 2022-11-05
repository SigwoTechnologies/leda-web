import { ContractTransaction } from 'ethers';
import axios from 'axios';
import { IMarketplaceService } from './marketplace-service.interface';
import { Marketplace } from '../types/Marketplace';
import createContract from '../../../common/utils/contract-utils';
import INftService from '../../../common/interfaces/nft-service.interface';
import marketplace from '../../../contracts/Marketplace.json';
import marketplaceAddress from '../../../contracts/Marketplace-address.json';
import { Item } from '../../../types/item';

export default class MarketplaceService implements IMarketplaceService {
  private contract: Marketplace | null;

  private readonly ledaNftService: INftService;

  constructor(_ledaNftervice: INftService) {
    this.contract = null;
    this.ledaNftService = _ledaNftervice;
  }

  public async init(): Promise<void> {
    this.contract = await createContract<Marketplace>(marketplaceAddress.address, marketplace.abi);
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
    const approvedNft = await this.ledaNftService.isApproveForAll(
      ownerAddress,
      marketplaceAddress.address
    );
    if (!approvedNft) await this.ledaNftService.approveForAll(marketplaceAddress.address);
    return this.contract?.makeItem(contractAddress, tokenId, price);
  }

  public async findMarketplaceItems(): Promise<{ items: Item[]; databaseLength: number }> {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_LEDA_API_URL}/items?limit=10&page=1`
    );
    return data;
  }

  public async getItem(tokenId: number) {
    return this.contract?.items(tokenId);
  }

  public async buyItem(tokenId: number, price: string): Promise<ContractTransaction | undefined> {
    return this.contract?.buyItem(tokenId, { value: price });
  }
}
