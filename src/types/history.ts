import { TransactionType } from '../common/enums/transaction-types.enum';
import { Account } from './account';
import { Item } from './item';

export type History = {
  id: string;
  price: string;
  transactionType: TransactionType;
  listId: number;
  item: Item;
  owner: Account;
  createdAt: Date;
  updatedAt: Date;
};
