import ItemImage from '../common/types/item-image';
import type { History } from './history';
import { Item } from './item';

export type Account = {
  accountId: string;
  address: string;
  username: string;
  items: Item[];
  history: History[];
  background: ItemImage;
  picture: ItemImage;
};
