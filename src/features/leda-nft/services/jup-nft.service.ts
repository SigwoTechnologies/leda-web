import { ContractTransaction } from 'ethers';
import { getContracts } from '../../../utils/getContracts';
import createContract from '../../../common/utils/contract-utils';
import { Voucher } from '../types/lazy-minting-types';
import { JupApesNFT } from '../types/JupApeNFT';
import INftCreateService from '../../../common/interfaces/nft-create-service.interface';

const { JupApeAbi } = getContracts();
export default class JupNftService implements INftCreateService {
  private contract: JupApesNFT | null;

  constructor() {
    this.contract = null;
  }

  public async init(address: string): Promise<void> {
    this.contract = await createContract<JupApesNFT>(address, JupApeAbi);
  }

  public async redeem(voucher: Voucher, address: string): Promise<ContractTransaction | undefined> {
    return this.contract?.redeem(address, voucher, { value: voucher.minPrice });
  }
}

export const jupNftService = new JupNftService();
