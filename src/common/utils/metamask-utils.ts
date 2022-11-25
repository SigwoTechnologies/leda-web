import { ethers } from 'ethers';

export const getProvider = (): ethers.providers.JsonRpcProvider | null => {
  if (typeof window === 'undefined') return null;

  const isMetamaskIntalled = window.ethereum && window.ethereum.isMetaMask;
  if (!isMetamaskIntalled) return null;

  return new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider);
};

export const getSigner = () => {
  const provider = getProvider();

  if (!provider) throw new Error('Please make sure you have metamask installed.');

  return provider.getSigner();
};
