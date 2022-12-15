import ItemService from '../../../features/leda-nft/services/item.service';
import IClient from '../interfaces/client.interface';
import MintState from '../types/mint-state';
import LedaNftRedeemInvoker from '../invokers/leda-nft-redeem-invoker';
import GetVoucherCommand from '../commands/lazy/get-voucher-command';
import RedeemCommand from '../commands/lazy/redeem-command';
import TransferCommand from '../commands/lazy/transfer-command';
import GetTokenIdCommand from '../commands/leda-nft/get-tokenid-command';
import NftClientCreator from './nft-client-creator';

export default class RedeemClient implements IClient {
  private readonly invoker: LedaNftRedeemInvoker;

  constructor(state: MintState) {
    const nftService = NftClientCreator.createClient(state);
    const itemService = new ItemService();
    const getVoucherCommand = new GetVoucherCommand(itemService);
    const redeemCommand = new RedeemCommand(nftService);
    const getTokenIdCommand = new GetTokenIdCommand();
    const transferCommand = new TransferCommand(itemService);

    this.invoker = new LedaNftRedeemInvoker(
      state,
      getVoucherCommand,
      redeemCommand,
      getTokenIdCommand,
      transferCommand
    );
  }

  async execute(): Promise<MintState> {
    return this.invoker.execute();
  }
}
