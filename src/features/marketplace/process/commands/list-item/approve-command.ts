import { getContracts } from '../../../../../utils/getContracts';
import { rejectWithMetamask } from '../../../../../store/error/error-handler';
import ICommand from '../../interfaces/command.interface';
import MarketplaceError from '../../enums/marketplace-error.enum';
import MarketplaceState from '../../types/marketplace-state';
import INftService from '../../../../../common/interfaces/nft-service.interface';

const { MarketplaceAddress } = getContracts();

export default class ApproveCommand implements ICommand<MarketplaceState> {
  private readonly ledaNftService: INftService;

  constructor(_ledaNftService: INftService) {
    this.ledaNftService = _ledaNftService;
  }

  async execute(state: MarketplaceState): Promise<MarketplaceState> {
    if (!state.ownerAddress) return { ...state, error: MarketplaceError.RequiredOwnerAddress };
    if (!state.collectionAddress)
      return { ...state, error: MarketplaceError.RequiredCollectionAddress };

    try {
      await this.ledaNftService.init(state.collectionAddress);

      const approvedNft = await this.ledaNftService.isApproveForAll(
        state.ownerAddress,
        MarketplaceAddress
      );

      if (!approvedNft) {
        await this.ledaNftService.approveForAll(MarketplaceAddress);
        state.isContractApproved = true;
      }
    } catch (ex) {
      return rejectWithMetamask(ex, () => ({
        ...state,
        error: MarketplaceError.ApproveCommandFailure,
      }));
    }

    return state;
  }
}
