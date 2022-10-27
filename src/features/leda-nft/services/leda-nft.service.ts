import { ContractTransaction } from 'ethers';
import { LedaNFT } from '../types/LedaNFT';
import createContract from '../../../common/utils/contract-utils';
import INftService from '../../../common/interfaces/nft-service.interface';
import ledaNft from '../../../contracts/LedaNFT.json';
import ledaNftAddress from '../../../contracts/LedaNFT-address.json';
import marketplaceAddress from '../../../contracts/Marketplace-address.json';

export default class LedaNftService implements INftService {
  private contract: LedaNFT | null;

  constructor() {
    this.contract = null;
  }

  public async init(): Promise<void> {
    this.contract = await createContract<LedaNFT>(ledaNftAddress.address, ledaNft.abi);
  }

  public async getOwner(tokenId: number): Promise<string | undefined> {
    return this.contract?.ownerOf(tokenId);
  }

  public async mint(tokenURI: string, royalty: number): Promise<ContractTransaction | undefined> {
    await this.contract?.setApprovalForAll(marketplaceAddress.address, true);
    return this.contract?.mint(tokenURI, royalty);
  }
}
