import { History, Item } from '@types';
import ItemRequest from '../../../common/types/item-request';

interface IItemService {
  findAll(): Promise<Item[]>;
  findById(itemId: string): Promise<Item>;
  buy(itemId: string, address: string): Promise<Item>;
  list(itemId: string, price: string, listId: number, address: string): Promise<Item>;
  delist(itemId: string, address: string): Promise<Item>;
  create(item: ItemRequest): Promise<Item>;
  findAllHistory(): Promise<History[]>;
  findHistoryByItemId(itemId: string): Promise<History[]>;
}

export default IItemService;
