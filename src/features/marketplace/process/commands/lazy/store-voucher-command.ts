import ProcessLazyItemRequest from '../../../../../common/types/process-lazy-item-request';
import IItemService from '../../../../leda-nft/interfaces/item-service.interface';
import MarketplaceError from '../../enums/marketplace-error.enum';
import ICommand from '../../interfaces/command.interface';
import MarketplaceState from '../../types/marketplace-state';

export default class StoreVoucherCommand implements ICommand<MarketplaceState> {
  private readonly itemService: IItemService;

  constructor(_itemService: IItemService) {
    this.itemService = _itemService;
  }

  async execute(state: MarketplaceState): Promise<MarketplaceState> {
    if (!state.item || !state.item.itemId)
      return { ...state, error: MarketplaceError.RequiredItemId };
    if (!state.cid) return { ...state, error: MarketplaceError.RequiredCid };
    if (!state.lazyProcessType)
      return { ...state, error: MarketplaceError.RequiredLazyProcessType };
    if (!state.voucher.creator) return { ...state, error: MarketplaceError.RequiredAddress };
    if (!state.voucher.minPrice)
      return { ...state, error: MarketplaceError.RequiredVoucherMinPrice };
    if (state.voucher.royalties < 0)
      return { ...state, error: MarketplaceError.RequiredVoucherRoyalties };
    if (!state.voucher.signature)
      return { ...state, error: MarketplaceError.RequiredVoucherSignature };
    if (!state.voucher.uri) return { ...state, error: MarketplaceError.RequiredVoucherUri };
    if (!state.voucher) return { ...state, error: MarketplaceError.RequiredVoucher };

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
      return { ...state, error: MarketplaceError.StoreVoucherCommandFailure };
    }

    return state;
  }
}
