export type PriceRangeType = {
  from: number;
  to: number;
};

export type FilterType = {
  likesDirection: string;
  priceRange: PriceRangeType;
  limit: number;
  page: number;
  search: string;
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
