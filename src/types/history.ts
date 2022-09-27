import { User } from './user';

export type History = {
  id: number;
  user: User;
  amount: string;
  bidAt: string;
};
