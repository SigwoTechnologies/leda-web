import { Product2 } from '@types';
import { Event } from 'ethers';
import CollectionType from '../enums/collection-type.enum';
import MintError from '../enums/mint-error';

type MintState = {
  blob: File;
  cid: string;
  collection: CollectionType;
  description: string;
  error: MintError;
  imageUrl: string;
  item: Product2;
  mintEvent: Event;
  mintEventName: string;
  name: string;
  royalty: number;
  tokenId: number;
};

export default MintState;
