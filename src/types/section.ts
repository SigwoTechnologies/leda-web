import { Image } from './image';

export type Section = {
  section: string;
  sectionTitle: SectionTitle;
  items: SectionItem[];
};

export type SectionTitle = {
  title: string;
};

export type SectionItem = {
  id: number;
  title: string;
  path: string;
  subtitle: string;
  description: string;
  images: Image[];
};
