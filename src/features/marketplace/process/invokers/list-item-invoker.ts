import ICommand from '../interfaces/command.interface';
import MarketplaceState from '../types/marketplace-state';

export default class ListItemInvoker {
  constructor(
    private state: MarketplaceState,
    private onApproveCommand: ICommand<MarketplaceState>,
    private onListItemCommand: ICommand<MarketplaceState>,
    private onStoreListItemCommand: ICommand<MarketplaceState>
  ) {}

  async execute() {
    this.state = await this.onApproveCommand.execute(this.state);

    if (!this.state.error) await this.onListItemCommand.execute(this.state);

    if (!this.state.error) this.state = await this.onStoreListItemCommand.execute(this.state);

    return this.state;
  }
}
