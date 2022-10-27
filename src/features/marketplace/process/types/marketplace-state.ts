import { Event } from 'ethers';
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
  item: Item;
  mintEvent: Event;
  mintEventName: string;
  status?: ItemStatus;
};

export default MarketplaceState;
