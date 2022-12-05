import ICommand from '../interfaces/command.interface';
import MintState from '../types/mint-state';

export default class LedaNftLazyInvoker {
  constructor(
    private state: MintState,
    private onStoreDraftItemCommand: ICommand<MintState>,
    private onStoreIpfsObjectCommand: ICommand<MintState>,
    private onGetIpfsMetadataCommand: ICommand<MintState>,
    private onGenerateVoucherCommand: ICommand<MintState>,
    private onStoreVoucherCommand: ICommand<MintState>
  ) {}

  async execute() {
    this.state = await this.onStoreDraftItemCommand.execute(this.state);

    if (!this.state.error) this.state = await this.onStoreIpfsObjectCommand.execute(this.state);

    if (!this.state.error) this.state = await this.onGetIpfsMetadataCommand.execute(this.state);

    if (!this.state.error) this.state = await this.onGenerateVoucherCommand.execute(this.state);

    if (!this.state.error) this.state = await this.onStoreVoucherCommand.execute(this.state);

    return this.state;
  }
}
