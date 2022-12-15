import { ContractTransaction } from 'ethers';
import { Voucher } from '../../features/leda-nft/types/lazy-minting-types';

interface INftInitService {
  init(address: string): Promise<void>;
  redeem(voucher: Voucher, address: string): Promise<ContractTransaction | undefined>;
}

export default INftInitService;
