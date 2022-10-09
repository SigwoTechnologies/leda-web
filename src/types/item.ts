export type ItemImage = {
  url: string;
};

export type ItemOwner = {
  address: string;
};

export type Item = {
  itemId: string;
  tokenId: number;
  name: string;
  description: string;
  royalty: number;
  status: number;
  likes: number;
  image: ItemImage;
  owner: ItemOwner;
};
