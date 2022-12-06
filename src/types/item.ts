import { ItemProperty } from '../common/types/ipfs-types';
import ItemImage from '../common/types/item-image';
import type { History } from './history';

export type ItemOwner = {
  address: string;
};

export type ItemAuthor = {
  address: string;
};

export type Tag = {
  id: string;
  name: string;
};

export type Item = {
  author: ItemAuthor;
  description: string;
  image: ItemImage;
  itemId: string;
  listId: number;
  likes: number;
  name: string;
  owner: ItemOwner;
  royalty: number;
  status: number;
  tokenId: number;
  price: string;
  history: History[];
  tags: Tag[];
  itemProperties: ItemProperty[];
  isLazy: boolean;
};
