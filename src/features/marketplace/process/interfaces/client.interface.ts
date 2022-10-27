import MarketplaceState from '../types/marketplace-state';

interface IClient {
  execute(): Promise<MarketplaceState>;
}

export default IClient;
