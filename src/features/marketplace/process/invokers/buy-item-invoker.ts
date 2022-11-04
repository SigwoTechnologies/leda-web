import ICommand from '../interfaces/command.interface';
import MarketplaceState from '../types/marketplace-state';

export default class PurchaseNftInvoker {
  constructor(
    private state: MarketplaceState,
    private onBuyItemCommand: ICommand<MarketplaceState>,
    private onStoreBuyItemCommand: ICommand<MarketplaceState>,
    private onStoreHistoryItemCommand: ICommand<MarketplaceState>
  ) {}

  async execute() {
    this.state = await this.onBuyItemCommand.execute(this.state);

    if (!this.state.error) this.state = await this.onStoreBuyItemCommand.execute(this.state);

    if (!this.state.error) this.state = await this.onStoreHistoryItemCommand.execute(this.state);

    return this.state;
  }
}
