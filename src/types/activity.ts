import { Author } from './author';
import { Image } from './image';

export type Activity = {
  id: number;
  title: string;
  slug: string;
  description: string;
  date: string;
  time: string;
  author: Author;
  image: Image;
  status: string;
  marketFilters: string[];
  userFilters: string[];
};
