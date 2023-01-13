import { ButtonContent, Content } from './content';
import { ImageType } from './image';

export type HomeSection = {
  section: string;
  headings: Content[];
  texts: Content[];
  buttons: ButtonContent[];
  images: ImageType[];
};
