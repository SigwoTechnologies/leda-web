import { Event } from 'ethers';
import { IpfsObjectResponse } from '../../types/ipfs-types';
import CollectionType from '../enums/collection-type.enum';
import MintError from '../enums/mint-error';

export type MintState = {
  blob: File;
  collection: CollectionType;
  description: string;
  error: MintError;
  ipnft: string;
  ipfsObject: IpfsObjectResponse;
  ipfsUrl: string;
  mintEvent: Event;
  mintEventName: string;
  name: string;
  royalty: number;
  tokenId: number;
  url: string;
};
