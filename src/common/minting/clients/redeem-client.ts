import ItemService from '../../../features/leda-nft/services/item.service';
import IClient from '../interfaces/client.interface';
import MintState from '../types/mint-state';
import LedaNftRedeemInvoker from '../invokers/leda-nft-redeem-invoker';
import GetVoucherCommand from '../commands/lazy/get-voucher-command';
import RedeemCommand from '../commands/lazy/redeem-command';
import LedaNftService from '../../../features/leda-nft/services/leda-nft.service';
import InvalidateVoucherCommand from '../commands/lazy/invalidate-voucher-command';
import VoucherService from '../../../features/leda-nft/services/voucher.service';

export default class RedeemClient implements IClient {
  private readonly invoker: LedaNftRedeemInvoker;

  constructor(state: MintState) {
    const ledaNftService = new LedaNftService();
    const itemService = new ItemService();
    const voucherService = new VoucherService();
    const getVoucherCommand = new GetVoucherCommand(itemService);
    const redeemCommand = new RedeemCommand(ledaNftService);
    const invalidateVoucherCommand = new InvalidateVoucherCommand(voucherService);

    this.invoker = new LedaNftRedeemInvoker(
      state,
      getVoucherCommand,
      redeemCommand,
      invalidateVoucherCommand
    );
  }

  async execute(): Promise<MintState> {
    return this.invoker.execute();
  }
}
