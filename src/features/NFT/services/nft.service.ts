import { createContract } from '../../../common/utils/contract-utils';
import { address } from '../../../contracts/NFT-address.json';
import { abi } from '../../../contracts/NFT.json';
import { NFT } from '../types/NFT';

const nftService = async () => {
  const contract = await createContract<NFT>(address, abi);

  const getName = async () => contract?.name();

  const createNFT = async (tokenURI: string, attributes: string) =>
    contract?.mint(tokenURI, attributes);

  return { getName, createNFT };
};

export default nftService;
