/* eslint-disable import/no-dynamic-require */
/* eslint-disable security/detect-non-literal-require */
export interface IContractEnvironment {
  LedaAddress: string;
  LedaAbi: never[];
  MarketplaceAddress: string;
  MarketplaceAbi: never[];
}

const environment = process.env.NEXT_PUBLIC_NODE_ENV || 'dev';
const LedaAddress = require(`../contracts/${process.env.NEXT_PUBLIC_NODE_ENV}/LedaNFT-address.json`);
const LedaAbi = require(`../contracts/${process.env.NEXT_PUBLIC_NODE_ENV}/LedaNFT.json`);
const MarketplaceAddress = require(`../contracts/${process.env.NEXT_PUBLIC_NODE_ENV}/Marketplace-address.json`);
const MarketplaceAbi = require(`../contracts/${process.env.NEXT_PUBLIC_NODE_ENV}/Marketplace.json`);

export function getContracts(): IContractEnvironment {
  return {
    LedaAddress: LedaAddress.address,
    LedaAbi: LedaAbi.abi,
    MarketplaceAddress: MarketplaceAddress.address,
    MarketplaceAbi: MarketplaceAbi.abi,
  };
}
