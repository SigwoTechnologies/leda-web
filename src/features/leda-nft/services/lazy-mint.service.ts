import { Domain, jupTypes, types, Voucher } from '../types/lazy-minting-types';
import { getContracts } from '../../../utils/getContracts';
import { getSigner } from '../../../common/utils/metamask-utils';
import ILazyMintService from '../interfaces/lazy-mint-service.interface';

const SIGNING_DOMAIN_VERSION = '1';

const { LedaAddress, JupApeAddress } = getContracts();

export default class LazyMintService implements ILazyMintService {
  private contractAddress: string;

  constructor() {
    this.contractAddress = '';
  }

  async createVoucher(
    uri: string,
    creator: string,
    royalties: number,
    minPrice: string
  ): Promise<Voucher> {
    this.contractAddress = LedaAddress;
    const signer = getSigner();
    const domain = await this.signingDomain('LazyLeda-Voucher');
    const voucher = { minPrice, uri, creator, royalties };
    const signature = await signer._signTypedData(domain, types, voucher);

    return { ...voucher, signature } as Voucher;
  }

  async createJupVoucher(
    uri: string,
    royalties: number,
    minPrice: string,
    tokenId: number,
    stakingRewards: number
  ) {
    this.contractAddress = JupApeAddress;
    const signer = getSigner();
    const domain = await this.signingDomain('LazyNFT-Voucher');
    const voucher = { tokenId, minPrice, uri, royalties, stakingRewards };
    const signature = await signer._signTypedData(domain, jupTypes, voucher);

    return { ...voucher, signature } as Voucher;
  }

  private async signingDomain(domainName: string): Promise<Domain> {
    const signer = getSigner();
    const chainId = await signer.getChainId();

    return {
      name: domainName,
      version: SIGNING_DOMAIN_VERSION,
      verifyingContract: this.contractAddress,
      chainId,
    };
  }
}

export const lazyMintService = new LazyMintService();
