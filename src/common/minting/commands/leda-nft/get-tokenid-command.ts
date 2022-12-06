import ICommand from '../../interfaces/command.interface';
import MintError from '../../enums/mint-error.enum';
import MintState from '../../types/mint-state';
import ContractEvent from '../../enums/contract-event.enum';

export default class GetTokenIdCommand implements ICommand<MintState> {
  async execute(state: MintState): Promise<MintState> {
    if (!state.mintEvent) return { ...state, error: MintError.RequiredMintEvent };
    if (!state.mintEventName) return { ...state, error: MintError.RequiredMintEventName };

    if (state.mintEventName === ContractEvent.TransferEvent)
      state.tokenId = state.mintEvent.args?.[2]?.toNumber();

    if (state.mintEventName === ContractEvent.LogNFTMinted)
      state.tokenId = state.mintEvent.args?.[0]?.toNumber();

    return state;
  }
}
