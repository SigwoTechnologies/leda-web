import ICommand from '../interfaces/command.interface';
import MarketplaceState from '../types/marketplace-state';

export default class DelistItemInvoker {
  constructor(
    private state: MarketplaceState,
    private onChangeStatusItemCommand: ICommand<MarketplaceState>,
    private onStoreDelistItemCommand: ICommand<MarketplaceState>
  ) {}

  async execute() {
    this.state = await this.onChangeStatusItemCommand.execute(this.state);

    if (!this.state.error) this.state = await this.onStoreDelistItemCommand.execute(this.state);

    return this.state;
  }
}
