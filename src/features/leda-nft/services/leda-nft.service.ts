import { createContract } from '../../../common/utils/contract-utils';
import { address } from '../../../contracts/LedaNFT-address.json';
import { abi } from '../../../contracts/LedaNFT.json';
import { LedaNFT } from '../types/LedaNFT';

const ledaNftService = async () => {
  const contract = await createContract<LedaNFT>(address, abi);

  const mint = async (tokenURI: string, royalty: string) => contract?.mint(tokenURI, royalty);

  return { mint };
};

export default ledaNftService;
