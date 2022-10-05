import ICommand from '../../interfaces/command.interface';
import MintError from '../../enums/mint-error';
import MintState from '../../types/mint-state';

export default class GetTokenIdCommand implements ICommand<MintState> {
  async execute(state: MintState): Promise<MintState> {
    if (!state.mintEvent) return { ...state, error: MintError.RequireMintEvent };

    const tokenId = state.mintEvent.args?.[0]?.toNumber();
    state.tokenId = tokenId;

    return state;
  }
}
