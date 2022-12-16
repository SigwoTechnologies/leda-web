/* eslint-disable import/no-dynamic-require */
/* eslint-disable security/detect-non-literal-require */
export interface IContractEnvironment {
  LedaAddress: string;
  LedaAbi: never[];
  JupApeAddress: string;
  JupApeAbi: never[];
  MarketplaceAddress: string;
  MarketplaceAbi: never[];
}

const environment = 'prod';
const LedaAddress = require(`../contracts/${environment}/LedaNFT-address.json`);
const LedaAbi = require(`../contracts/${environment}/LedaNFT.json`);
const JupApeAddress = require(`../contracts/${environment}/JupApesNFT-address.json`);
const JupApeAbi = require(`../contracts/${environment}/JupApesNFT.json`);
const MarketplaceAddress = require(`../contracts/${environment}/Marketplace-address.json`);
const MarketplaceAbi = require(`../contracts/${environment}/Marketplace.json`);

export function getContracts(): IContractEnvironment {
  return {
    LedaAddress: LedaAddress.address,
    LedaAbi: LedaAbi.abi,
    JupApeAddress: JupApeAddress.address,
    JupApeAbi: JupApeAbi.abi,
    MarketplaceAddress: MarketplaceAddress.address,
    MarketplaceAbi: MarketplaceAbi.abi,
  };
}
