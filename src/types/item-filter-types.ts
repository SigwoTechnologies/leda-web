import { Item } from './item';

export type PriceRangeType = {
  from: number | string;
  to: number | string;
};

export type FilterTypeBase = {
  limit: number;
  page: number;
  search?: string;
};
export type FilterType = {
  likesDirection: string;
  priceRange: PriceRangeType;
  cheapest: number | string;
  mostExpensive: number | string;
} & FilterTypeBase;

export type FilterTypeCollectionsNfts = {
  likesDirection?: string;
  priceRange?: PriceRangeType;
  limit?: number;
  page?: number;
  search?: string;
  cheapest?: number | string;
  mostExpensive?: number | string;
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

export type ItemPagination = {
  items: Item[];
  totalCount: number;
};
