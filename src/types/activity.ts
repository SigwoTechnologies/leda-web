import { Author } from './author';
import { ImageType } from './image';

export type Activity = {
  id: number;
  title: string;
  slug: string;
  description: string;
  date: string;
  time: string;
  author: Author;
  image: ImageType;
  status: string;
  marketFilters: string[];
  userFilters: string[];
};
