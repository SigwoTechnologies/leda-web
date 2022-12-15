export type Domain = {
  name: string;
  version: string;
  verifyingContract: string;
  chainId: number;
};

export type VoucherAuthor = {
  address: string;
};

export type Voucher = {
  voucherId: string;
  minPrice: string;
  uri: string;
  creator: string;
  royalties: number;
  signature: string;
  author: VoucherAuthor;
  stakingRewards: number;
  tokenId: number;
};

export const types = {
  NFTVoucher: [
    { name: 'minPrice', type: 'uint256' },
    { name: 'uri', type: 'string' },
    { name: 'creator', type: 'address' },
    { name: 'royalties', type: 'uint256' },
  ],
};
