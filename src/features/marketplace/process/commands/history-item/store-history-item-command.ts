/* eslint-disable no-console */
import HistoryService from '../../../services/history-service';
import MarketplaceError from '../../enums/marketplace-error.enum';
import ICommand from '../../interfaces/command.interface';
import MarketplaceState from '../../types/marketplace-state';

export default class StoreHistoryItemCommand implements ICommand<MarketplaceState> {
  private readonly historyService: HistoryService;

  constructor(_historyService: HistoryService) {
    this.historyService = _historyService;
  }

  async execute(state: MarketplaceState): Promise<MarketplaceState> {
    if (!state.address) return { ...state, error: MarketplaceError.RequiredAddress };
    if (!state.itemId) return { ...state, error: MarketplaceError.RequiredItemId };
    if (!state.price) return { ...state, error: MarketplaceError.RequiredPrice };
    if (!state.listId) return { ...state, error: MarketplaceError.RequiredListId };
    if (!state.transactionType)
      return { ...state, error: MarketplaceError.RequiredTransactionType };

    try {
      state.item = await this.historyService.create({
        accountAddress: state.address,
        itemId: state.itemId,
        price: state.price,
        listId: state.listId,
        transactionType: state.transactionType,
      });
    } catch (ex) {
      // TODO: Handle exceptions properly
      console.log('ex|HistoryItemCommand', ex);
      return { ...state, error: MarketplaceError.StoreItemFailure };
    }

    return state;
  }
}
