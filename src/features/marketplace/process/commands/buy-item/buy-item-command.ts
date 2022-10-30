import { ethers } from 'ethers';
import { IMarketplaceService } from '../../../services/marketplace-service.interface';
import MarketplaceError from '../../enums/marketplace-error.enum';
import ICommand from '../../interfaces/command.interface';
import MarketplaceState from '../../types/marketplace-state';

export default class BuyItemCommand implements ICommand<MarketplaceState> {
  private readonly marketplaceService: IMarketplaceService;

  constructor(_marketplaceService: IMarketplaceService) {
    this.marketplaceService = _marketplaceService;
  }

  async execute(state: MarketplaceState): Promise<MarketplaceState> {
    if (!state.price) return { ...state, error: MarketplaceError.RequiredPrice };
    if (!state.tokenId) return { ...state, error: MarketplaceError.RequiredTokenId };
    if (!state.listId) return { ...state, error: MarketplaceError.RequiredListId };

    try {
      await this.marketplaceService.init();

      const wei = ethers.utils.parseUnits(String(state.price), 'ether').toString();
      const transaction = await this.marketplaceService.buyItem(state.listId, wei);

      if (!transaction) return { ...state, error: MarketplaceError.ListItemUnsuccessful };

      const contractReceipt = await transaction.wait();
      if (!contractReceipt) return { ...state, error: MarketplaceError.ContractReceiptFailure };

      const boughtItemEvent = contractReceipt.events?.find((e) => e.event === state.mintEventName);
      if (!boughtItemEvent) return { ...state, error: MarketplaceError.ContractEventNotFound };

      state.marketplaceEvent = boughtItemEvent;
    } catch (ex) {
      // TODO: Handle exceptions properly
      console.log('ex|BuyItemNftCommand', ex);
      return { ...state, error: MarketplaceError.ListItemFailure };
    }

    return state;
  }
}
