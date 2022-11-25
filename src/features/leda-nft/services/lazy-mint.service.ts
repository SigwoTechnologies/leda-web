import { Domain, types, Voucher } from '../types/lazy-minting-types';
import { getContracts } from '../../../utils/getContracts';
import { getSigner } from '../../../common/utils/metamask-utils';
import ILazyMintService from '../interfaces/lazy-mint-service.interface';

const SIGNING_DOMAIN_NAME = 'LazyLeda-Voucher';
const SIGNING_DOMAIN_VERSION = '1';

const { LedaAddress } = getContracts();

export default class LazyMintService implements ILazyMintService {
  private readonly contractAddress: string;

  private domain!: Domain;

  constructor() {
    this.contractAddress = LedaAddress;
  }

  async createVoucher(
    uri: string,
    creator: string,
    royalties: number,
    minPrice = 0
  ): Promise<Voucher> {
    const signer = getSigner();
    this.domain = await this.signingDomain();
    const voucher = { minPrice, uri, creator, royalties };
    const signature = await signer._signTypedData(this.domain, types, voucher);

    return { ...voucher, signature } as Voucher;
  }

  private async signingDomain(): Promise<Domain> {
    if (this.domain != null) return this.domain;

    const signer = getSigner();
    const chainId = await signer.getChainId();

    return {
      name: SIGNING_DOMAIN_NAME,
      version: SIGNING_DOMAIN_VERSION,
      verifyingContract: this.contractAddress,
      chainId,
    };
  }
}

export const lazyMintService = new LazyMintService();
