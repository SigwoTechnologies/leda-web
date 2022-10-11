import ItemRequest from '../../../types/item-request';
import ICommand from '../../interfaces/command.interface';
import MintError from '../../enums/mint-error';
import MintState from '../../types/mint-state';
import ItemStatus from '../../enums/item-status.enum';
import ItemService from '../../../../features/leda-nft/services/item.service';

export default class StoreItemCommand implements ICommand<MintState> {
  private readonly itemService: ItemService;

  constructor(_itemService: ItemService) {
    this.itemService = _itemService;
  }

  async execute(state: MintState): Promise<MintState> {
    if (!state.address) return { ...state, error: MintError.RequiredAddress };
    if (!state.cid) return { ...state, error: MintError.RequiredCid };
    if (!state.collectionAddress) return { ...state, error: MintError.RequiredCollectionAddress };
    if (!state.description) return { ...state, error: MintError.RequiredDescription };
    if (!state.imageUrl) return { ...state, error: MintError.RequiredImageUrl };
    if (!state.name) return { ...state, error: MintError.RequiredName };
    if (!state.royalty) return { ...state, error: MintError.RequiredRoyalty };
    if (!state.tokenId) return { ...state, error: MintError.RequiredTokenId };

    try {
      const item = {
        address: state.address,
        collectionAddress: state.collectionAddress,
        description: state.description,
        image: { url: state.imageUrl, cid: state.cid },
        name: state.name,
        royalty: state.royalty,
        status: state.status || ItemStatus.NotListed,
        tokenId: state.tokenId,
      } as ItemRequest;

      state.item = await this.itemService.create(item);
    } catch (ex) {
      // TODO: Handle exceptions properly
      console.log('ex|StoreNftCommand', ex);
      return { ...state, error: MintError.StoreItemFailure };
    }

    return state;
  }
}
