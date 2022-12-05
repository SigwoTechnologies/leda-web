import { Item } from '@types';
import { Event } from 'ethers';
import { Voucher } from '../../../features/leda-nft/types/lazy-minting-types';
import { TransactionType } from '../../enums/transaction-types.enum';
import { ItemProperty } from '../../types/ipfs-types';
import CollectionType from '../enums/collection-type.enum';
import ItemStatus from '../enums/item-status.enum';
import { LazyProcessType } from '../enums/lazy-process-type.enum';
import MintError from '../enums/mint-error.enum';

type MintState = {
  address: string;
  blob: File;
  cid: string;
  collection: CollectionType;
  collectionAddress: string;
  description: string;
  error: MintError;
  imageUrl: string;
  isLazy: boolean;
  item: Item;
  itemProperties: ItemProperty[];
  lazyProcessType: LazyProcessType;
  mintEvent: Event;
  mintEventName: string;
  name: string;
  price: number | undefined;
  royalty: number;
  status?: ItemStatus;
  tags: string[];
  tokenId: number;
  transactionType: TransactionType;
  voucher: Voucher;
};

export default MintState;
