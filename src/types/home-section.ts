import { ButtonContent, Content } from './content';
import { Image } from './image';

export type HomeSection = {
  section: string;
  headings: Content[];
  texts: Content[];
  buttons: ButtonContent[];
  images: Image[];
};
