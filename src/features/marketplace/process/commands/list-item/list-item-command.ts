import { ethers } from 'ethers';
import { IMarketplaceService } from '../../../services/marketplace-service.interface';
import { rejectWithMetamask } from '../../../../../store/error/error-handler';
import ICommand from '../../interfaces/command.interface';
import MarketplaceError from '../../enums/marketplace-error.enum';
import MarketplaceState from '../../types/marketplace-state';

export default class ListItemCommand implements ICommand<MarketplaceState> {
  private readonly marketplaceService: IMarketplaceService;

  constructor(_marketplaceService: IMarketplaceService) {
    this.marketplaceService = _marketplaceService;
  }

  async execute(state: MarketplaceState): Promise<MarketplaceState> {
    if (!state.price) return { ...state, error: MarketplaceError.RequiredPrice };
    if (!state.tokenId) return { ...state, error: MarketplaceError.RequiredTokenId };
    if (!state.collectionAddress)
      return { ...state, error: MarketplaceError.RequiredCollectionAddress };

    try {
      await this.marketplaceService.init(state.collectionAddress);

      const wei = ethers.utils.parseUnits(String(state.price), 'ether').toString();
      const transaction = await this.marketplaceService.listItem(
        state.collectionAddress,
        state.tokenId,
        wei,
        state.ownerAddress
      );
      if (!transaction) return { ...state, error: MarketplaceError.ListItemUnsuccessful };

      const contractReceipt = await transaction.wait();
      if (!contractReceipt) return { ...state, error: MarketplaceError.ContractReceiptFailure };

      const listedItemEvent = contractReceipt.events?.find((e) => e.event === state.mintEventName);
      if (!listedItemEvent) return { ...state, error: MarketplaceError.ContractEventNotFound };

      state.marketplaceEvent = listedItemEvent;
    } catch (ex) {
      return rejectWithMetamask(ex, () => ({ ...state, error: MarketplaceError.ListItemFailure }));
    }

    return state;
  }
}
