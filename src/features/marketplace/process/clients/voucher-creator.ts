import { getContracts } from '../../../../utils/getContracts';
import MarketplaceState from '../types/marketplace-state';
import GenerateJupVoucherCommand from '../commands/common-lazy/generate-jup-voucher-command';
import GenerateVoucherCommand from '../commands/common-lazy/generate-voucher-command';
import ILazyMintService from '../../../leda-nft/interfaces/lazy-mint-service.interface';
import ICommand from '../interfaces/command.interface';

const { LedaAddress, JupApeAddress } = getContracts();

export default class VoucherCreator {
  static createCommand(
    state: MarketplaceState,
    lazyMintService: ILazyMintService
  ): ICommand<MarketplaceState> {
    if (state.collectionAddress.toLocaleLowerCase() === JupApeAddress.toLocaleLowerCase())
      return new GenerateJupVoucherCommand(lazyMintService);

    if (state.collectionAddress.toLocaleLowerCase() === LedaAddress.toLocaleLowerCase())
      return new GenerateVoucherCommand(lazyMintService);

    throw new Error('There is no marketplace implementation for this flow');
  }
}
