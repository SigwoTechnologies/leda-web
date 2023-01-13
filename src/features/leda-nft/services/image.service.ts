import { PinataResponse, ItemProperty } from '../../../common/types/ipfs-types';
import HttpService from '../../../common/services/http.service';
import IImageService from '../interfaces/image-service.interface';

export default class ImageService extends HttpService implements IImageService {
  private readonly endpoint: string;

  constructor() {
    super();
    this.endpoint = 'images';
  }

  async upload(
    file: File,
    name: string,
    description: string,
    itemId: string,
    itemProperties: ItemProperty[]
  ): Promise<string> {
    try {
      const formData = new FormData();
      const filename = file.name.replace(/\.[^/.]+$/, '');
      const externalUrl = `${window.origin}/item/${itemId}`;

      formData.append('reserved::name', name);
      formData.append('reserved::description', description);
      formData.append('reserved::external_url', externalUrl);
      formData.append('image', file, filename);

      itemProperties.forEach((prop: ItemProperty) => {
        formData.append(prop.key, prop.value);
      });

      const { data } = await this.instance.post<PinataResponse>(
        `${this.endpoint}/upload`,
        formData
      );

      return data.IpfsHash;
    } catch (ex) {
      // TODO: Add exception handling here
      console.log('ex|upload', ex);
      return '';
    }
  }

  async uploadCollectionImage(
    file: File,
    name: string,
    description: string,
    collectionId: string
  ): Promise<string> {
    try {
      const formData = new FormData();
      const filename = file.name.replace(/\.[^/.]+$/, '');
      const externalUrl = `${window.origin}/collections/${collectionId}`;

      formData.append('reserved::name', name);
      formData.append('reserved::description', description);
      formData.append('reserved::external_url', externalUrl);
      formData.append('image', file, filename);

      const { data } = await this.instance.post<PinataResponse>(
        `${this.endpoint}/upload`,
        formData
      );

      return data.IpfsHash;
    } catch (ex) {
      // TODO: Add exception handling here
      console.log('ex|upload', ex);
      return '';
    }
  }

  async uploadProfileImages(
    file: File,
    type: 'background' | 'picture',
    address: string
  ): Promise<string> {
    try {
      const formData = new FormData();
      const filename = file.name.replace(/\.[^/.]+$/, '');

      formData.append('reserved::name', address);
      formData.append('reserved::description', 'personal account image');
      formData.append('reserved::external_url', 'author');
      formData.append('reserved::type', type);
      formData.append('image', file, filename);

      const { data } = await this.instance.post<PinataResponse>(
        `${this.endpoint}/upload`,
        formData
      );

      return data.IpfsHash;
    } catch (ex) {
      // TODO: Add exception handling here
      console.log('ex|upload', ex);
      return '';
    }
  }

  formatImageUrl(url: string): string {
    const search = 'ipfs/';
    const index = url.indexOf(search);
    return url.substring(index + search.length, url.length);
  }
}

export const imageService = new ImageService();
