import ICommand from '../interfaces/command.interface';
import MintState from '../types/mint-state';

export default class LedaNftInvoker {
  constructor(
    private state: MintState,
    private onStoreDraftItemCommand: ICommand<MintState>,
    private onStoreIpfsObjectCommand: ICommand<MintState>,
    private onMintNftCommand: ICommand<MintState>,
    private onGetTokenIdCommand: ICommand<MintState>,
    private onGetIpfsMetadataCommand: ICommand<MintState>,
    private onActivateItemCommand: ICommand<MintState>
  ) {}

  async execute() {
    this.state = await this.onStoreDraftItemCommand.execute(this.state);

    if (!this.state.error) this.state = await this.onStoreIpfsObjectCommand.execute(this.state);

    if (!this.state.error) this.state = await this.onMintNftCommand.execute(this.state);

    if (!this.state.error) this.state = await this.onGetTokenIdCommand.execute(this.state);

    if (!this.state.error) this.state = await this.onGetIpfsMetadataCommand.execute(this.state);

    if (!this.state.error) this.state = await this.onActivateItemCommand.execute(this.state);
    return this.state;
  }
}
