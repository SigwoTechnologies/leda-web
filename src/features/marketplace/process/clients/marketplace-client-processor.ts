import MarketplaceClientCreator from './marketplace-client-creator';
import MarketplaceState from '../types/marketplace-state';
import constants from '../../../../common/configuration/constants';
import BusinessError from '../../../../common/exceptions/business-error';

class MarketplaceClientProcessor {
  async execute(state: MarketplaceState): Promise<MarketplaceState> {
    const client = MarketplaceClientCreator.createClient(state);

    const response = await client.execute();

    if (response.error) {
      const { message, code } = constants.errors.minting[response.error.toString()];
      throw new BusinessError(message, code);
    }

    return response;
  }
}

export default MarketplaceClientProcessor;
