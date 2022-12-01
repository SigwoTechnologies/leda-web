import { Event } from 'ethers';
import CollectionType from '../../../../common/minting/enums/collection-type.enum';
import ItemStatus from '../../../../common/minting/enums/item-status.enum';
import { Item } from '../../../../types/item';
import MarketplaceError from '../enums/marketplace-error.enum';

type MarketplaceState = {
  collection: CollectionType;
  collectionAddress: string;
  error: MarketplaceError;
  address: string;
  price: string;
  itemId: string;
  ownerAddress: string;
  tokenId: number;
  listId: number;
  item: Item;
  marketplaceEvent: Event;
  mintEventName: string;
  status?: ItemStatus;
};

export default MarketplaceState;
