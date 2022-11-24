import { Item } from '@types';
import { Event } from 'ethers';
import CollectionType from '../enums/collection-type.enum';
import { TransactionType } from '../../enums/transaction-types.enum';
import { ItemProperty } from '../../types/ipfs-types';

import ItemStatus from '../enums/item-status.enum';
import MintError from '../enums/mint-error.enum';
import { ICollection } from '../../../types/ICollection';

type MintState = {
  address: string;
  blob: File;
  tags: string[];
  collectionType: CollectionType;
  cid: string;
  collection: ICollection;
  collectionAddress: string;
  description: string;
  error: MintError;
  imageUrl: string;
  item: Item;
  itemProperties: ItemProperty[];
  mintEvent: Event;
  mintEventName: string;
  name: string;
  royalty: number;
  status?: ItemStatus;
  tokenId: number;
  transactionType: TransactionType;
};

export default MintState;
