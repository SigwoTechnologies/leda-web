import { History, Item } from '@types';
import ActivateItemRequest from '../../../common/types/activate-item-request';
import DraftItemRequest from '../../../common/types/draft-item-request';
import ProcessLazyItemRequest from '../../../common/types/process-lazy-item-request';
import { Voucher } from '../types/lazy-minting-types';

interface IItemService {
  findAll(): Promise<Item[]>;
  findById(itemId: string): Promise<Item>;
  buy(itemId: string, address: string): Promise<Item>;
  transfer(itemId: string, address: string, voucherId: string, tokenId: number): Promise<void>;
  list(itemId: string, price: string, listId: number, address: string): Promise<Item>;
  delist(itemId: string, address: string): Promise<Item>;
  create(item: DraftItemRequest): Promise<Item>;
  activate(item: ActivateItemRequest): Promise<Item>;
  processLazyItem(lazyItemRequest: ProcessLazyItemRequest): Promise<Item>;
  findAllHistory(): Promise<History[]>;
  findHistoryByItemId(itemId: string): Promise<History[]>;
  findVoucherByItemId(itemId: string): Promise<Voucher>;
}

export default IItemService;
