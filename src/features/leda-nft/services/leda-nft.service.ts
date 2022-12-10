import { ContractTransaction } from 'ethers';
import { getContracts } from '../../../utils/getContracts';
import INftService from '../../../common/interfaces/nft-service.interface';
import createContract from '../../../common/utils/contract-utils';
import { LedaNFT } from '../types/LedaNFT';
import { Voucher } from '../types/lazy-minting-types';

const { LedaAddress, LedaAbi } = getContracts();
export default class LedaNftService implements INftService {
  private contract: LedaNFT | null;

  constructor() {
    this.contract = null;
  }

  public async init(): Promise<void> {
    this.contract = await createContract<LedaNFT>(LedaAddress, LedaAbi);
  }

  public async getOwner(tokenId: number): Promise<string | undefined> {
    return this.contract?.ownerOf(tokenId);
  }

  public async mint(tokenURI: string, royalty: number): Promise<ContractTransaction | undefined> {
    return this.contract?.mint(tokenURI, royalty);
  }

  public async approveForAll(address: string): Promise<void> {
    const tx = await this.contract?.setApprovalForAll(address, true);
    await tx?.wait(1);
  }

  public async isApproveForAll(
    ownerAddress: string,
    marketPlaceAddress: string
  ): Promise<Boolean | undefined> {
    const result = await this.contract?.isApprovedForAll(ownerAddress, marketPlaceAddress);
    return result;
  }

  public async redeem(voucher: Voucher, address: string): Promise<ContractTransaction | undefined> {
    return this.contract?.redeem(address, voucher, { value: voucher.minPrice });
  }
}

export const ledaNftService = new LedaNftService();
