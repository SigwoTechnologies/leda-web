import ICommand from '../interfaces/command.interface';
import MintState from '../types/mint-state';

export default class LedaNftInvoker {
  constructor(
    private state: MintState,
    private onStoreIpfsObject: ICommand<MintState>,
    private onMintNftCommand: ICommand<MintState>,
    private onGetTokenIdCommand: ICommand<MintState>,
    private onGetIpfsMetadataCommand: ICommand<MintState>,
    private onStoreItemCommand: ICommand<MintState>,
    private onStoreHistoryItemCommand: ICommand<MintState>
  ) {}

  async execute() {
    this.state = await this.onStoreIpfsObject.execute(this.state);

    if (!this.state.error) this.state = await this.onMintNftCommand.execute(this.state);

    if (!this.state.error) this.state = await this.onGetTokenIdCommand.execute(this.state);

    if (!this.state.error) this.state = await this.onGetIpfsMetadataCommand.execute(this.state);

    if (!this.state.error) this.state = await this.onStoreItemCommand.execute(this.state);

    if (!this.state.error) this.state = await this.onStoreHistoryItemCommand.execute(this.state);

    return this.state;
  }
}
