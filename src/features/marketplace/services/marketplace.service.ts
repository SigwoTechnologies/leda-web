import createContract from '../../../common/utils/createContract';
import { address } from '../../../contracts/Marketplace-address.json';
import { abi } from '../../../contracts/Marketplace.json';
import { Marketplace } from '../types/Marketplace';

const createMarketplaceService = () => {
  const contracts = createContract<Marketplace>(address, abi);

  return {
    getOwner: async () => {
      try {
        const owner = await contracts?.readWriteContract.owner();
        return owner;
      } catch (error) {
        const owner = await contracts?.readOnlyContract.owner();
        return owner;
      }
    },
  };
};

export default createMarketplaceService();
