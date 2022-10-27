import { Item } from './item';

export type Props = {
  setNfts: (items: Item[]) => void;
};

export type PriceRangeType = {
  from: number;
  to: number;
};

export type FilterType = {
  likesDirection: string;
  NFTauthor: string;
  NFTtitle: string;
  NFTdescription: string;
  priceRange: PriceRangeType;
};

export type TargetType = {
  target: {
    value: string;
  };
};

export type LikesHandleType = {
  value: string;
  text: string;
  direction: string;
};
