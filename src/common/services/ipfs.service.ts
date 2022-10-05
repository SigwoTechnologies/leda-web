import { NFTStorage } from 'nft.storage';
import { IpfsObjectRequest } from '../types/ipfs-types';
import { IIpfsService } from '../interfaces/ipfs-service.interface';
import appConfig from '../configuration/app.config';

class IpfsService implements IIpfsService {
  private readonly nftStorage: NFTStorage;

  constructor() {
    this.nftStorage = new NFTStorage({ token: appConfig.nftStorageKey || '' });
  }

  storeNft(image: File, name: string, description: string) {
    const nft: IpfsObjectRequest = {
      image,
      name,
      description,
      attributes: [
        {
          trait_type: 'Base',
          value: 'Ape',
        },
        {
          trait_type: 'Personality',
          value: 'Sad',
        },
        {
          trait_type: 'Glasses',
          value: 'True',
        },
        {
          trait_type: 'Level',
          value: '3',
        },
        {
          trait_type: 'Eyes',
          value: 'Green',
        },
      ],
    };

    return this.nftStorage.store(nft);
  }
}

export default IpfsService;
