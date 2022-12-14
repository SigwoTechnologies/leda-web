import * as ErrorHandler from '../../../../store/error/error-handler';
import ICommand from '../../interfaces/command.interface';
import MintError from '../../enums/mint-error.enum';
import MintState from '../../types/mint-state';
import IItemService from '../../../../features/leda-nft/interfaces/item-service.interface';
import DraftItemRequest from '../../../types/draft-item-request';

export default class StoreDraftItemCommand implements ICommand<MintState> {
  private readonly itemService: IItemService;

  constructor(_itemService: IItemService) {
    this.itemService = _itemService;
  }

  async execute(state: MintState): Promise<MintState> {
    if (!state.address) return { ...state, error: MintError.RequiredAddress };
    if (!state.collectionAddress) return { ...state, error: MintError.RequiredCollectionAddress };
    if (!state.description) return { ...state, error: MintError.RequiredDescription };
    if (!state.name) return { ...state, error: MintError.RequiredName };
    if (state.royalty < 0) return { ...state, error: MintError.RequiredRoyalty };
    if (!state.tags) return { ...state, error: MintError.RequiredTags };
    if (state.isLazy && !state.price) return { ...state, error: MintError.RequiredPrice };

    try {
      const item = {
        address: state.address,
        collectionAddress: state.collectionAddress,
        description: state.description,
        name: state.name,
        collection: state.collection,
        royalty: state.royalty,
        tags: state.tags,
        itemProperties: state.itemProperties,
        price: state.price,
      } as DraftItemRequest;

      state.item = await this.itemService.create(item);
    } catch (ex) {
      return ErrorHandler.rejectWithHttp(ex, () => ({
        ...state,
        error: MintError.StoreDraftItemFailure,
      }));
    }

    return state;
  }
}
