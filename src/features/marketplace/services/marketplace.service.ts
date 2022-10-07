import { IBaseContractService } from '../../../common/interfaces/base-contract-service.interface';
import { IMarketplaceService } from './marketplace-service.interface';
import { Marketplace } from '../types/Marketplace';
import createContract from '../../../common/utils/contract-utils';
import marketplace from '../../../contracts/Marketplace.json';
import marketplaceAddress from '../../../contracts/Marketplace-address.json';

export default class MarketplaceService implements IBaseContractService, IMarketplaceService {
  private contract: Marketplace | null;

  constructor() {
    this.contract = null;
  }

  public async init(): Promise<void> {
    this.contract = await createContract<Marketplace>(marketplaceAddress.address, marketplace.abi);
  }

  public async getOwner(): Promise<string | undefined> {
    return this.contract?.owner();
  }
}
