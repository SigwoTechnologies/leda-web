import { BaseContract, ContractInterface, ethers, Contract } from 'ethers';

const createContract = <T extends BaseContract>(
  contractAddress: string,
  contractAbi: ContractInterface
) => {
  if (typeof window === 'undefined') return null;

  const isMetamaskIntalled = window.ethereum && window.ethereum.isMetaMask;
  if (!isMetamaskIntalled) return null;

  const provider = new ethers.providers.Web3Provider(
    window.ethereum as ethers.providers.ExternalProvider
  );
  const signer = provider.getSigner();

  return {
    readOnlyContract: new Contract(contractAddress, contractAbi, provider) as T,
    readWriteContract: new Contract(contractAddress, contractAbi, signer) as T,
  };
};

export default createContract;
