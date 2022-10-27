export type ItemImage = {
  url: string;
};

export type ItemOwner = {
  address: string;
};

export type ItemAuthor = {
  address: string;
};

export type Item = {
  author: ItemAuthor;
  description: string;
  image: ItemImage;
  itemId: string;
  likes: number;
  name: string;
  owner: ItemOwner;
  royalty: number;
  status: number;
  tokenId: number;
  price?: string;
};
