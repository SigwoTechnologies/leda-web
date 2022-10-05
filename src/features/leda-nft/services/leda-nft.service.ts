import { ContractTransaction } from 'ethers';
import { INftService } from '../../../common/interfaces/nft-service.interface';
import { createContract } from '../../../common/utils/contract-utils';
import { LedaNFT } from '../types/LedaNFT';
import ledaNftAddress from '../../../contracts/LedaNFT-address.json';
import ledaNft from '../../../contracts/LedaNFT.json';

export default class LedaNftService implements INftService {
  private contract: LedaNFT | null;

  constructor() {
    this.contract = null;
  }

  public async init(): Promise<void> {
    this.contract = await createContract<LedaNFT>(ledaNftAddress.address, ledaNft.abi);
  }

  public async mint(tokenURI: string, royalty: number): Promise<ContractTransaction | undefined> {
    return this.contract?.mint(tokenURI, royalty);
  }
}
