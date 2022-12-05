import ICommand from '../../interfaces/command.interface';
import MintError from '../../enums/mint-error.enum';
import MintState from '../../types/mint-state';
import IItemService from '../../../../features/leda-nft/interfaces/item-service.interface';
import ProcessLazyItemRequest from '../../../types/process-lazy-item-request';

export default class StoreVoucherCommand implements ICommand<MintState> {
  private readonly itemService: IItemService;

  constructor(_itemService: IItemService) {
    this.itemService = _itemService;
  }

  async execute(state: MintState): Promise<MintState> {
    if (!state.item || !state.item.itemId) return { ...state, error: MintError.RequiredItemId };
    if (!state.cid) return { ...state, error: MintError.RequiredCid };
    if (!state.lazyProcessType) return { ...state, error: MintError.RequiredLazyProcessType };
    if (!state.voucher.creator) return { ...state, error: MintError.RequiredAddress };
    if (!state.voucher.minPrice) return { ...state, error: MintError.RequiredVoucherMinPrice };
    if (state.voucher.royalties < 0) return { ...state, error: MintError.RequiredVoucherRoyalties };
    if (!state.voucher.signature) return { ...state, error: MintError.RequiredVoucherSignature };
    if (!state.voucher.uri) return { ...state, error: MintError.RequiredVoucherUri };
    if (!state.voucher) return { ...state, error: MintError.RequiredVoucher };

    // eslint-disable-next-line no-debugger
    debugger;
    try {
      const request = {
        itemId: state.item.itemId,
        address: state.voucher.creator,
        minPrice: state.voucher.minPrice.toString(),
        royalties: state.voucher.royalties,
        signature: state.voucher.signature,
        image: { url: state.voucher.uri, cid: state.cid },
        lazyProcessType: state.lazyProcessType,
      } as ProcessLazyItemRequest;

      state.item = await this.itemService.processLazyItem(request);
    } catch (ex) {
      // TODO: Handle exceptions properly
      console.log('ex|StoreVoucherCommand', ex);
      return { ...state, error: MintError.StoreVoucherCommandFailure };
    }

    return state;
  }
}
