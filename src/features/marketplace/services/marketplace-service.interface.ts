export interface IMarketplaceService {
  getOwner(): Promise<string | undefined>;
}
