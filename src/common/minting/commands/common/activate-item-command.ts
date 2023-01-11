import { rejectWithHttp } from '../../../../store/error/error-handler';
import ActivateItemRequest from '../../../types/activate-item-request';
import ICommand from '../../interfaces/command.interface';
import MintError from '../../enums/mint-error.enum';
import MintState from '../../types/mint-state';
import IItemService from '../../../../features/leda-nft/interfaces/item-service.interface';

export default class ActivateItemCommand implements ICommand<MintState> {
  private readonly itemService: IItemService;

  constructor(_itemService: IItemService) {
    this.itemService = _itemService;
  }

  async execute(state: MintState): Promise<MintState> {
    if (!state.item || !state.item.itemId) return { ...state, error: MintError.RequiredItemId };
    if (!state.address) return { ...state, error: MintError.RequiredAddress };
    if (!state.cid) return { ...state, error: MintError.RequiredCid };
    if (!state.imageUrl) return { ...state, error: MintError.RequiredImageUrl };
    if (!state.tokenId) return { ...state, error: MintError.RequiredTokenId };

    try {
      const item: ActivateItemRequest = {
        itemId: state.item.itemId,
        address: state.address,
        image: { url: state.imageUrl, cid: state.cid },
        tokenId: state.tokenId,
        collection: {
          name: state.collection.name,
          description: state.collection.description,
          image: {
            url: state.collection.image?.url,
            cid: state.collection.image?.cid,
          },
        },
      };

      state.item = await this.itemService.activate(item);
    } catch (ex) {
      return rejectWithHttp(ex, () => ({ ...state, error: MintError.ActivateItemFailure }));
    }

    return state;
  }
}
