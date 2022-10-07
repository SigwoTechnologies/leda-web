export type ItemImage = {
  url: string;
};

export type ItemOwner = {
  address: string;
};

export type Item = {
  itemId: string;
  name: string;
  description: string;
  price: number;
  royalty: number;
  status: number;
  likes: number;
  image: ItemImage;
  owner: ItemOwner;
};
