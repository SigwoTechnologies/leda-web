import ICommand from '../interfaces/command.interface';
import MarketplaceState from '../types/marketplace-state';

export default class DelistLazyItemInvoker {
  constructor(
    private state: MarketplaceState,
    private onGetVoucherCommand: ICommand<MarketplaceState>,
    private onStoreVoucherCommand: ICommand<MarketplaceState>
  ) {}

  async execute() {
    if (!this.state.error) this.state = await this.onGetVoucherCommand.execute(this.state);

    if (!this.state.error) this.state = await this.onStoreVoucherCommand.execute(this.state);

    return this.state;
  }
}
