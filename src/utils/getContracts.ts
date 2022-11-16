import { CONTRACTS_ADDRESSES } from '../contracts/ContractsAddreses';
import LedaAbi from '../contracts/LedaNFT.json';
import MarketplaceAbi from '../contracts/Marketplace.json';

export interface IContractEnvironment {
  LedaAddress: string;
  LedaAbi: any[];
  MarketplaceAddress: string;
  MarketplaceAbi: any[];
}

const environment = process.env.NEXT_PUBLIC_NODE_ENV || 'dev';

export function getContracts(): IContractEnvironment {
  return {
    LedaAddress: CONTRACTS_ADDRESSES[environment].LedaAddress,
    LedaAbi: LedaAbi.abi,
    MarketplaceAddress: CONTRACTS_ADDRESSES[environment].MarketplaceAddress,
    MarketplaceAbi: MarketplaceAbi.abi,
  };
}
