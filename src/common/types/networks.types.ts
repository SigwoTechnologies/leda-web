import { NetworkNames } from '../enums/network-names.enum';

export const NETWORK_NAMES: { [key: string]: string } = {
  [NetworkNames.MAINNET]: 'Mainnet',
  [NetworkNames.LOCALHOST]: 'Localhost',
  [NetworkNames.SEPOLIA]: 'Sepolia',
  [NetworkNames.GOERLI]: 'Goerli',
};
