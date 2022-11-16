/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable security/detect-non-literal-require */
export interface IContractEnvironment {
  LedaAddress: string;
  LedaAbi: never[];
  MarketplaceAddress: string;
  MarketplaceAbi: never[];
}

export function getContracts(): IContractEnvironment {
  const environment = process.env.NEXT_PUBLIC_NODE_ENV || 'prod';

  const LedaAddress = require(`../contracts/${environment}/LedaNFT-address.json`);
  const LedaAbi = require(`../contracts/${environment}/LedaNFT.json`);
  const MarketplaceAddress = require(`../contracts/${environment}/Marketplace-address.json`);
  const MarketplaceAbi = require(`../contracts/${environment}/Marketplace.json`);

  return {
    LedaAddress: LedaAddress.address,
    LedaAbi: LedaAbi.abi,
    MarketplaceAddress: MarketplaceAddress.address,
    MarketplaceAbi: MarketplaceAbi.abi,
  };
}
