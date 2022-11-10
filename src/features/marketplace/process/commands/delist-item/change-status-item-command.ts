import { rejectWithMetamask } from '../../../../../store/error/error-handler';
import { IMarketplaceService } from '../../../services/marketplace-service.interface';
import MarketplaceError from '../../enums/marketplace-error.enum';
import ICommand from '../../interfaces/command.interface';
import MarketplaceState from '../../types/marketplace-state';

export default class ChangeStatusItemCommand implements ICommand<MarketplaceState> {
  private readonly marketplaceService: IMarketplaceService;

  constructor(_marketplaceService: IMarketplaceService) {
    this.marketplaceService = _marketplaceService;
  }

  async execute(state: MarketplaceState): Promise<MarketplaceState> {
    if (!state.listId) return { ...state, error: MarketplaceError.RequiredListId };
    if (!state.itemId) return { ...state, error: MarketplaceError.RequiredItemId };

    try {
      await this.marketplaceService.init();

      const transaction = await this.marketplaceService.changeStatusItem(
        state.listId,
        Number(state.status)
      );
      if (!transaction) return { ...state, error: MarketplaceError.ChangeStatusUnsuccessful };

      const contractReceipt = await transaction.wait();
      if (!contractReceipt) return { ...state, error: MarketplaceError.ContractReceiptFailure };

      const eventFound = contractReceipt.events?.find((e) => e.event === state.mintEventName);
      if (!eventFound) return { ...state, error: MarketplaceError.ContractEventNotFound };

      state.marketplaceEvent = eventFound;
    } catch (ex) {
      return rejectWithMetamask(ex, () => ({
        ...state,
        error: MarketplaceError.ChangeStatusItemFailure,
      }));
    }

    return state;
  }
}
