import { ContractTransaction } from 'ethers';
import { Voucher } from '../../features/leda-nft/types/lazy-minting-types';

interface INftService {
  init(address: string): Promise<void>;
  mint(tokenURI: string, royalty: number): Promise<ContractTransaction | undefined>;
  approveForAll(address: string): Promise<void>;
  isApproveForAll(ownerAddress: string, marketPlaceAddress: string): Promise<Boolean | undefined>;
  redeem(voucher: Voucher, address: string): Promise<ContractTransaction | undefined>;
}

export default INftService;
