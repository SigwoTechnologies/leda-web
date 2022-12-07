import { ICollection } from '../../types/ICollection';
import { ItemProperty } from './ipfs-types';

type DraftItemRequest = {
  itemId: string;
  address: string;
  collection: ICollection;
  collectionAddress: string;
  description: string;
  name: string;
  tags: string[];
  itemProperties: ItemProperty[];
  royalty: number;
  price: string | undefined;
};

export default DraftItemRequest;
