import { Account } from './account';
import { Item } from './item';

export interface ICollection {
  id: string;
  description: string;
  name: string;
  items: Item[];
  owner: Account;
  createdAt: Date;
  updatedAt: Date;
}
