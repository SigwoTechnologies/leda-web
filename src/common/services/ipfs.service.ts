import { NFTStorage } from 'nft.storage';
import { IpfsAttribute } from '../types/ipfs-types';
import appConfig from '../configuration/app.config';

class IpfsService {
  private readonly nftStorage: NFTStorage;

  constructor() {
    this.nftStorage = new NFTStorage({ token: appConfig.nftStorageKey || '' });
  }

  storeNft(image: File, name: string, description: string) {
    const nft = {
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
      ] as IpfsAttribute[],
    };

    return this.nftStorage.store(nft);
  }
}

export default IpfsService;
