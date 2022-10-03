import { createContract } from '../../../common/utils/contract-utils';
import { address } from '../../../contracts/Marketplace-address.json';
import { abi } from '../../../contracts/Marketplace.json';
import { Marketplace } from '../types/Marketplace';

const marketplaceService = async () => {
  const contract = await createContract<Marketplace>(address, abi);

  const getOwner = async () => contract?.owner();

  return {
    getOwner,
  };
};

export default marketplaceService;
