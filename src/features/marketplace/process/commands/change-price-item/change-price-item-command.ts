import { ethers } from 'ethers';
import { IMarketplaceService } from '../../../services/marketplace-service.interface';
import { rejectWithMetamask } from '../../../../../store/error/error-handler';
import ICommand from '../../interfaces/command.interface';
import MarketplaceError from '../../enums/marketplace-error.enum';
import MarketplaceState from '../../types/marketplace-state';
import ContractEvent from '../../enums/contract-event.enum';

export default class ChangePriceItemCommand implements ICommand<MarketplaceState> {
  private readonly marketplaceService: IMarketplaceService;

  constructor(_marketplaceService: IMarketplaceService) {
    this.marketplaceService = _marketplaceService;
  }

  async execute(state: MarketplaceState): Promise<MarketplaceState> {
    if (!state.price) return { ...state, error: MarketplaceError.RequiredPrice };
    if (!state.listId) return { ...state, error: MarketplaceError.RequiredListId };

    try {
      await this.marketplaceService.init();

      const wei = ethers.utils.parseUnits(String(state.price), 'ether').toString();
      const transaction = await this.marketplaceService.changePrice(state.listId, wei);

      if (!transaction) return { ...state, error: MarketplaceError.ChangePriceItemFailure };

      const contractReceipt = await transaction.wait();
      if (!contractReceipt) return { ...state, error: MarketplaceError.ContractReceiptFailure };

      const eventFound = contractReceipt.events?.find((e) => e.event === state.mintEventName);
      if (!eventFound) return { ...state, error: MarketplaceError.ContractEventNotFound };

      state.marketplaceEvent = eventFound;
      state.mintEventName = ContractEvent.LogChangeStatus;
    } catch (ex) {
      return rejectWithMetamask(ex, () => ({
        ...state,
        error: MarketplaceError.ChangePriceItemFailure,
      }));
    }

    return state;
  }
}
