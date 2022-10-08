import { Item, Product2 } from '@types';
import { Event } from 'ethers';
import CollectionType from '../enums/collection-type.enum';
import ItemStatus from '../enums/item-status.enum';
import MintError from '../enums/mint-error';

type MintState = {
  address: string;
  blob: File;
  cid: string;
  collection: CollectionType;
  collectionAddress: string;
  description: string;
  error: MintError;
  imageUrl: string;
  item: Product2;
  item2: Item;
  mintEvent: Event;
  mintEventName: string;
  name: string;
  price: number;
  royalty: number;
  status?: ItemStatus;
  tokenId: number;
};

export default MintState;
