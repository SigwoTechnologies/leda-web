import { Item } from '@types';
import ItemRequest from '../../../common/types/item-request';
import httpService from '../../../common/services/http.service';

export default class ItemService {
  private readonly endpoint: string;

  constructor() {
    this.endpoint = 'items';
  }

  async findAll(): Promise<Item[]> {
    const { data } = await httpService.get<Item[]>(this.endpoint);
    return data;
  }

  async findById(itemId: string): Promise<Item> {
    const { data } = await httpService.get<Item>(`${this.endpoint}/${itemId}`);
    return data;
  }

  async create(item: ItemRequest): Promise<Item> {
    const { data } = await httpService.post<Item>(`${this.endpoint}`, item);
    return data;
  }
}

export const itemService = new ItemService();
