import { ImageType } from './image';

export type Author = {
  name: string;
  slug: string;
  image: ImageType;
  totalSale?: number;
  twitter?: string;
  followers?: string;
  following?: string;
};
