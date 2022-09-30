import { ethers, Contract } from 'ethers';
import { address } from '../../../contracts/Marketplace-address.json';
import { abi } from '../../../contracts/Marketplace.json';

export default class MarketplaceService {
  private contract: Contract | undefined;

  constructor() {
    const isMetamaskIntalled = window.ethereum && window.ethereum.isMetaMask;

    if (isMetamaskIntalled) {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as ethers.providers.ExternalProvider
      );
      const signer = provider.getSigner();

      this.contract = new Contract(address, abi, signer);
    }
  }

  getOwner(): Promise<string> {
    return this.contract?.owner();
  }
}
