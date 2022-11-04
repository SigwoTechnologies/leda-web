import ICommand from '../interfaces/command.interface';
import MarketplaceState from '../types/marketplace-state';

export default class MakeItemInvoker {
  constructor(
    private state: MarketplaceState,
    private onListItemCommand: ICommand<MarketplaceState>,
    private onStoreListItemCommand: ICommand<MarketplaceState>,
    private onStoreHistoryItemCommand: ICommand<MarketplaceState>
  ) {}

  async execute() {
    this.state = await this.onListItemCommand.execute(this.state);

    if (!this.state.error) this.state = await this.onStoreListItemCommand.execute(this.state);
    if (!this.state.error) this.state = await this.onStoreHistoryItemCommand.execute(this.state);

    return this.state;
  }
}
