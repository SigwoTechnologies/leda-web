import { Item } from '@types';
import HttpService from '../../../common/services/http.service';
import ItemRequest from '../../../common/types/item-request';

export default class ItemService extends HttpService {
  private readonly endpoint: string;

  constructor() {
    super();
    this.endpoint = 'items';
  }

  async findAll(): Promise<{ items: Item[]; itemsLength: number }> {
    const { data } = await this.instance.get<{ items: Item[]; itemsLength: number }>(
      `${this.endpoint}`
    );
    return data;
  }

  async findMarketplaceItems(): Promise<{ items: Item[]; itemsLength: number }> {
    const { data } = await this.instance.get<{ items: Item[]; itemsLength: number }>(
      `${this.endpoint}?limit=10&page=1`
    );
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

  async list(itemId: string, price: string, listId: number): Promise<Item> {
    const { data } = await this.instance.post<Item>(`${this.endpoint}/${itemId}/price`, {
      price,
      listId,
    });
    return data;
  }

  async create(item: ItemRequest): Promise<Item> {
    const { data } = await this.instance.post<Item>(`${this.endpoint}`, item);
    return data;
  }
}

export const itemService = new ItemService();
