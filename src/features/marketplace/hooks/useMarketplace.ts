import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import useMetamask from '../../auth/hooks/useMetamask';
import MarketplaceAdress from '../../../contracts/Marketplace-address.json';
import Marketplace from '../../../contracts/Marketplace.json';

const useMarketplace = () => {
  const { signer } = useMetamask();
  const [marketplace, setMarketplace] = useState(
    new ethers.Contract(MarketplaceAdress.address, Marketplace.abi)
  );

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const marketplaceRaw = new ethers.Contract(
        MarketplaceAdress.address,
        Marketplace.abi,
        provider
      );
      setMarketplace(marketplaceRaw);
    }
  }, []);

  useEffect(() => {
    if (signer) {
      const marketplaceRaw = new ethers.Contract(
        MarketplaceAdress.address,
        Marketplace.abi,
        signer
      );
      setMarketplace(marketplaceRaw);
    }
  }, [signer]);

  // TODO: handle error when user tries to execute contract without being logged in
  return marketplace;
};

export default useMarketplace;
