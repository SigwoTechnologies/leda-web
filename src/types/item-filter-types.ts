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
  limit: number;
  page: number;
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
