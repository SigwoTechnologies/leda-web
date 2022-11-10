import { Item } from './item';

export type Account = {
  accountId: string;
  address: string;
  items: Item[];
  history: History[];
  createdAt: Date;
  updatedAt: Date;
};
