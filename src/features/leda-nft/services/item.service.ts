import { History, Item } from '@types';
import HttpService from '../../../common/services/http.service';
import ItemRequest from '../../../common/types/item-request';
import IItemService from '../interfaces/item-service.interface';

export default class ItemService extends HttpService implements IItemService {
  private readonly endpoint: string;

  constructor() {
    super();
    this.endpoint = 'items';
  }

  async findAll(): Promise<Item[]> {
    const { data } = await this.instance.get<Item[]>(this.endpoint);
    return data;
  }

  async findById(itemId: string): Promise<Item> {
    const { data } = await this.instance.get<Item>(`${this.endpoint}/${itemId}`);
    return data;
  }

  async buy(itemId: string, address: string): Promise<Item> {
    const { data } = await this.instance.post<Item>(`${this.endpoint}/${itemId}/buy`, {
      address,
    });
    return data;
  }

  async list(itemId: string, price: string, address: string, listId: number): Promise<Item> {
    const { data } = await this.instance.post<Item>(`${this.endpoint}/${itemId}/price`, {
      price,
      listId,
      address,
    });
    return data;
  }

  async create(item: ItemRequest): Promise<Item> {
    const { data } = await this.instance.post<Item>(`${this.endpoint}`, item);
    return data;
  }

  async findAllHistory(): Promise<History[]> {
    const { data } = await this.instance.get<History[]>(`${this.endpoint}/history`);
    return data.reverse();
  }

  async findHistoryByItemId(itemId: string): Promise<History[]> {
    const { data } = await this.instance.get<History[]>(`${this.endpoint}/${itemId}/history`);
    return data.reverse();
  }
}

export const itemService = new ItemService();
