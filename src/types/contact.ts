import { Map } from './map';
import { SocialItem } from './social-item';

export type Contact = {
  id: string;
  map: Map;
  socials: SocialItem[];
};
