import ICommand from '../interfaces/command.interface';
import MarketplaceState from '../types/marketplace-state';

export default class LedaNftInvoker {
  constructor(
    private state: MarketplaceState,
    private onStoreIpfsObject: ICommand<MarketplaceState>,
    private onMintNftCommand: ICommand<MarketplaceState>,
    private onGetTokenIdCommand: ICommand<MarketplaceState>,
    private onGetIpfsMetadataCommand: ICommand<MarketplaceState>,
    private onStoreItemCommand: ICommand<MarketplaceState>
  ) {}

  async execute() {
    this.state = await this.onStoreIpfsObject.execute(this.state);

    if (!this.state.error) this.state = await this.onMintNftCommand.execute(this.state);

    if (!this.state.error) this.state = await this.onGetTokenIdCommand.execute(this.state);

    if (!this.state.error) this.state = await this.onGetIpfsMetadataCommand.execute(this.state);

    if (!this.state.error) this.state = await this.onStoreItemCommand.execute(this.state);

    return this.state;
  }
}
