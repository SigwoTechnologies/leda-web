import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import useMetamask from '../../auth/hooks/useMetamask';
import NFTAddress from '../../../contractsData/NFT-address.json';
import NFT from '../../../contractsData/NFT.json';

const useNFT = () => {
  const { signer } = useMetamask();
  const [nft, setNft] = useState<ethers.Contract>(new ethers.Contract(NFTAddress.address, NFT.abi));

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const NTFRaw = new ethers.Contract(NFTAddress.address, NFT.abi, provider);
      setNft(NTFRaw);
    }
  }, []);

  useEffect(() => {
    if (signer) {
      const NTFRaw = new ethers.Contract(NFTAddress.address, NFT.abi, signer);
      setNft(NTFRaw);
    }
  }, [signer]);

  // TODO: handle error when user tries to execute contract without being logged in
  return nft;
};

export default useNFT;
