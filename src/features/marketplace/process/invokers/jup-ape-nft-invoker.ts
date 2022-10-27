import MarketplaceState from '../types/marketplace-state';

export default class JupApeNftInvoker {
  constructor(private state: MarketplaceState) {}

  async execute() {
    // Here goes the logic
    return this.state;
  }
}
