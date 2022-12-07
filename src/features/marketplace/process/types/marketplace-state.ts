import { Event } from 'ethers';
import CollectionType from '../../../../common/minting/enums/collection-type.enum';
import ItemStatus from '../../../../common/minting/enums/item-status.enum';
import { LazyProcessType } from '../../../../common/minting/enums/lazy-process-type.enum';
import { Item } from '../../../../types/item';
import { Voucher } from '../../../leda-nft/types/lazy-minting-types';
import MarketplaceError from '../enums/marketplace-error.enum';

interface MarketplaceState {
  address: string;
  cid: string;
  collection: CollectionType;
  collectionAddress: string;
  error: MarketplaceError;
  imageUrl: string;
  isLazy: boolean;
  item: Item;
  itemId: string;
  lazyProcessType: LazyProcessType;
  listId: number;
  marketplaceEvent: Event;
  mintEventName: string;
  ownerAddress: string;
  price: string;
  royalty: number;
  status?: ItemStatus;
  tokenId: number;
  voucher: Voucher;
}

export default MarketplaceState;
