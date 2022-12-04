import { Event } from 'ethers';
import CollectionType from '../../../../common/minting/enums/collection-type.enum';
import ItemStatus from '../../../../common/minting/enums/item-status.enum';
import { LazyProcessType } from '../../../../common/minting/enums/lazy-process-type.enum';
import { Item } from '../../../../types/item';
import MarketplaceError from '../enums/marketplace-error.enum';

interface MarketplaceState {
  address: string;
  cid: string;
  collection: CollectionType;
  collectionAddress: string;
  error: MarketplaceError;
  item: Item;
  itemId: string;
  listId: number;
  marketplaceEvent: Event;
  mintEventName: string;
  ownerAddress: string;
  price: string;
  status?: ItemStatus;
  tokenId: number;
  lazyProcessType: LazyProcessType;
  isLazy: boolean;
}

export default MarketplaceState;
