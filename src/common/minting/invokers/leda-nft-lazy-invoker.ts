import ICommand from '../interfaces/command.interface';
import MintState from '../types/mint-state';

export default class LedaNftLazyInvoker {
  constructor(
    private state: MintState,
    private onStoreDraftItemCommand: ICommand<MintState>,
    private onStoreIpfsObjectCommand: ICommand<MintState>,
    private onGetIpfsMetadataCommand: ICommand<MintState>,
    private onGetVoucherCommand: ICommand<MintState>,
    private onActivateItemCommand: ICommand<MintState>
  ) {}

  async execute() {
    this.state = await this.onStoreDraftItemCommand.execute(this.state);

    if (!this.state.error) this.state = await this.onStoreIpfsObjectCommand.execute(this.state);

    if (!this.state.error) this.state = await this.onGetIpfsMetadataCommand.execute(this.state);

    if (!this.state.error) this.state = await this.onGetVoucherCommand.execute(this.state);

    // TODO: Activate lazy item + store voucher

    return this.state;
  }
}
