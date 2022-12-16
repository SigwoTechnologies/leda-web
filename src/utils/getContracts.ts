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

const environment = process.env.NEXT_PUBLIC_NODE_ENV || 'dev';
const LedaAddress = require('../contracts/prod/LedaNFT-address.json');
const LedaAbi = require('../contracts/prod/LedaNFT.json');
const JupApeAddress = require('../contracts/prod/JupApesNFT-address.json');
const JupApeAbi = require('../contracts/prod/JupApesNFT.json');
const MarketplaceAddress = require('../contracts/prod/Marketplace-address.json');
const MarketplaceAbi = require('../contracts/prod/Marketplace.json');

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
