import { Token } from 'nft.storage/dist/src/token';
import { IpfsObjectRequest } from '../types/ipfs-types';

interface IIpfsService {
  storeNft(image: File, name: string, description: string): Promise<Token<IpfsObjectRequest>>;
}

export default IIpfsService;
