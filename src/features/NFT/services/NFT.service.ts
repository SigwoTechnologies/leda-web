import createContract from '../../../common/utils/createContract';
import { address } from '../../../contracts/NFT-address.json';
import { abi } from '../../../contracts/NFT.json';
import { NFT } from '../types/NFT';

const createNFTService = () => {
  const contracts = createContract<NFT>(address, abi);

  return {
    getName: async () => {
      try {
        const name = await contracts?.readWriteContract.name();
        return name;
      } catch (error) {
        const name = await contracts?.readOnlyContract.name();
        return name;
      }
    },
    createNFT: async (tokenURI: string, attributes: string) => {
      try {
        const response = await contracts?.readWriteContract.mint(tokenURI, attributes);
        return response;
      } catch (error) {
        // TODO: handle error
        console.error('createNFT |', error);
        return undefined;
      }
    },
  };
};

export default createNFTService();
