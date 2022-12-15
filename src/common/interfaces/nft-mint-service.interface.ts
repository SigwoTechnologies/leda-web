import { ContractTransaction } from 'ethers';

interface INftMintService {
  mint(tokenURI: string, royalty: number): Promise<ContractTransaction | undefined>;
}

export default INftMintService;
