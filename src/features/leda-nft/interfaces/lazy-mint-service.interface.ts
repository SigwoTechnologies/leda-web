import { Voucher } from '../types/lazy-minting-types';

interface ILazyMintService {
  createVoucher(
    uri: string,
    creator: string,
    royalties: number,
    minPrice: number
  ): Promise<Voucher>;
}

export default ILazyMintService;
