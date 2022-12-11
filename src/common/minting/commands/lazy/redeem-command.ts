import { rejectWithMetamask } from '../../../../store/error/error-handler';
import ICommand from '../../interfaces/command.interface';
import INftService from '../../../interfaces/nft-service.interface';
import MintError from '../../enums/mint-error.enum';
import MintState from '../../types/mint-state';

export default class RedeemCommand implements ICommand<MintState> {
  private readonly nftService: INftService;

  constructor(_nftService: INftService) {
    this.nftService = _nftService;
  }

  async execute(state: MintState): Promise<MintState> {
    if (!state.address) return { ...state, error: MintError.RequiredAddress };
    if (!state.collectionAddress) return { ...state, error: MintError.RequiredCollectionAddress };
    if (!state.voucher) return { ...state, error: MintError.RequiredVoucher };
    if (!state.voucher.creator) return { ...state, error: MintError.RequiredAddress };
    if (!state.voucher.minPrice) return { ...state, error: MintError.RequiredVoucherMinPrice };
    if (state.voucher.royalties < 0) return { ...state, error: MintError.RequiredVoucherRoyalties };
    if (!state.voucher.signature) return { ...state, error: MintError.RequiredVoucherSignature };
    if (!state.voucher.uri) return { ...state, error: MintError.RequiredVoucherUri };

    try {
      await this.nftService.init(state.collectionAddress);

      const transaction = await this.nftService.redeem(state.voucher, state.address);
      if (!transaction) return { ...state, error: MintError.MintNftUnsuccessful };

      const contractReceipt = await transaction.wait();
      if (!contractReceipt) return { ...state, error: MintError.ContractReceiptFailure };

      const mintedEvent = contractReceipt.events?.find((e) => e.event === state.mintEventName);
      if (!mintedEvent) return { ...state, error: MintError.ContractEventNotFound };

      state.mintEvent = mintedEvent;
    } catch (ex) {
      return rejectWithMetamask(ex, () => ({ ...state, error: MintError.RedeemFailure }));
    }

    return state;
  }
}
