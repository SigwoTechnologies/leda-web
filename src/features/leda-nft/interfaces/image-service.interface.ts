import { ItemProperty } from '../../../common/types/ipfs-types';

interface IImageService {
  upload(
    file: File,
    name: string,
    description: string,
    itemId: string,
    itemProperties: ItemProperty[]
  ): Promise<string>;
}

export default IImageService;
