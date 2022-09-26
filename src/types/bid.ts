import { User } from './user';

export type Bid = {
  id: number;
  user: User;
  amount: string;
  bidAt: string;
};
