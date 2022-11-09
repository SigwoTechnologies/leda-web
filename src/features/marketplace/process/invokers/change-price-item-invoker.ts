import ICommand from '../interfaces/command.interface';
import MarketplaceState from '../types/marketplace-state';

export default class ChangePriceItemInvoker {
  constructor(
    private state: MarketplaceState,
    private onChangePriceItemCommand: ICommand<MarketplaceState>,
    private onChangeStatusItemCommand: ICommand<MarketplaceState>,
    private onStoreChangePriceItemCommand: ICommand<MarketplaceState>
  ) {}

  async execute() {
    this.state = await this.onChangePriceItemCommand.execute(this.state);

    if (!this.state.error) this.state = await this.onChangeStatusItemCommand.execute(this.state);

    if (!this.state.error)
      this.state = await this.onStoreChangePriceItemCommand.execute(this.state);

    return this.state;
  }
}
