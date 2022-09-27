import { Image } from './image';

export type Author = {
  name: string;
  slug: string;
  image: Image;
  totalSale?: number;
  twitter?: string;
  followers?: string;
  following?: string;
};
