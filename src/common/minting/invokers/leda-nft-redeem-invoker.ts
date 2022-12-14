import ICommand from '../../../features/marketplace/process/interfaces/command.interface';
import MintState from '../types/mint-state';

export default class LedaNftRedeemInvoker {
  constructor(
    private state: MintState,
    private onGetVoucherCommand: ICommand<MintState>,
    private onRedeemVoucherCommand: ICommand<MintState>,
    private onGetTokenIdCommand: ICommand<MintState>,
    private onTransferOwnershipCommand: ICommand<MintState>
  ) {}

  async execute() {
    this.state = await this.onGetVoucherCommand.execute(this.state);

    if (!this.state.error) this.state = await this.onRedeemVoucherCommand.execute(this.state);

    if (!this.state.error) this.state = await this.onGetTokenIdCommand.execute(this.state);

    if (!this.state.error) this.state = await this.onTransferOwnershipCommand.execute(this.state);

    return this.state;
  }
}
