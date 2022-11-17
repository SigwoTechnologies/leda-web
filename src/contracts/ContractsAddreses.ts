export const CONTRACTS_ADDRESSES: {
  [key: string]: { LedaAddress: string; MarketplaceAddress: string };
} = {
  local: {
    LedaAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    MarketplaceAddress: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
  },
  dev: {
    LedaAddress: '0xc915858E7fCe9E6cB2690fa983ba6F8D53eC75A3',
    MarketplaceAddress: '0xd66411A87d80793b8F7C281479780B420e396305',
  },
  prod: {
    LedaAddress: '0xb0cb8A20bf6E9B1484EDdC6bd5687aC58f24716c',
    MarketplaceAddress: '0xC32B21a75f1763B41a591aD62b1d2fd10d5363cD',
  },
};
