import { Author } from './author';
import { Bid } from './bid';
import { Collection } from './collection';
import { HighestBid } from './highest-bid';
import { History } from './history';
import { Image } from './image';
import { Price } from './price';
import { Property } from './property';
import { Tag } from './tag';

export type ItemRequest = {
  address: string;
  blob: File;
  description: string;
  name: string;
  price: number;
  property: string;
  royalty: number;
  size: string;
};

export type Product2 = {
  id: number;
  title: string;
  slug: string;
  publishedAt: string;
  latestBid: string;
  price: Price;
  likeCount: number;
  categories: string[];
  images: Image[];
  auctionDate?: string;
  authors: Author[];
  bitCount: number;
  owner: Author;
  collection: Collection;
  highestBid: HighestBid;
  tags: Tag[];
  properties: Property[];
  bids: Bid[];
  history: History[];
};
