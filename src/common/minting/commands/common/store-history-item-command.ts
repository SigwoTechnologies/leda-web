/* eslint-disable no-console */
import HistoryService from '../../../../features/marketplace/services/history-service';
import MintError from '../../enums/mint-error.enum';
import ICommand from '../../interfaces/command.interface';
import MintState from '../../types/mint-state';

export default class StoreHistoryItemCommand implements ICommand<MintState> {
  private readonly historyService: HistoryService;

  constructor(_historyService: HistoryService) {
    this.historyService = _historyService;
  }

  async execute(state: MintState): Promise<MintState> {
    if (!state.address) return { ...state, error: MintError.RequiredAddress };
    if (!state.transactionType) return { ...state, error: MintError.RequiredTransactionType };

    try {
      state.item = await this.historyService.create({
        accountAddress: state.address,
        itemId: state.item.itemId,
        price: state.item.price,
        listId: state.item.listId,
        transactionType: state.transactionType,
      });
    } catch (ex) {
      // TODO: Handle exceptions properly
      console.log('ex|HistoryItemCommand', ex);
      return { ...state, error: MintError.StoreItemFailure };
    }

    return state;
  }
}
