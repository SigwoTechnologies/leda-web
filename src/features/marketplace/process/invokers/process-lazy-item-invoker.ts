import ICommand from '../interfaces/command.interface';
import MarketplaceState from '../types/marketplace-state';

export default class ProcessLazyItemInvoker {
  constructor(
    private state: MarketplaceState,
    private onGenerateVoucherCommand: ICommand<MarketplaceState>,
    private onStoreVoucherCommand: ICommand<MarketplaceState>
  ) {}

  async execute() {
    if (!this.state.error) this.state = await this.onGenerateVoucherCommand.execute(this.state);

    if (!this.state.error) this.state = await this.onStoreVoucherCommand.execute(this.state);

    return this.state;
  }
}
