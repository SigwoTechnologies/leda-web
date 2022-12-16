import { ItemProperty } from '../../../common/types/ipfs-types';

interface IImageService {
  upload(
    file: File,
    name: string,
    description: string,
    itemId: string,
    itemProperties: ItemProperty[]
  ): Promise<string>;

  uploadCollectionImage(
    file: File,
    name: string,
    description: string,
    collectionId: string
  ): Promise<string>;

  formatImageUrl(url: string): string;
}

export default IImageService;
