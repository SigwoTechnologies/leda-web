import { Event } from 'ethers';
import { TransactionType } from '../../../../common/enums/transaction-types.enum';
import CollectionType from '../../../../common/minting/enums/collection-type.enum';
import { Item } from '../../../../types/item';
import ItemStatus from '../enums/item-status.enum';
import MarketplaceError from '../enums/marketplace-error.enum';

type MarketplaceState = {
  collection: CollectionType;
  collectionAddress: string;
  error: MarketplaceError;
  address: string;
  price: string;
  itemId: string;
  tokenId: number;
  listId: number;
  item: Item;
  marketplaceEvent: Event;
  mintEventName: string;
  status?: ItemStatus;
  transactionType: TransactionType;
};

export default MarketplaceState;
